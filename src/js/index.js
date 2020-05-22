import * as utils from './modules/utils.mjs'
import * as search from './modules/search.mjs'


//menu 
const menuIcon = document.getElementById('menu-icon')

if (utils.exists([menuIcon])) {

    //toggle menu (on mobile)
    menuIcon.addEventListener('click', () => {
        const menu = document.getElementById('menu')
        menu.classList.toggle('hide')
    })
}




//search 
const searchBar = document.getElementById('search-bar')
const searchResetIcon = document.getElementById('search-reset')

if (utils.exists([searchBar, searchResetIcon])) {

    //control search-reset icon 
    searchBar.addEventListener('focus', () => search.showReset())
    searchBar.addEventListener('blur', () => search.hideReset())


    //reset search input
    searchResetIcon.addEventListener('click', e => search.reset(e))


    //listen to keyboard input
    document.addEventListener('keypress', e => {
        switch (e.key) {
            case "/":
                search.focus(e) //give searchbar focus and hide search-reset icon
                break
        }
    })
}