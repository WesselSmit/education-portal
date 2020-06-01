const { formatDateTime } = require('./utlis')

function changeDateTime(data) {
    data.forEach(item => {
        item.startDateTime = formatDateTime(item.startDateTime)
        item.endDateTime = formatDateTime(item.endDateTime)
    })

    return data
}

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

function createFullDate(date) {
    return `${date.day}-${date.month}-${date.year}`
}

module.exports = {
    changeDateTime,
    groupPerDay
}