const fetcher = require('../fetcher')
const { formatDateTime, createFullDate } = require('./utlis')

module.exports = async function getRecentResults() {
    const results = await fetcher('results')
    const changeDate = await changeDateTime(results)
    const sortedResults = await sortByDate(changeDate)

    return sortedResults.slice(0, 4)
}


// Helpers
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