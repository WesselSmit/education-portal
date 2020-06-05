const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// Get data
const { readJSON, limit } = require('#data/mongodb/transform/utlis')

const schedules = require('#data/mongodb/transform/schedules')
const { recentResults, studyProgress } = require('#data/mongodb/transform/studyprogress')
const courseOverview = readJSON('./data/local/course-overview.json')
const announcements = require('#data/mongodb/transform/announcements')

const announcementRouter = require('./announcement-router')

module.exports = router
    .get('/', async (req, res) => res.render('dashboard', {
        pageName: 'dashboard',
        schedules: await schedules(),
        studyResults: await recentResults(),
        studyProgress: studyProgress(),
        courseOverview: courseOverview,
        announcements: limit(await announcements(), 5)
    }))
    .get('/account', (req, res) => res.render('account', {
        pageName: 'account'
    }))
    .get('/timetable', (req, res) => res.send('timetable'))
    .get('/course_overview', (req, res) => res.send('course_overview'))
    .get('/study_progress', (req, res) => res.send('study_progress'))
    .use('/announcements', announcementRouter)
    .get('/information', (req, res) => res.render('partials/resource-overview', {
        pageName: 'information',
        information: readJSON('./data/local/resource-page-content.json')
    }))
    .get('/offline', (req, res) => res.render('offline', { pageName: 'offline' }))


    // Fetch from client to server to achieve enhancement
    .get('/schedule', async (req, res) => res.json(await schedules()))
    .get('/studyprogress', async (req, res) => res.json([await recentResults(), studyProgress()]))
    .get('/courseoverview', async (req, res) => res.json(courseOverview))