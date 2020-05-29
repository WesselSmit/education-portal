import * as utils from '../modules/utils.mjs'

export { template as WC_urgentAnnouncement }

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