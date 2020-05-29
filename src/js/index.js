import * as utils from './modules/utils.mjs'
import * as search from './modules/search.mjs'

const page = document.querySelector('main').id.toLowerCase()




const template = document.createElement('template')
template.innerHTML = `
<style>
    div {
        display: grid;
        grid-template-columns: 1fr 60px;
        grid-template-rows: 40px;
        align-items: center;
    }
    div.hide {
        position: absolute;
        left: -9999px;
    }
    p {
        margin: 0;
        padding-left: 30px;
        color: black;
        justify-self: start;
    }
    img {
        padding-right: 20px;
        grid-column: 2 / 3;
        justify-self: end;
        cursor: pointer;
    }
</style>
<div class="hide">
    <p></p>
    <img src="./media/icons/notification-exit.svg" alt="hide notification">
</div>`



class urgentAnnouncement extends HTMLElement {

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector('p').textContent = this.getAttribute('message')
        this.shadowRoot.querySelector('img').addEventListener('click', () => {
            this.hide()
            this.store()
        })
    }

    static get observedAttributes() {
        return ['uid']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue && newValue != "") {
            const uid = this.getAttribute('uid')
            const storedHistory = utils.getLocalStorage('read-history')
            if (storedHistory) {
                if (!storedHistory.includes(uid)) {
                    this.updateContent()
                    this.show()
                }
            } else {
                this.updateContent()
                this.show()
            }
        }
    }

    updateContent() {
        this.shadowRoot.querySelector('p').textContent = this.getAttribute('message')
    }

    show() {
        this.shadowRoot.querySelector('div').classList.remove('hide')
    }

    hide() {
        this.shadowRoot.querySelector('div').classList.add('hide')
    }

    store() {
        if (utils.storageAvailable('localStorage')) {
            const storedHistory = utils.getLocalStorage('read-history')
            const readHistory = storedHistory ? storedHistory : []

            readHistory.push(this.getAttribute('uid'))
            utils.setLocalStorage('read-history', readHistory)
        }
    }
}

window.customElements.define('urgent-announcement', urgentAnnouncement)




const socket = io()

//subscribe to urgent-announcements
socket.emit('join', page)

//on urgent-announcement hook update interface
socket.on('urgent-announcement', announcement => {
    const urgentAnnouncement = document.querySelector('urgent-announcement')

    if (utils.exists([urgentAnnouncement])) {
        urgentAnnouncement.setAttribute('message', announcement.title)
        urgentAnnouncement.setAttribute('uid', announcement.newsItemId)
    }
})




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




const data = { name: 'Sjors' }
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}

fetch('/', options)