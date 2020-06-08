import { setLocalStorage, getLocalStorage } from '../modules/utils.mjs'
import Sortable from 'sortablejs'

const container = document.querySelector('#account form')
export default function togglePreferences() {
    container.classList.remove('disabled')

    setPreferencesObject()

    const inputs = [...document.querySelectorAll('#account form label')]
    inputs.forEach(label => stateHandler(label))

    dragHandler()
}

function dragHandler() {
    const preferencesContainer = document.querySelector('#preferences')
    Sortable.create(preferencesContainer, {
        animation: 150
    })
}

// Saving and changing preferences 
function setPreferencesObject() {
    const inputs = [...document.querySelectorAll('#account form label')]
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

function stateHandler(label) {
    label.addEventListener('click', event => {
        console.log(label)
        // Data
        const id = label.id
        const state = event.target.checked

        // Change LocalStorage
        const data = getLocalStorage('preferences')
        const preference = data.find(preference => preference.id === id)
        preference.state = state
        setLocalStorage('preferences', data)
    })
}