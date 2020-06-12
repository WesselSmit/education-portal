import { setLocalStorage, getLocalStorage } from '../../modules/utils.mjs'
import Sortable from 'sortablejs'

const container = document.querySelector('#preferences')
export default function setDashboardPreferences() {
    container.classList.remove('disabled')

    getPreferences()
    stateHandler()
    dragHandler()
}

function getPreferences() {
    const preferences = getLocalStorage('preferences')
    if (preferences) {
        container.textContent = ''
        preferences.forEach(preference => container.append(createLabels(preference)))
    } else {
        setPreferencesObject()
    }
}

function dragHandler() {
    const preferencesContainer = document.querySelector('#preferences')

    new Sortable(preferencesContainer, {
        draggable: ".on",
        animation: 150,
        onStart: (event) => addStylingToDropZones(event),
        onEnd: (event) => {
            removeStylingFromDropZones(event)
            setPreferencesObject()
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

// Saving and changing preferences 
function setPreferencesObject() {
    const inputs = [...document.querySelectorAll('#preferences label')]
    let preferences = []

    inputs.forEach(label => {
        // Data
        const id = label.id
        const text = label.textContent
        const state = label.querySelector('input').checked

        // Set LocalStorage
        const object = { id: id, name: text, state: state }
        preferences.push(object)
        setLocalStorage('preferences', preferences)
    })

    return preferences
}

function stateHandler() {
    const inputs = [...document.querySelectorAll('#preferences label')]
    const data = getLocalStorage('preferences')

    inputs.forEach(label => {
        updateState(data, label)

        label.addEventListener('change', event => {
            // Data
            const id = label.id
            const state = event.target.checked

            // Change LocalStorage
            const preference = data.find(preference => preference.id === id)
            preference.state = state
            setLocalStorage('preferences', data)

            // Change state visualy
            if (preference.state) {
                label.classList.add('on')
                label.classList.remove('off')
            } else {
                label.classList.add('off')
                label.classList.remove('on')
                container.appendChild(label)
                setPreferencesObject()
            }
        })
    })
}

function updateState(data, element) {
    const preference = data.find(preference => preference.id === element.id)
    preference.state ? element.classList.remove('off') : element.classList.add('on')
}

// Rearanging order
function createLabels(preference) {
    const label = document.createElement('label')
    label.id = preference.id
    preference.state ? label.className = 'on' : label.className = 'off'

    label.setAttribute('represents', preference.id)

    const input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = preference.state

    label.append(input)
    label.append(preference.name)

    return label
}