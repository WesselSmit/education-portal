require('dotenv').config()
const port = process.env.PORT || 3005
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const indexRouter = require('#routes/index')
const resourceRouter = require('#routes/resource')

const sockets = require('./sockets')
sockets(io)

app
    .set('view engine', 'ejs')
    .set('views', __dirname + '/views')
    .set('layout', 'layouts/base')
    .use(expressLayouts)
    .use(express.static('public'))
    .use('/', indexRouter, resourceRouter)



server.listen(port, () => console.log(`App now listening on port ${port}`))