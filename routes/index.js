const express = require('express')
const router = express.Router()

const fetcher = require('#data/mongodb/fetcher')
const { changeDateTime } = require('#data/mongodb/dataTransformer')

// MongoDB
const schedules = async () => {
    const rawSchedules = await fetcher('schedule')
    return await changeDateTime(rawSchedules)
}

module.exports = router
    .get('/', async (req, res) => res.render('dashboard', { schedules: await schedules() }))
    .get('/account', (req, res) => res.send('account'))
    .get('/timetable', (req, res) => res.send('timetable'))
    .get('/course_overview', (req, res) => res.send('course_overview'))
    .get('/study_progress', (req, res) => res.send('study_progress'))
    .get('/announcements', (req, res) => res.send('announcements'))