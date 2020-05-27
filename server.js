require('dotenv').config()
const port = process.env.PORT || 3005

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()

const indexRouter = require('#routes/index')
const resourceRouter = require('#routes/resource')

app
    .set('view engine', 'ejs')
    .set('views', __dirname + '/views')
    .set('layout', 'layouts/base')
    .use(expressLayouts)
    .use(express.static('public'))
    .use('/', indexRouter, resourceRouter)

app.listen(port, () => console.log(`App now listening on port ${port}`))