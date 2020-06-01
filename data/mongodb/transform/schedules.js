const fetcher = require('../fetcher')
const { createFullDate, formatDateTime } = require('./utlis')

module.exports = async function getSchedules() {
    const rawSchedules = await fetcher('schedule')
    const formattedDates = await changeDateTime(rawSchedules.items)
    const arrayOfDates = groupPerDay(formattedDates)

    return arrayOfDates
}


// Helpers
function groupPerDay(data) {
    const dates = []
    let currentDate = data[0].startDateTime

    dates.push(dateObj(currentDate))

    data.forEach(schedule => {
        const scheduleDate = schedule.startDateTime

        if (scheduleDate.day === currentDate.day &&
            scheduleDate.month === currentDate.month &&
            scheduleDate.year === currentDate.year) {
            addSchedule(dates, schedule, scheduleDate)
        } else {
            dates.push(dateObj(scheduleDate))
            addSchedule(dates, schedule, scheduleDate)
        }

        currentDate = scheduleDate
    })

    return dates
}

function changeDateTime(data) {
    data.forEach(item => {
        item.startDateTime = formatDateTime(item.startDateTime)
        item.endDateTime = formatDateTime(item.endDateTime)
    })

    return data
}

function dateObj(date) {
    return {
        day: date.day,
        month: date.month,
        year: date.year,
        fullDate: createFullDate(date),
        schedules: []
    }
}

function addSchedule(dates, schedule, scheduleDate) {
    const fullDate = createFullDate(scheduleDate)
    const dateInArray = dates.find(date => date.fullDate === fullDate)
    dateInArray.schedules.push(schedule)
}