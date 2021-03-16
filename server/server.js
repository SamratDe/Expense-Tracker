const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/expenses', require('./routes/expenses'))

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to expense tracker API' })
  })
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on Port ${PORT}`)
})
