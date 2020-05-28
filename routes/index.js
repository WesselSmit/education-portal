const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const fetcher = require('#data/mongodb/fetcher')
const { changeDateTime, groupPerDay } = require('#data/mongodb/dataTransformer')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// MongoDB
const schedules = async () => {
    const rawSchedules = await fetcher('schedule')
    const formattedDates = changeDateTime(rawSchedules.items)
    const arrayOfDates = groupPerDay(formattedDates)

    return arrayOfDates
}

module.exports = router
    .get('/', async (req, res) => res.render('dashboard', { schedules: await schedules(), pageName: 'dashboard' }))
    .post('/', (req, res) => console.log(req.body))
    .get('/account', (req, res) => res.send('account'))
    .get('/timetable', (req, res) => res.send('timetable'))
    .get('/course_overview', (req, res) => res.send('course_overview'))
    .get('/study_progress', (req, res) => res.send('study_progress'))
    .get('/announcements', (req, res) => res.send('announcements'))