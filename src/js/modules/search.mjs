const searchBar = document.getElementById('search-bar')
const searchResetIcon = document.getElementById('search-reset')

export function focus(e) {
    e.preventDefault()
    searchBar.focus()
}

export function showReset() {
    searchResetIcon.classList.remove('hide')
}

export function hideReset() {
    if (searchBar.value === "") {
        searchResetIcon.classList.add('hide')
    }
}

export function reset(e) {
    searchBar.value = ""
    focus(e)
}