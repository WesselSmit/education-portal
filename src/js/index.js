import * as utils from './modules/utils.mjs'
import * as search from './modules/search.mjs'
import setDashboardPreferences from './modules/preferences/dashboard.mjs'
import { cloneAndUpdateMenu } from './modules/utils.mjs'
import setMenuPreferences from './modules/preferences/menu.mjs'
import urgentAnnouncement from './web-components/urgent-announcement.mjs'
import { WC_announcementsWidget } from './web-components/announcements.mjs'
import * as unreadAnnouncements from './modules/unreadAnnouncements.mjs'
import * as notify from './modules/notify.mjs'

const page = document.querySelector('main').id.toLowerCase()

if (page !== 'account') {
    cloneAndUpdateMenu()
}

//init web components
if (page === 'dashboard') {
    utils.appendWidgets(utils.getPreferences())

    if (utils.storageAvailable('localStorage')) {
        const collapsedLS = utils.getLocalStorage('collapsed')
        if (!collapsedLS) {
            const obj = {
                announcements: true,
                courses: true,
                schedule: true,
                progress: true
            }
            utils.setLocalStorage('collapsed', obj)
        }
    }
}

if (page === 'account') {
    setDashboardPreferences()
    setMenuPreferences()
}

if (page === 'announcements-overview') {
    const announcementList = document.getElementById('announcements')
    announcementList.remove()
    document.querySelector('main section').append(document.createElement('announcements-widget'))
    WC_announcementsWidget(page)
}


//check if browser is online
if (navigator.onLine) {
    //urgent announcements
    const socket = io()

    //subscribe to urgent-announcements
    socket.emit('join', page)

    //on urgent-announcement hook update interface (see WC_urgentAnnouncement)
    socket.on('urgent-announcement', announcement => {
        const urgentAnnouncement = document.querySelector('urgent-announcement')

        if (utils.exists([urgentAnnouncement])) {
            urgentAnnouncement.setAttribute('message', announcement.content)
            urgentAnnouncement.setAttribute('uid', announcement.newsItemId)
        }

        if ('Notification' in window) {
            navigator.serviceWorker.ready //wait for sw to be ready
                .then(registration => {
                    Notification.requestPermission(status => {
                        notify.displayNotification(announcement.title, announcement.content)
                    })
                })
        }
    })
}




//menu 
const menuIcon = document.getElementById('menu-icon')
const menu = document.getElementById('menu')

if (utils.exists([menuIcon, menu])) {
    document.querySelector('#fallback').remove()

    //toggle menu (on mobile)
    menuIcon.addEventListener('click', event => {
        event.preventDefault()

        menu.classList.toggle('hide')
    })
}




//search 
const searchBar = document.getElementById('search-bar')
const searchResetIcon = document.getElementById('search-reset')
const searchIcon = document.querySelector('#search-container input[type=submit]')

if (utils.exists([searchBar, searchResetIcon, searchIcon])) {

    //control search-reset icon 
    searchBar.addEventListener('focus', () => search.showReset())
    searchBar.addEventListener('blur', () => search.hideReset())


    //reset search input
    searchResetIcon.addEventListener('click', e => search.reset(e))


    //depending on search-query either give focus to searchbar or submit search-query
    searchIcon.addEventListener('click', e => {
        if (searchBar.value === "") {
            search.focus(e)
        }
    })


    //listen to keyboard input
    document.addEventListener('keypress', e => {
        switch (e.key) {
            case "/":
                search.focus(e) //give searchbar focus and hide search-reset icon
                break
        }
    })
}


//unread announcement indicator in menu
const announcementMenuItem = document.querySelector('#menu-primary-links a:last-of-type')

if (utils.exists([announcementMenuItem]) && utils.storageAvailable('localStorage')) {
    unreadAnnouncements.indicate(announcementMenuItem)
}