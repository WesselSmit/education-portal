const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const fetcher = require('#data/mongodb/fetcher')
const { changeDateTime, groupPerDay } = require('#data/mongodb/transform/schedules')
const { getRecentResults } = require('#data/mongodb/transform/studyprogress')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// MongoDB
const schedules = async () => {
    const rawSchedules = await fetcher('schedule')
    const formattedDates = await changeDateTime(rawSchedules.items)
    const arrayOfDates = groupPerDay(formattedDates)

    return arrayOfDates
}

const studyProgress = async () => {
    const rawStudyProgress = await fetcher('results')
    const recentResults = await getRecentResults(rawStudyProgress)

    recentResults.forEach(result => {
        const grade = result.grade.replace(",", ".")
        const number = Number(grade)

        if (number) {
            result.grade = number
        }
    })

    return recentResults
}

module.exports = router
    .get('/', async (req, res) => res.render('dashboard', {
        pageName: 'dashboard',
        schedules: await schedules(),
        studyProgress: await studyProgress()
    }))
    .get('/account', (req, res) => res.send('account'))
    .get('/timetable', (req, res) => res.send('timetable'))
    .get('/course_overview', (req, res) => res.send('course_overview'))
    .get('/study_progress', (req, res) => res.send('study_progress'))
    .get('/announcements', (req, res) => res.send('announcements'))
    .get('/information', (req, res) => res.send('information'))

    // Fetch from client to server to get schedules to achieve enhancement
    .get('/schedule', async (req, res) => res.json(await schedules()))