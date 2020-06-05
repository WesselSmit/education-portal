import { setLocalStorage, getLocalStorage } from '../modules/utils.mjs'

export default function togglePreferences() {
    document.querySelector('#account form').classList.remove('disabled')
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

        // Toggle
        label.addEventListener('change', event => {
            // Data
            const id = label.id
            const state = event.target.checked

            // Change LocalStorage
            const data = getLocalStorage('preferences')
            data[id].state = state
            setLocalStorage('preferences', data)
        })
    })
}