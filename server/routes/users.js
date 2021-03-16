const express = require('express')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post(
  '/',
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: 'User already exists' })
      }
      if ('isAdmin' in req.body) {
        user = new User({
          name,
          email,
          password,
          isAdmin,
        })
      } else {
        user = new User({
          name,
          email,
          password,
          isAdmin: false,
        })
      }

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      }
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) {
            throw err
          } else {
            res.json({
              _id: user.id,
              name,
              email,
              isAdmin: user.isAdmin,
              token,
            })
          }
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
