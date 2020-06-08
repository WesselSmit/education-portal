import { setLocalStorage, getLocalStorage } from '../modules/utils.mjs'
import Sortable from 'sortablejs'

const container = document.querySelector('#account form')
export default function togglePreferences() {
    container.classList.remove('disabled')

    setPreferences()
    stateHandler()
    dragHandler()
}

function setPreferences() {
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
        animation: 150,
        onEnd: () => setPreferencesObject()
    })
}

// Saving and changing preferences 
function setPreferencesObject() {
    const inputs = [...document.querySelectorAll('#account form label')]
    let preferences = []

    inputs.forEach(label => {
        console.log(label)
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
    const inputs = [...document.querySelectorAll('#account form label')]
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
            preference.state === false ? label.classList.add('off') : label.classList.remove('off')
        })
    })
}

function updateState(data, element) {
    const preference = data.find(preference => preference.id === element.id)
    preference.state === false ? element.classList.add('off') : element.classList.remove('off')
}

// Rearanging order
function createLabels(preference) {
    const label = document.createElement('label')
    label.id = preference.id
    label.draggable = true
    preference.state ? label.className = 'on' : label.className = 'off'

    const input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = preference.state

    label.append(input)
    label.append(preference.name)

    return label
}