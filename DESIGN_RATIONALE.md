# Problem Definition

The HvA Portal is a hub for all resources and information related to it's studies. These resources and information are scattered across multiple platforms and websites. This causes problems because it isn't always clear to students what information can be found on which resource. Essentially; the HvA portal mostly functions as a hub for all HvA related information. It however fails in introducing students to all the services and resources available to them, this is mainly due to information being hidden behind other pages or not even being shown in the menu & not clarifying what information can be found behind what link.

# Debriefing

## Assignment (from the GGO)

The current HvA portal is very divided and it can be hard for students to know what reources are available and what information can be found on these websites. The goal of the redesign of the HvA portal is to deal with large amounts of data. Currently the solution is to redirect users from the portal to external resources. It's crucial we find a better way to show students what services and resources are available to them. The solution should have a intuitive navigation and be easily accessible.

The main goal of the redesign is not to redesign all small components and details of the portal but is more focussed towards the (data-)flow of the portal and the way users navgiate through the data.

Summarised: our task is to cope with the large amounts of data the HvA has and to present the information in a comprehensive way users can navigate through intuitively.

## Main Question

How do you present a large amount of information in a clear way that users can navigate through intuitively?

## Side Questions

These are the questions we ask ourselves and keep in mind whilst designing the new portal:

* How do you maintain an overview with alrge amounts of data?
* What options can you give users to personalize the app?
* What is the best way to navigate through large amounts of data?
* How do you maintain an intuitive navigation?

## HvA Style

The redesign should follow the HvA style as described in the provided styleguide.

## Resources

A list of the resources we plan to use:

* Github (to publish code + documentation)
* Heroku (to deploy app)
* mijnhva + it's external resources (to find content and inspire design)

## Deliverables

* Design Rational (debriefing, explanation about the problem and the code)
* A working prototype with real data
    * prototype is responsive
    * prototype is accessible

# Solution

## Data
Because we would use personal data for our project, the client made small samples for us and supplied them in JSON. We had the idea to use MongoDB because we both have never worked with it before and we thought it would be interesting to do it once. During the development of our version of the HvA portal, we discovered that data was sometimes missing. We have written this data ourselves in JSON files and loaded it locally in our app.

### MongoDB 
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

<hr>

### Local JSONs 
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

## Web components

### The structure of a basic Web component
Creating a web component consists of a number of steps.


<!-- 1 -->
1. Creating a template  
The template contains all static HTML and CSS of this element. You will only add the dynamic content later by means of functions in your custom element.

<details><summary>Example: Template</summary>

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
```
</details>


<!-- 2 -->
2. Defining the template as a Custom Element  
To make it possible to use the web component in the HTML you need to define this as a Custom Element first. To do this you create a class, which you define as window's customElements property.

<details><summary>Example: Defining a Custom Element</summary>

```js
class Name extends HTMLElement {
    constructor() {
        super()
    }
}

customElements.define('DOM-name', Name)
```
</details>


<!-- 3 -->
3. Initializing the Web component  
Inside of the constructor() you will have to do a few things. First of all you want to call super() to inherit all properties the class your extending.
The second thing you want to do is to attach the shadow DOM to your web component and finally you want to clone your template into the shadowRoot.

<details><summary>Example: Initializing the Web Component</summary>

```js
constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
}
```
</details>

<br>

<!-- 4 -->
When you've completed all those steps your component is ready to receive data and dynamically update/render the component.
<details><summary>Example: Full setup of a Web component</summary>

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
}

customElements.define('DOM-name', Name)
```
</details>

<hr>

### The Announcement Web component 
...

<hr>

### Our research into Web components

**The online opinions about Web components**  
In this section I will show several statements that I have seen on different websites, with a number of arguments for and against.

1. "Websites should work without JavaScript wherever possible"  
Some developers think you shouldn't use components for an important element in the application like a navigation bar because it should always work, even without Javascript. But in our opinion it is quite possible to make a fallback on the server. So if Javascript is disabled or cannot be used, the server will still be able to render that element and the user will not even realize that it is or is not a web component.

2. "If you want to use Shadow DOM, you have to include your CSS in a `<style>` element inside of your JavaScript module"  
There are several options for styling web components without using a Shadow DOM. You can use the `standard context` or the` closed context`. By using the standard context it is possible to apply external CSS to your web component. <br>
We ourselves did not use the standard context but the closed context, Shadow DOM. We didn't like this because we first wrote the SCSS for the EJS template and then had to write it to CSS for the web component.

3. "Custom Elements aren't accessible"  
Currently, Custom Elements V1 are supported on any modern browser. So almost no polyfills are needed to support this. And if there is a browser that does not support the Custom Elements, we return to point 1 where you can always fall back on the server that renders the component.

<!--
Sources:
https://gist.github.com/WebReflection/71aed0c811e2e88e3cd3c647213f0e6c 
https://dev.to/richharris/why-i-don-t-use-web-components-2cia  
-->

**Our experience with Web components**  
The above points stood out for us because we also had to deal with this ourselves and we had to think about how we would solve this. Our experience with:
1. Accessibility  
For our app we used the server that the components render, however this is the fallback. When the user allows and can use JavaScript, our app uses Web components. This way we have ensured that our app works well without JavaScript. However, the Web components do have the advantage that the user can interact with them, which makes sense since it requires JavaScript.

2. Styling the Web components  
To style the Web components we have chosen to use the closed context, this means that we add specific styling to the component using the Shadow DOM and don't use the stylesheet. However, we aren't big a fan of this because we have to convert the SCSS to CSS and then put this in the Javascript module, which is actually not the intention.

<hr>

## Service Worker

### Offline page and Caching
...

### Push notifications
...

<hr>

## Personal preferences
### Drag and Drop  
...

### LocalStorage 
...

<hr>

## Enhancements

### Announcements
**Filter**  
...

**Read history**  
...

**Unread messages indicator**  
...

### Timetable
...

### Course overview
...

### Searchbar
...

<hr>

# What we would like to add
...

<hr>

# Which we didn't add in the end
...