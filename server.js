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

const fetcher = require('./data/mongodb/fetcher')
const { changeDateTime } = require('./data/mongodb/dataTransformer')

// MongoDB
const schedules = async () => {
    const rawSchedules = await fetcher('schedule')
    return await changeDateTime(rawSchedules)
}

// Router
const getResourceInformation = require('./data/local/getData')

app
    .get('/', async (req, res) => res.render('dashboard', { schedules: await schedules() }))
    .get('/account', (req, res) => res.send('account'))
    .get('/timetable', (req, res) => res.send('timetable'))
    .get('/course_overview', (req, res) => res.send('course_overview'))
    .get('/study_progress', (req, res) => res.send('study_progress'))
    .get('/announcements', (req, res) => res.send('announcements'))
    .get('/brightspace', (req, res) => res.render('layouts/resource', getResourceInformation('Brightspace')))
    .get('/sis', (req, res) => res.render('layouts/resource', getResourceInformation('SIS')))
    .get('/mail', (req, res) => res.render('layouts/resource', getResourceInformation('Mail')))
    .get('/events', (req, res) => res.render('layouts/resource', getResourceInformation('Events')))
    .get('/teamsites', (req, res) => res.render('layouts/resource', getResourceInformation('Teamsites')))
    .get('/az_list', (req, res) => res.render('layouts/resource', getResourceInformation('A-Z')))
    .get('/staff', (req, res) => res.render('layouts/resource', getResourceInformation('Staff')))
    .get('/locations', (req, res) => res.render('layouts/resource', getResourceInformation('Locations')))
    .get('/studies', (req, res) => res.render('layouts/resource', getResourceInformation('Studies')))
    .get('/hva_organisation', (req, res) => res.render('layouts/resource', getResourceInformation('HvA_organisation')))
    .get('/help', (req, res) => res.render('layouts/resource', getResourceInformation('Help')))

app.listen(port, () => console.log(`App now listening on port ${port}`))