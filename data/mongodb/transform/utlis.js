const fs = require('fs')

function formatDateTime(string) {
    // Date
    const dateArray = string.split('T')[0].split('-')

    // Time
    const rawTime = string.split('T')[1].split('+')[0]
    const time = rawTime.slice(0, rawTime.lastIndexOf(':'))

    // Merge
    return {
        day: parseInt(dateArray[2]),
        month: parseInt(dateArray[1]),
        year: parseInt(dateArray[0]),
        time: time
    }
}

function createFullDate(date) {
    return `${date.day}-${date.month}-${date.year}`
}

function readJSON(fileName) {
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }))
}

function limit(data, limiter) {
    data.splice(limiter, data.length)
    return data
}

module.exports = {
    createFullDate,
    formatDateTime,
    readJSON,
    limit
}