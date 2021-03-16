const express = require('express')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const middleware = require('../middleware/middleware')
const admin = require('../middleware/admin')

const router = express.Router()

router.get('/', [middleware, admin], async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.get('/profile', middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post(
  '/',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }
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
              name: user.name,
              email,
              isAdmin: user.isAdmin,
              token,
            })
          }
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

router.delete('/:id', [middleware, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
