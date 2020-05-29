import * as utils from './modules/utils.mjs'
import * as search from './modules/search.mjs'
import scheduleHandler from './modules/schedule.mjs'

// Dashboard interaction with Timetable
scheduleHandler()




//menu 
const menuIcon = document.getElementById('menu-icon')
const menu = document.getElementById('menu')

if (utils.exists([menuIcon, menu])) {

    //toggle menu (on mobile)
    menuIcon.addEventListener('click', () => {
        menu.classList.toggle('hide')
    })
}




//search 
const searchBar = document.getElementById('search-bar')
const searchResetIcon = document.getElementById('search-reset')
const searchIcon = document.querySelector('#search-container input[type=submit]')

if (utils.exists([searchBar, searchResetIcon, searchIcon])) {

    //control search-reset icon 
    searchBar.addEventListener('focus', () => search.showReset())
    searchBar.addEventListener('blur', () => search.hideReset())


    //reset search input
    searchResetIcon.addEventListener('click', e => search.reset(e))


    //depending on search-query either give focus to searchbar or submit search-query
    searchIcon.addEventListener('click', e => {
        if (searchBar.value === "") {
            search.focus(e)
        }
    })


    //listen to keyboard input
    document.addEventListener('keypress', e => {
        switch (e.key) {
            case "/":
                search.focus(e) //give searchbar focus and hide search-reset icon
                break
        }
    })
}