import { setLocalStorage, getLocalStorage } from '../modules/utils.mjs'

const container = document.querySelector('#account form')
export default function togglePreferences() {
    container.classList.remove('disabled')

    const savedPreferences = getLocalStorage('preferences')
    if (savedPreferences) {
        container.textContent = ''
        savedPreferences.forEach(preference => container.append(createLabels(preference)))
    } else {
        setPreferencesObject()
    }

    const inputs = [...document.querySelectorAll('#account form label')]

    inputs.forEach(label => {
        stateHandler(label)
        dragHandler(label)
    })

    orderHandler()
}

// Manipulating the order of the DOM
function orderHandler() {
    container.addEventListener('dragover', event => {
        event.preventDefault()

        const afterElement = getElementAfterDrag(event.clientY)
        const draggable = document.querySelector('.dragging')

        afterElement === null ? container.appendChild(draggable) : container.insertBefore(draggable, afterElement)
    })
}

function getElementAfterDrag(y) {
    const draggableElements = [...container.querySelectorAll('label:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function dragHandler(label) {
    label.addEventListener('dragstart', () => {
        label.classList.add('dragging')
    })

    label.addEventListener('dragend', () => {
        label.classList.remove('dragging')
        setPreferencesObject()
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
    label.addEventListener('change', event => {
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

// Rearanging order
function createLabels(preference) {
    const label = document.createElement('label')
    label.id = preference.id
    label.draggable = true

    const input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = preference.state

    label.append(input)
    label.append(preference.name)

    return label
}