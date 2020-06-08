import * as utils from '../modules/utils.mjs'

export function indicate(item) {
    getUnread()
        .then(numberUnread => {
            if (numberUnread > 0) {
                item.classList.add('unread-indicator')
                item.setAttribute('number-unread', numberUnread)
            } else {
                item.classList.remove('unread-indicator')
            }
        })
}


function getAnnouncements() {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    return fetch('/announcementslist', options).then(res => res.json())
}

function getUnread() {
    const storedHistory = utils.getLocalStorage('read-history')
    const numberUnread = getAnnouncements()
        .then(json => {
            const [announcements, categories] = json
            return announcements
        })
        .then(announcements => {
            let numberOfUnread = 0
            if (storedHistory) {
                announcements.forEach(announcement => {
                    if (!storedHistory.includes(announcement.newsItemId)) {
                        numberOfUnread++
                    }
                })
            }
            return numberOfUnread
        })
    return numberUnread
}