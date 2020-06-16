export { init as WC_courseoverview }

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

.navigator {
    background-color: #DDDDDD;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #25167A;
    font-size: 16px;
}

.navigator span  {
    cursor: default;
}

.navigator img {
    padding: 10px;
}

.navigator img:not(.disabled) {
    cursor: pointer;
}

.navigator img.disabled {
    pointer-events: none;
    opacity: .5;
}

.course {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    padding: 15px 20px;
    border-bottom: 1px solid #DDDDDD;
}

.course p:first-of-type {
    font-family: "OpenSans-Bold", sans-serif, Arial, Helvetica;
    align-self: center;
}

.course ul {
    list-style: none;
    margin: 0;
    padding: 0;
    align-self: center;
}

.course ul li {
    display: inline;
}

.course ul li:not(:last-of-type):after {
    content: ", ";
    white-space: pre;
}

a {
    margin-top: 30px;
    text-decoration: none;
    color: #25167A;
    display: flex;
    align-items: center;
}

a:hover,
a:focus {
    text-decoration: underline;
    outline: none;
}

a img {
    height: 12px;
    margin-left: 20px;
}

#course-overview:empty {
    height: 150px;
    width: 100%;
    background: url(media/icons/loader.gif);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 200px 200px;
}
.navigator.collapsed,
#course-overview.collapsed,
#course-overview.collapsed + a {
    position: absolute;
    left: -9999px;
}
</style>

<h2>Vakkenoverzicht</h2>

<div class="navigator">
    <img src="/media/icons/arrow-left.svg" alt="arrow-left"></img>
    <span></span>
    <img src="/media/icons/arrow-right.svg" alt="arrow-right"></img>
</div>

<div id="course-overview"></div>

<a target="_blank" href="https://sis.hva.nl/">Volledig overzicht
    <img src="/media/icons/arrow-right.svg" alt="arrow-right"></img>
</a>
`

function init() {
    class CourseOverview extends HTMLElement {
        constructor() {
            super()

            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))

            this.courseContainer = this.shadowRoot.querySelector('#course-overview')
            this.courseMoment = this.shadowRoot.querySelector('.navigator span')
            this.arrowPrevious = this.shadowRoot.querySelector('.navigator img:first-of-type')
            this.arrowNext = this.shadowRoot.querySelector('.navigator img:last-of-type')
            this.yearIndex = 2
            this.quarterIndex = 3

            this.data = this.getData().then(json => {
                this.navigateHandler()

                const data = json[this.yearIndex].quarters[this.quarterIndex].courses
                this.updateCourseOverview(data)

                this.data = json
            })

            this.arrowPrevious.addEventListener('click', () => this.navigate('previous'))
            this.arrowNext.addEventListener('click', () => this.navigate('next'))

            const widgetTitle = this.shadowRoot.querySelector('h2')
            widgetTitle.addEventListener('click', () => {
                this.shadowRoot.querySelector('.navigator').classList.toggle('collapsed')
                this.courseContainer.classList.toggle('collapsed')
            })
        }

        updateNavigator() {
            this.courseMoment.textContent = `Jaar ${this.yearIndex + 1} - Blok ${this.quarterIndex + 1}`
        }

        updateCourseOverview(courses) {
            this.courseContainer.textContent = ""
            this.updateNavigator()

            courses.forEach(course => {
                const div = document.createElement('div')
                div.classList.add('course')

                const courseName = document.createElement('p')
                courseName.textContent = course.course
                div.append(courseName)

                const list = document.createElement('ul')
                course.lecturers.forEach(lecturer => {
                    const teacher = document.createElement('li')
                    lecturer === "" ? teacher.textContent = 'Geen specifieke docent' : teacher.textContent = lecturer
                    list.append(teacher)
                })
                div.append(list)

                this.courseContainer.append(div)
            })
        }

        navigate(direction) {
            if (direction === 'previous') {
                if (this.quarterIndex > 0) {
                    this.quarterIndex--
                } else if (this.quarterIndex === 0 && this.yearIndex > 0) {
                    this.quarterIndex = 3
                    this.yearIndex--
                }
            }

            if (direction === 'next') {
                if (this.quarterIndex < 3) {
                    this.quarterIndex++
                } else if (this.quarterIndex === 3 && this.yearIndex < 3) {
                    this.quarterIndex = 0
                    this.yearIndex++
                }
            }

            this.navigateHandler()

            const data = this.data[this.yearIndex].quarters[this.quarterIndex].courses
            this.updateCourseOverview(data)
        }

        navigateHandler() {
            this.yearIndex === 0 && this.quarterIndex === 0 ?
                this.arrowPrevious.classList.add('disabled') : this.arrowPrevious.classList.remove('disabled')

            this.yearIndex === 3 && this.quarterIndex === 3 ?
                this.arrowNext.classList.add('disabled') : this.arrowNext.classList.remove('disabled')
        }

        // Helpers
        getData() {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }

            return fetch('/courseoverview', options).then(res => res.json())
        }
    }

    customElements.define('course-overview', CourseOverview)
}