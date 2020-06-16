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
    cursor: pointer;
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
    cursor: pointer;
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
.announcements-container #announcement-legend p.unactive {
    color: #666666;
}
.announcements-container #announcement-legend p.unactive::before {
    background-color: #DDDDDD;
}
.announcements-container a {
	margin: 0 0 15px 0;
	display: block;
	color: black;
	text-decoration: none;
}
.announcements-container a.hide {
    position: absolute;
    left: -9999px;
}
.announcements-container a:hover {
	background-color: #F2F2F2;
}
.announcements-container a:focus {
    background-color: #DDDDDD;
}
.announcements-container a:not(.read):focus .read-indicator {
    left: unset;
    right: 15px;
}
.announcements-container a:focus .read-indicator:hover {
    background-color: #F2F2F2;
    border: 1px solid #F2F2F2;
}
.announcements-container .announcement {
	margin: 0;
	padding: 5px 0 5px 10px;
    border-left: 5px solid;
    position: relative;
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
.announcements-container .read .announcement {
    position: static;
}    
.announcements-container a:not(.read) .announcement:hover .read-indicator {
    left: unset;
    right: 15px;
}
.announcements-container .read .announcement .read-indicator {
    position: absolute;
    left: -9999px;
}
.announcements-container.collapsed, 
.announcements-container.collapsed + a {
    position: absolute;
    left: -9999px;
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
#announcement-legend:empty {
    height: 150px;
    width: 100%;
    background: url(media/icons/loader.gif);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 200px 200px;
}
.read-indicator {
    position: absolute;
    top: 50%;
    left: -9999px;
    transform: translateY(-50%);
    padding: 13px;
    border: 1px solid transparent;
    border-radius: 999px;
    background-image: url(../media/icons/mark-as-read.svg);
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: center;
}
.read-indicator:hover {
    background-color: #DDDDDD;
    border: 1px solid #DDDDDD;
}
.read-indicator:focus {
    background-color: #F2F2F2;
    border: 1px solid #F2F2F2;
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

                    if (this.filteredCats && this.filteredCats.length > 0) {
                        this.filteredCats.forEach(cat => {
                            this.shadowRoot.querySelectorAll(`.announcements-container > a`).forEach(item => {
                                if (item.classList.contains(cat)) {
                                    item.classList.add('hide')
                                }
                            })


                            const catFilter = this.shadowRoot.querySelector(`.${cat}`)
                            catFilter.classList.add('unactive')
                        })
                    }
                })

            this.announcementContainer = this.shadowRoot.querySelector('.announcements-container')
            this.announcementLegend = this.shadowRoot.querySelector('#announcement-legend')

            const widgetTitle = this.shadowRoot.querySelector('h2')
            widgetTitle.addEventListener('click', () => this.announcementContainer.classList.toggle('collapsed'))

            if (utils.storageAvailable('localStorage')) {
                const storedFilters = utils.getLocalStorage('filters')
                this.filteredCats = storedFilters ? storedFilters : []
            }

            if (pageName === 'announcements-overview') {
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

                const legendItem = this.shadowRoot.querySelector(`.${cat}`)
                legendItem.addEventListener('click', e => this.filter(e.target))
            })
        }

        appendAnnouncements(announcements) {
            announcements.forEach(announcement => {
                this.announcementContainer.insertAdjacentHTML('beforeend', `
				<a href="/announcements/${announcement.newsItemId}" target="_self" uid="${announcement.newsItemId}" class="${announcement.tags[0]}">
					<div class="announcement ${announcement.tags[0]}" id="${announcement.newsItemId}">
                		<p>${announcement.title}</p>
                        <p>${announcement.publishDate} - ${announcement.tags[0]}</p>
                        <span class="read-indicator"></span>
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

                    const readIndicator = link.querySelector('.read-indicator')
                    readIndicator.addEventListener('click', e => this.mark(e, link))
                }
            })
        }

        store(announcement) {
            this.readHistory.push(announcement.getAttribute('uid'))
            utils.setLocalStorage('read-history', this.readHistory)
        }

        filter(el) {
            if (!this.filteredCats.includes(el.textContent)) {
                this.filteredCats.push(el.textContent)
            } else {
                const index = this.filteredCats.indexOf(el.textContent)
                this.filteredCats.splice(index, 1)
            }

            el.classList.toggle('unactive')

            utils.setLocalStorage('filters', this.filteredCats)

            const announcementsInFilteredCat = []
            this.filteredCats.forEach(cat => {
                const announcementsInCat = this.shadowRoot.querySelectorAll(`.announcements-container > a.${cat}`)
                announcementsInFilteredCat.push(...announcementsInCat)
            })

            this.shadowRoot.querySelectorAll(`.announcements-container > a`).forEach(item => {
                if (announcementsInFilteredCat.includes(item)) {
                    item.classList.add('hide')
                } else {
                    item.classList.remove('hide')
                }
            })
        }

        mark(e, link) {
            e.preventDefault()
            link.classList.add('read')
            link.blur()
        }
    }

    window.customElements.define('announcements-widget', announcementList)
}