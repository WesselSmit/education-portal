import * as search from './modules/search.mjs'


const searchBar = document.getElementById('search-bar')

//control search-reset icon 
searchBar.addEventListener('focus', () => search.showReset())
searchBar.addEventListener('blur', () => search.hideReset())


//reset search input
const searchResetIcon = document.getElementById('search-reset')
searchResetIcon.addEventListener('click', e => search.reset(e))


//listen to keyboard input
document.addEventListener('keypress', e => {
    switch (e.key) {
        case "/":
            search.focus(e) //give searchbar focus and hide search-reset icon
            break
    }
})