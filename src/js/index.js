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

    const preferences = getLocalStorage('preferences')
    console.log(preferences)

    const domElements = ['announcements', 'study-progress', 'course-overview', 'schedule']
    const widgetElements = ['announcements-widget', 'study-progress', 'course-overview', 'schedule-widget']
    appendWidgets(domElements, widgetElements)
}

if (page === 'account') {
    togglePreferences()
}

function appendWidgets(domEl, widget) {
    for (let i = 0; i < domEl.length; i++) {
        if (document.getElementById(domEl[i])) {
            document.getElementById(domEl[i]).remove()
        }
        document.querySelector('main section').append(document.createElement(widget[i]))
    }

    WC_announcementsWidget(page)
    WC_studyprogress()
    WC_courseoverview()
    WC_scheduleWidget()
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