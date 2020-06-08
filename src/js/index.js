import * as utils from './modules/utils.mjs'
import * as search from './modules/search.mjs'
import togglePreferences from './modules/togglePreferences.mjs'
import urgentAnnouncement from './web-components/urgent-announcement.mjs'
import { WC_studyprogress } from './web-components/study-progress.mjs'
import { WC_scheduleWidget } from './web-components/schedule.mjs'
import { WC_courseoverview } from './web-components/course-overview.mjs'
import { WC_announcementsWidget } from './web-components/announcements.mjs'

import { getLocalStorage } from './modules/utils.mjs'

const page = document.querySelector('main').id.toLowerCase()

//init dashboard
if (page === 'dashboard') {
    let widgetElements

    const preferences = getLocalStorage('preferences')
    if (preferences) {
        widgetElements = checker(preferences)
    } else {
        widgetElements = ['announcements-widget', 'study-progress', 'course-overview', 'schedule-widget']
    }

    appendWidgets(widgetElements)
}

if (page === 'account') {
    togglePreferences()
}

if (page === 'announcements-overview') {
    const announcementList = document.getElementById('announcements')
    announcementList.remove()
    document.querySelector('main section').append(document.createElement('announcements-widget'))
    WC_announcementsWidget(page)
}

function appendWidgets(widget) {
    // Remove EJS templates
    const domElements = ['announcements', 'study-progress', 'course-overview', 'schedule']
    domElements.forEach(element => document.getElementById(element).remove())

    // Adding widgets
    widget.forEach(item => {
        document.querySelector('main section').append(document.createElement(item))

        if (item === 'study-progress') {
            WC_studyprogress()
        }
        if (item === 'course-overview') {
            WC_courseoverview()
        }
        if (item === 'schedule-widget') {
            WC_scheduleWidget()
        }
        if (item === 'announcements-widget') {
            WC_announcementsWidget(page)
        }
    })
}

function checker(preferences) {
    const widgetElements = []

    // Announcements
    preferences.forEach(preference => {
        preference.id = parseInt(preference.id)

        if (preference.state && preference.id === 0) {
            widgetElements.push('announcements-widget')
        }
        if (preference.state && preference.id === 1) {
            widgetElements.push('study-progress')
        }
        if (preference.state && preference.id === 2) {
            widgetElements.push('course-overview')
        }
        if (preference.state && preference.id === 3) {
            widgetElements.push('schedule-widget')
        }
    })

    return widgetElements
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
            urgentAnnouncement.setAttribute('message', announcement.title)
            urgentAnnouncement.setAttribute('uid', announcement.newsItemId)
        }
    })
}




//menu 
const menuIcon = document.getElementById('menu-icon')
const menu = document.getElementById('menu')

if (utils.exists([menuIcon, menu])) {

    //toggle menu (on mobile)
    menuIcon.addEventListener('click', () => {
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