export { init as WC_studyprogress }

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

#recent-results div {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr auto;
}

#recent-results div:not(:last-of-type) {
    margin-bottom: 15px;
}

#recent-results span {
    display: block;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    width: 5px;
    height: 100%;
}

span.success {
    background-color: #25167A;
}

span.failed {
    background-color: #DDDDDD;
}

#recent-results p:nth-of-type(1) {
    grid-column: 2 / 3;
    padding: 4px 0px 0px 10px;
}

#recent-results p:nth-of-type(2) {
    grid-row: 1 / 3;
    grid-column: 3 / 4;
    align-self: center;
}

#recent-results p:nth-of-type(3) {
    padding: 0px 0px 4px 10px;
    font-size: 14px;
    color: #666666;
}

#recent-results p:nth-of-type(1),
#recent-results p:nth-of-type(2) {
    font-family: "OpenSans-Bold", sans-serif, Arial, Helvetica;

}

#recent-progress {
    margin-top: 30px;
}

#recent-progress div {
    display: grid;
    grid-template-columns: auto 1fr auto;
}

#recent-progress div span {
        display: block;
        width: 5px;
}

#recent-progress p {
    padding: 5px 0px;
}

#recent-progress p:first-of-type {
    padding-left: 10px;
}

#recent-progress .current-year {
    background-color: #DDDDDD;
}

#recent-progress .current-year span {
    background-color: #25167A;
}

#recent-progress .current-year p {
    font-family: "OpenSans-Bold", sans-serif, Arial, Helvetica;
}

#recent-progress .current-year p:last-of-type {
    padding-right: 10px;
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

<h2>Studieresultaten en -voortgang</h2>

<div id="recent-results"></div>
<div id="recent-progress"></div>

<a target="_blank" href="https://sis.hva.nl/">Alle resultaten in SIS
    <img src="/media/icons/arrow-right.svg" alt="arrow-right"></img>
</a>
`

function init() {
    class StudyProgress extends HTMLElement {
        constructor() {
            // Setup
            super()
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))

            this.data = this.getData().then(json => {
                const [results, progress] = json

                this.resultComponent(results)
                this.progressComponent(progress)
            })

            this.resultsContainer = this.shadowRoot.querySelector('#recent-results')
            this.progressContainer = this.shadowRoot.querySelector('#recent-progress')
        }

        progressComponent(results) {
            results.forEach(result => {
                const div = document.createElement('div')
                if (result.currentYear) {
                    div.classList.add('current-year')
                }

                const template = `
                <span></span>
                <p>Leerjaar ${result.studyYear}</p>
                <p>${result.studypoints.achieved}/${result.studypoints.available} studiepunten</p>`

                div.innerHTML = template
                this.progressContainer.append(div)
            })
        }


        resultComponent(results) {
            results.forEach(result => {
                // Parent container
                const div = document.createElement('div')

                let indicator
                if (typeof result.grade === 'number' && result.grade >= 5.5 || result.grade === 'V') {
                    indicator = `<span class="success"></span>`
                } else if (typeof result.grade === 'number' && result.grade < 5.5 || result.grade === '-' || result.grade === 'GR') {
                    indicator = `<span class="failed"></span>`
                }

                const template = `
                ${indicator}
                <p>${result._links.course.title}</p>
                <p>${result.grade}</p>
                <p>${result.fullDate}</p>
                `

                div.innerHTML = template
                this.resultsContainer.append(div)
            })
        }

        // Helpers
        getData() {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }

            return fetch('/studyprogress', options).then(res => res.json())
        }
    }

    customElements.define('study-progress', StudyProgress)
}