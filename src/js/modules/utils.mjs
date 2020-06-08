import { WC_studyprogress } from '../web-components/study-progress.mjs'
import { WC_scheduleWidget } from '../web-components/schedule.mjs'
import { WC_courseoverview } from '../web-components/course-overview.mjs'
import { WC_announcementsWidget } from '../web-components/announcements.mjs'

export function exists([...variables]) {
    const exists = variables.every(variable => variable != null)
    return exists
}


export function setLocalStorage(name, item) {
    localStorage.setItem(name, JSON.stringify(item))
}


export function getLocalStorage(item) {
    return JSON.parse(localStorage.getItem(item))
}

export function storageAvailable(type) { //source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    let storage
    try {
        storage = window[type]
        let x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch (e) {
        return e instanceof DOMException && (
                e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0)
    }
}

export function getPreferences() {
    let widgetElements

    if (storageAvailable('localStorage')) {
        const preferences = getLocalStorage('preferences')
        if (preferences) {
            widgetElements = checker(preferences)
        } else {
            widgetElements = ['announcements-widget', 'study-progress', 'course-overview', 'schedule-widget']
        }
    } else {
        widgetElements = ['announcements-widget', 'study-progress', 'course-overview', 'schedule-widget']
    }

    return widgetElements
}

export function appendWidgets(widget) {
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
            WC_announcementsWidget('dashboard')
        }
    })
}

export function checker(preferences) {
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