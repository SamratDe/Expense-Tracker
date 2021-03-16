const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to expense tracker API' })
})

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/expenses', require('./routes/expenses'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on Port ${PORT}`)
})
