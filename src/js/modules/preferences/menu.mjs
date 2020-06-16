import { setLocalStorage, getLocalStorage, storageAvailable } from '../../modules/utils.mjs'
import Sortable from 'sortablejs'

const container = document.querySelector('#menu-preferences')
const secondaryLinks = document.querySelector('#menu-secondary-links')
const clonedLinks = [...secondaryLinks.cloneNode(true).children]

export default function setMenuPreferences() {
    container.classList.remove('disabled')

    checker() ? renderPreferences() : setPreferences()
    stateHandler()
    dragHandler()
    cloneAndUpdateMenu()
}

function cloneAndUpdateMenu() {
    let selectedMenuItems = []

    // LocalStorage
    const preferences = getLocalStorage('menu-preferences')
    preferences.forEach(preference => {
        clonedLinks.forEach(link => {
            const name = link.querySelector('p:first-of-type').textContent

            if (preference.name === name && preference.state) {
                selectedMenuItems.push(link)
            }
        })
    })

    secondaryLinks.textContent = ''
    selectedMenuItems.forEach(item => secondaryLinks.append(item))
}

function stateHandler() {
    const labels = [...container.querySelectorAll('label')]

    labels.forEach(label => {
        label.addEventListener('change', () => {
            setPreferences()

            if (label.className === 'off') {
                container.append(label)
                setPreferences()
            }

            if (label.className === 'on') {
                const firstOff = document.querySelector('#menu-preferences .off')
                container.insertBefore(label, firstOff)
                setPreferences()
            }
        })
    })
}

function renderPreferences() {
    const elements = createElements()
    appendElements(elements)
}

function appendElements(elements) {
    container.textContent = ''
    elements.forEach(element => container.append(element))
}

function createElements() {
    const preferences = getLocalStorage('menu-preferences')
    const elements = []

    preferences.forEach(preference => {
        const label = document.createElement('label')
        preference.state ? label.className = 'on' : label.className = 'off'

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.checked = preference.state

        label.append(input)
        label.append(preference.name)

        elements.push(label)
    })

    return elements
}

function checker() {
    return storageAvailable('localStorage') && getLocalStorage('menu-preferences') ?
        true : false
}

function dragHandler() {
    new Sortable(container, {
        animation: 150,
        onStart: (event) => addStylingToDropZones(event),
        onEnd: () => {
            removeStylingFromDropZones(event)
            setPreferences()
        }
    })
}

function addStylingToDropZones(event) {
    const dragLocations = [...event.target.querySelectorAll('label:not(.sortable-chosen)')]
    dragLocations.forEach(location => location.classList.add('optional-location'))
}

function removeStylingFromDropZones(event) {
    const dragLocations = [...event.target.querySelectorAll('label:not(.sortable-chosen)')]
    dragLocations.forEach(location => location.classList.remove('optional-location'))
}

function setPreferences() {
    const labels = [...container.querySelectorAll('label')]
    let preferences = []

    labels.forEach(label => {
        const text = label.textContent
        const state = label.querySelector('input').checked
        state ? label.className = 'on' : label.className = 'off'

        const object = { name: text, state: state }
        preferences.push(object)
    })

    setLocalStorage('menu-preferences', preferences)
    cloneAndUpdateMenu()
}