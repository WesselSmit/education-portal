const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// Get data
const { readJSON } = require('#data/mongodb/transform/utlis')

const schedules = require('#data/mongodb/transform/schedules')
const { recentResults, studyProgress } = require('#data/mongodb/transform/studyprogress')
const courseOverview = readJSON('./data/local/course-overview.json')

module.exports = router
    .get('/', async (req, res) => res.render('dashboard', {
        pageName: 'dashboard',
        schedules: await schedules(),
        studyResults: await recentResults(),
        studyProgress: studyProgress(),
        courseOverview: courseOverview
    }))
    .get('/account', (req, res) => res.send('account'))
    .get('/timetable', (req, res) => res.send('timetable'))
    .get('/course_overview', (req, res) => res.send('course_overview'))
    .get('/study_progress', (req, res) => res.send('study_progress'))
    .get('/announcements', (req, res) => res.send('announcements'))
    .get('/information', (req, res) => res.send('information'))

    // Fetch from client to server to get schedules to achieve enhancement
    .get('/schedule', async (req, res) => res.json(await schedules()))
    .get('/studyprogress', async (req, res) => res.json([await recentResults(), studyProgress()]))