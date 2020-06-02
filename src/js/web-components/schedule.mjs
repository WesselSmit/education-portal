export { init as WC_scheduleWidget }

const template = document.createElement('template')
template.innerHTML = `
<style>
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
#navigator {
    background-color: #DDDDDD;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #25167A;
    font-size: 16px;
}

#navigator img {
    padding: 10px;
}

#navigator img:not(.disabled) {
    cursor: pointer;
}

#navigator img.disabled {
    pointer-events: none;
    opacity: .5;
}

.schedule-course {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 5px;
    padding: 15px 20px;
    border-bottom: 1px solid #DDDDDD;
}

.schedule-course p:first-of-type,
.schedule-course p:nth-of-type(3) {
    font-family: "OpenSans-Bold", sans-serif, Arial, Helvetica;
}

a {
    margin-top: 30px;
    text-decoration: none;
    color: #25167A;
    display: flex;
    align-items: center;
}

a img {
    height: 12px;
    margin-left: 20px;
}
</style>
<h2>Dagrooster</h2>
<div id="navigator">
	<img src="/media/icons/arrow-left.svg" alt="arrow-left" class="disabled"></img>
	<span></span>
	<img src="/media/icons/arrow-right.svg" alt="arrow-right"></img>
</div>
<div id="schedules-container"></div>
<a target="_blank" href="https://rooster.hva.nl/schedule">Volledig rooster
	<img src="/media/icons/arrow-right.svg" alt="arrow-right"></img>
</a>
`

function init() {
    class schedule extends HTMLElement {

        constructor() {
            super()

            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))

            this.data = this.getData()
                .then(json => {
                    this.updateSchedule(json[0])
                    this.data = json
                })

            this.navigator = this.shadowRoot.getElementById('navigator')
            this.arrowPrevious = this.navigator.querySelector('#navigator img:first-of-type')
            this.arrowNext = this.navigator.querySelector('#navigator img:last-of-type')

            this.arrowNext.addEventListener('click', () => this.navigate('next'))
            this.arrowPrevious.addEventListener('click', () => this.navigate('previous'))
            this.index = 0
        }

        getData() {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }

            return fetch('/schedule', options).then(res => res.json())
        }

        updateSchedule(data) {
            const schedulesContainer = this.shadowRoot.getElementById('schedules-container')
            schedulesContainer.textContent = ""

            this.navigator.querySelector('span').textContent = `${data.day}-${data.month}-${data.year}`

            data.schedules.forEach(schedule => {
                const classRoom = schedule._embedded ? schedule._embedded.rooms[0].abbreviation : "Geen lokaal"

                const div = document.createElement('div')
                div.classList.add('schedule-course')
                schedulesContainer.appendChild(div)

                const time = document.createElement('p')
                time.textContent = `${schedule.startDateTime.time} - ${schedule.endDateTime.time}`
                div.appendChild(time)

                const name = document.createElement('p')
                name.textContent = schedule._links.courses[0].title
                div.appendChild(name)

                const room = document.createElement('p')
                room.textContent = classRoom
                div.appendChild(room)

                const teacher = document.createElement('p')
                teacher.textContent = schedule._links.lecturers[0].title
                div.appendChild(teacher)
            })
        }

        navigate(direction) {
            direction === 'previous' ? this.index-- : this.index++

            this.index === 0 ? this.arrowPrevious.classList.add('disabled') : this.arrowPrevious.classList.remove('disabled')
            this.index === 4 ? this.arrowNext.classList.add('disabled') : this.arrowNext.classList.remove('disabled')

            this.updateSchedule(this.data[this.index])
        }
    }

    window.customElements.define('schedule-widget', schedule)
}