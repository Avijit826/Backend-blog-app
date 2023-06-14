require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const app = express()
const postRoute = require('./routes/post.route')
const userRoute = require('./routes/user.route')

app.use(express.json({ extended: false }))

app.use('/api/v1/post', postRoute)
app.use('/api/v1', userRoute)

app.get('/', (req, res) => {
  res.send('Homepage')
})

module.exports = app
