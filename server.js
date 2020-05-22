require('dotenv').config()
const port = process.env.PORT || 3005

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()

app
    .set('view engine', 'ejs')
    .set('views', __dirname + '/views')
    .set('layout', 'layouts/base')
    .use(expressLayouts)
    .use(express.static('public'))

const router = require('./server/router')

app
    .get('/', router.dashboard)
    .get('/account', router.account)
    .get('/timetable', router.timetable)
    .get('/course_overview', router.course_overview)
    .get('/study_progress', router.study_progress)
    .get('/announcements', router.announcements)
    .get('/brightspace', router.brightspace)
    .get('/sis', router.sis)
    .get('/mail', router.mail)
    .get('/events', router.events)
    .get('/teamsites', router.teamsites)
    .get('/az_list', router.az_list)
    .get('/staff', router.staff)
    .get('/locations', router.locations)
    .get('/studies', router.studies)
    .get('/hva_organisation', router.hva_organisation)
    .get('/help', router.help)

app.listen(port, () => console.log(`App now listening on port ${port}`))