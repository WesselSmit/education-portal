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


const router = {
    dashboard: require("#routes/dashboard"),
    account: require("#routes/account"),
    timetable: require("#routes/timetable"),
    course_overview: require("#routes/course_overview"),
    study_progress: require("#routes/study_progress"),
    announcements: require("#routes/announcements"),
    brightspace: require("#routes/brightspace"),
    sis: require("#routes/sis"),
    mail: require("#routes/mail"),
    events: require("#routes/events"),
    teamsites: require("#routes/teamsites"),
    az_list: require("#routes/a-z_list"),
    staff: require("#routes/staff"),
    locations: require("#routes/locations"),
    library: require("#routes/library"),
    studies: require("#routes/studies"),
    hva_organisation: require("#routes/hva_organisation"),
    help: require("#routes/help"),
}

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