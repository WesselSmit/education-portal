import * as utils from '../modules/utils.mjs'

export { init as WC_announcementsWidget }

const template = document.createElement('template')
template.innerHTML = `
<style>
*:focus {
    outline: none;
}
h2 {
    font-size: 24px;
    color: #25167A;
    text-transform: uppercase;
    padding-bottom: 8px;
    border-bottom: 1px solid #DDDDDD;
    margin: 0 0 15px 0;
	font-family: "OpenSans-Regular", sans-serif, Arial, Helvetica;
	font-weight: lighter;
	line-height: 1.1;
}
p {
	margin: 0;
}
.announcements-container #announcement-legend {
	margin-bottom: 20px;
}
.announcements-container #announcement-legend p {
	color: black;
	font-size: 14px;
	display: inline-block;
	margin-right: 20px;
}
.announcements-container #announcement-legend p:last-of-type {
	margin-right: 0;
}
.announcements-container #announcement-legend p::before {
	content: "";
	height: 15px;
	margin-bottom: -2px;
	width: 15px;
	margin-right: 10px;
	display: inline-block;
}
.announcements-container #announcement-legend p.Opleiding::before {
	background-color: #DC143C;
}
.announcements-container #announcement-legend p.Faculteit::before {
	background-color: #DCB614;
}
.announcements-container #announcement-legend p.HvA::before {
	background-color: #149EDC;
}
.announcements-container #announcement-legend p.Medezeggenschap::before {
	background-color: #14DC69;
}
.announcements-container a {
	margin: 0 0 15px 0;
	display: block;
	color: black;
	text-decoration: none;
}
.announcements-container a:hover {
	background-color: #F2F2F2;
}
.announcements-container a:focus {
	background-color: #DDDDDD;
}
.announcements-container .announcement {
	margin: 0;
	padding: 5px 0 5px 10px;
	border-left: 5px solid;
}
.announcements-container .announcement.Opleiding {
	border-color: #DC143C;
}
.announcements-container .announcement.Faculteit {
	border-color: #DCB614;
}
.announcements-container .announcement.HvA {
	border-color: #149EDC;
}
.announcements-container .announcement.Medezeggenschap {
	border-color: #14DC69;
}
.announcements-container .announcement p:first-of-type {
    font-family: "OpenSans-Bold", sans-serif, Arial, Helvetica;
}
.announcements-container .read .announcement p:first-of-type {
    font-family: "OpenSans-Regular", sans-serif, Arial, Helvetica;
}
.announcements-container .announcement p:last-of-type {
	color: #666666;
	font-size: 14px;
}    
.allAnnouncements {
    margin-top: 30px;
    text-decoration: none;
    color: #25167A;
    display: flex;
	align-items: center;
}
.allAnnouncements:hover,
.allAnnouncements:focus {
        text-decoration: underline;
}
.allAnnouncements.hide {
    position: absolute;
    left: -9999px;
}
.allAnnouncements img {
        height: 12px;
        margin-left: 20px;
}
</style>
<div id="announcements"></div>
<h2>Mededelingen</h2>
<div class="announcements-container">
	<div id="announcement-legend"></div>
</div>
<a class="allAnnouncements" href="/announcements/" target="_self">Alle mededelingen
	<img src="/media/icons/arrow-right.svg" alt="arrow-right"></img>
</a>`

function init(pageName) {
    class announcementList extends HTMLElement {
        constructor() {
            super()

            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))

            this.getData()
                .then(json => {
                    const [announcements, categories] = json
                    this.createLegenda(categories)
                    if (pageName === 'dashboard') {
                        announcements.splice(5, announcements.length)
                    }
                    this.appendAnnouncements(announcements)
                })
            this.announcementContainer = this.shadowRoot.querySelector('.announcements-container')
            this.announcementLegend = this.shadowRoot.querySelector('#announcement-legend')

            if (pageName === 'announcements-overview') {
                console.log('ja')
                this.shadowRoot.querySelector('.allAnnouncements').classList.add('hide')
            }
        }

        getData() {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }

            return fetch('/announcementslist', options).then(res => res.json())
        }

        createLegenda(categories) {
            categories.forEach(cat => {
                this.announcementLegend.insertAdjacentHTML('beforeend', `<p class="${cat}">${cat}</p>`)
            })
        }

        appendAnnouncements(announcements) {
            announcements.forEach(announcement => {
                this.announcementContainer.insertAdjacentHTML('beforeend', `
				<a href="/announcements/${announcement.newsItemId}" target="_self" uid="${announcement.newsItemId}">
					<div class="announcement ${announcement.tags[0]}" id="${announcement.newsItemId}">
                		<p>${announcement.title}</p>
                		<p>${announcement.publishDate} - ${announcement.tags[0]}</p>
           			</div>
				</a>`)

                if (utils.storageAvailable('localStorage')) {
                    const storedHistory = utils.getLocalStorage('read-history')
                    this.readHistory = storedHistory ? storedHistory : []

                    const link = this.announcementContainer.querySelector('a:last-of-type')

                    if (this.readHistory.includes(link.getAttribute('uid'))) {
                        link.classList.add('read')
                    }
                    link.addEventListener('click', () => this.store(link))
                }
            })
        }

        store(announcement) {
            this.readHistory.push(announcement.getAttribute('uid'))
            utils.setLocalStorage('read-history', this.readHistory)
        }
    }

    window.customElements.define('announcements-widget', announcementList)
}