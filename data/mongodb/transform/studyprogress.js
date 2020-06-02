const fetcher = require('../fetcher')
const { formatDateTime, createFullDate, readJSON } = require('./utlis')

async function recentResults() {
    const results = await fetcher('results')
    const changeDate = changeDateTime(results)
    const sortedResults = sortByDate(changeDate)
    const modifiedResults = changeStringtoNumber(sortedResults)
    const recentResults = modifiedResults.slice(0, 4)

    return recentResults
}

function studyProgress() {
    const studyProgress = readJSON('./data/local/study-progress.json')
    return studyProgress
}


// Helpers
function changeStringtoNumber(results) {
    results.forEach(result => {
        const grade = result.grade.replace(',', '.')

        if (Number(grade)) {
            result.grade = Number(grade)
        }
    })

    return results
}

function sortByDate(results) {
    results.sort((a, b) => b.testDate.year - a.testDate.year)
    results.sort((a, b) => b.testDate.month - a.testDate.month)
    results.sort((a, b) => b.testDate.day - a.testDate.day)

    return results
}

function changeDateTime(data) {
    const results = data.items

    results.forEach(result => {
        result.testDate = formatDateTime(result.testDate)
        result.fullDate = createFullDate(result.testDate)
    })

    return results
}

module.exports = {
    recentResults,
    studyProgress
}