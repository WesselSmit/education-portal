const changeDateTime = async (data) => {
    const items = data.items

    items.forEach(item => {
        item.startDateTime = fix(item.startDateTime)
        item.endDateTime = fix(item.endDateTime)
    })

    return items
}

function fix(string) {
    // Date
    const dateArray = string.split('T')[0].split('-')

    // Time
    const rawTime = string.split('T')[1].split('+')[0]
    const time = rawTime.slice(0, rawTime.lastIndexOf(':'))

    // Merge
    return {
        day: dateArray[2],
        month: dateArray[1],
        year: dateArray[0],
        time: time
    }
}

module.exports = {
    changeDateTime
}