require('dotenv')
    .config()

const
    express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts')

app
    .set('view engine', 'ejs')
    .set('views', 'views')
    .set('layout', 'layouts/layout')
    .use(expressLayouts)
    .use(express.static('public'))

const indexRouter = require('./routes')

app.use('/', indexRouter)

app.listen(process.env.PORT || 4000, () => console.log(`Listening on Port ${process.env.PORT || 4000}`))