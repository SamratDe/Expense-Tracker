const express = require('express')
const { body, validationResult } = require('express-validator')
const Expense = require('../models/Expense')
const User = require('../models/User')
const middleware = require('../middleware/middleware')

const router = express.Router()

router.get('/', middleware, async (req, res) => {
  try {
    const expense = await Expense.find({ user: req.user.id }).sort({ date: -1 })
    res.status(200).json({
      count: expense.length,
      data: expense,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

router.get('/:id', middleware, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
    res.status(200).json({ data: expense })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

router.post('/', middleware, async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,
      user: req.user.id,
    })
    const expense = await newExpense.save()
    res.status(200).json({ data: expense })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

router.put('/:id', middleware, async (req, res) => {
  try {
    const resp = await Expense.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    )
    res.status(200).json({ data: resp })
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ msg: 'Server Error' })
  }
})

router.delete('/:id', middleware, async (req, res) => {
  try {
    const resp = await Expense.findByIdAndRemove(req.params.id)
    res.status(200).json({ msg: 'Expense removed' })
  } catch (err) {
    console.log('here ?')
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

module.exports = router
