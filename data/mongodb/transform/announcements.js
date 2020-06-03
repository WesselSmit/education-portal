const fetcher = require('../fetcher')

module.exports = async function getAnnouncements() {
    const data = await Promise.all([fetchAnnouncements(), fetchNews()])
    const mergedAnnouncements = flattenArrays(data)
    const formattedAnnouncements = format(mergedAnnouncements)
    return formattedAnnouncements
}

function fetchAnnouncements() {
    return fetcher('announcements')
}

function fetchNews() {
    return fetcher('news-items')
}

function flattenArrays(data) {
    const flatArray = []

    data.forEach(obj => {
        obj.items.forEach(item => flatArray.push(item))
    })
    return flatArray
}

function format(data) {
    formatDate(data)
    formatContent(data)
    return data
}

function formatDate(data) {
    data.forEach(item => {
        const dateArr = item.publishDateTime.split("T")[0].split("-")
        item.publishDate = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    })
    return data
}

function formatContent(data) {
    data.forEach(item => {
        const newLines = item.content.replace(/<br\s*\/?>/mg, "\n")
        item.content = newLines.replace(/(&nbsp;|<([^>]+)>)/ig, "")
    })
}