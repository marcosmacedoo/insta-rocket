const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io')
const routes = require('./routes')

const PORTA = 3000
const app = express()
const server = http.Server(app)
const io = socketIo(server)

mongoose.connect('mongodb+srv://marcosv:marcosv@cluster0-pvzeb.mongodb.net/instaclone?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use((req, res, next) => {
  req.io = io

  next()
})

app.use(cors())

app.use('/files', express.static(
  path.resolve(__dirname, '..', 'uploads', 'resized')
))

app.use(routes)

app.listen(PORTA,
    () => console.log(`Servidor rodando em http://localhost:${PORTA}`)
)
