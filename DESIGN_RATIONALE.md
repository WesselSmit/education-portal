## Data
Because we would use personal data for our project, the client made small samples for us and supplied them in JSON. We had the idea to use MongoDB because we both have never worked with it before and we thought it would be interesting to do it once. During the development of our version of the HvA portal, we discovered that data was sometimes missing. We have written this data ourselves in JSON files and loaded it locally in our app.

**MongoDB**  
We used MongoDB for the data we received from the client. We have moved the data from the JSONs to MongoDB and set up code on the server that makes it possible to retrieve different `collections`. Since we both had no experience with this, it was quite a bit of work to figure this out in the beginning. In the end we wrote a dynamic fetcher where we can indicate as a parameter which collection we want. We then manipulate the data in separate functions in order to use the desired data in our app.

<details><summary>Example: MongoDB Fetcher</summary>

```js
const { MongoClient } = require('mongodb')
const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_NAME = 'education-portal'

module.exports = (collectionName) => {
    return MongoClient.connect(DATABASE_URL, { useUnifiedTopology: true })
        .then(database => {
            const DATABASE = database.db(DATABASE_NAME)
            const collection = DATABASE.collection(collectionName)

            return collection.find().toArray()
                .then(res => {
                    const origin = res[0]
                    return origin.data ? origin.data : origin._embedded
                })
        })
        .catch(error => console.log(error))
}
```
</details>


**Local JSONs**  
Because we discovered during the build of the app that data was missing that was necessary to build the desired features, we wrote this ourselves based on information on several websites of the AUAS such as Brightspace and MijnHvA. Because we wrote this data ourselves, we did not have to manipulate this.

The JSONs we wrote ourselves contain data from:
* Course overview
* Study results and progress
* Urgent notices
* Information about all external websites of the HvA

<details><summary>Example: JSON Reader</summary>

```js
const fs = require('fs')

function readJSON(fileName) {
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }))
}
```
</details>

<hr>

## Webcomponents

**The structure of a basic Webcomponent**  
...

```js
const template = document.createElement('template')
template.innerHTML = `
<style>
    ...
</style>

<div>
    ...
</div>
`

class Name extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))
        }

customElements.define('DOM-name', Name)
```

**The Announcement Webcomponent**  
...


**Our research into Webcomponents**  
...

<hr>