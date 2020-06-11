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
To make it possible to use the web component in the HTML you need to define this as a Custom Element first. To do this you create a class, which you define as window's customElements property. If you don't do this the browser won't recognize your custom element and it'll inherit the properties (behaviour + styling) of a `span`.

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

![image](https://user-images.githubusercontent.com/45405413/84373633-24199580-abdd-11ea-8368-ac92a9379410.png)

Before we create our web component we already have the 'component' working, we always first make the HTML, CSS & JS for a widget. This is what gets rendered initially on a page visit. With JS we replace the widget with our web component. This way we can enhance the widget with JS, the component has extra features but if JS doesn't work we always have the fallback of our static EJS template widget.

1. Creating the template (markup + styles)
In the template we define all styles and the base markup, all container elements are in the template. However some markup will be generated dynamically; all the rows and legend items are dynamically generated. 

<details><summary>Example: Template</summary>

<p>NOTE: this is not the complete styling but only a small part</p>

```js
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
    ...
</style>
<div id="announcements"></div>
<h2>Mededelingen</h2>
<div class="announcements-container">
	<div id="announcement-legend"></div>
</div>
<a class="allAnnouncements" href="/announcements/" target="_self">Alle mededelingen
	<img src="/media/icons/arrow-right.svg" alt="arrow-right"></img>
</a>`
```
</details>

2. Defining the Custom Element
A custom element is a JS class that extends the HTMLElement property, you must extend a HTMLElement class to inherit the methods which allow you to manipulate it in JS (such as: innerHTML, classList etc.).
To be able to use the web component in our HTML/DOM we need to register it in the `customElements` list. When you define your custom element you have to choose a name for it. All custom element names must contain a `-`, this indicates to the browser the element is a custom element.

<details><summary>Example: Defining Custom Element</summary>

```js
 class announcementList extends HTMLElement {
        constructor() {
            super()

        }

    window.customElements.define('announcements-widget', announcementList)
```

</details>

My custom element is defined as the `announcements-widget` element, after defining the element you can append it to the DOM. Appending your custom element will execute the associated class. The class contains a `constructor()` method, this method only gets executed once when the class is initialized. 

3. Initializing the web component
Whenever the class is executed the constructor is called first, in the constructor you must call `super()` to inherit the methods/properties of the class you're extending. The constructor is only executed once making it the perfect place to fetch data, dynamically create content and add eventListeners.

<details><summary>Example: Initializing the web component</summary>

```js
constructor() {
    super() //Inherit all HTMLElement properties of extended class

    this.attachShadow({ mode: 'open' }) //Attach shadowDOM to custom element
    this.shadowRoot.appendChild(template.content.cloneNode(true)) //Insert template content in custome element

    this.getData() //Fetch data
        .then(json => {
            const [announcements, categories] = json

            //invoke methods
            this.createLegenda(categories)
            announcements.splice(5, announcements.length)
            this.appendAnnouncements(announcements)
        })

    //Store elements in variables
    this.announcementContainer = this.shadowRoot.querySelector('.announcements-container')
    this.announcementLegend = this.shadowRoot.querySelector('#announcement-legend')
}
```

</details>


In the announcements web component I first attach a shadowDOM and insert the template content in the custom element. The second task is to fetch the data, it's best practice with web components to do this in the constructor, this way you can store the fetched data as a property in the class, this prevents fetching the same data multiple times!

Lastly I store some references to elements, these are used later in the methods and will make the code more easily readable.

4. Dynamically creating content
In the constructor we invoke methods, methods are basically functions nested in the class. The first method creates the legend for the categories in the data, the second method creates announcement cards which link to detail pages. Constructors are nested on the same level as the `constructor()`, the `constructor()` is actually a good default method which is necessary for the class to exist.

<details><summary>Example: Dynamically Creating Content</summary>

**Legend**

```js
createLegenda(categories) {
    categories.forEach(cat => {
        //For each category a <p> is created, the category is inserted as textContent and class; CSS manages the color coding (based on class)
        this.announcementLegend.insertAdjacentHTML('beforeend', `<p class="${cat}">${cat}</p>`)
    })
}
```

**Announcements**

```js
//This monstrosity creates the announcement card, it's stored in a <a> to link to a detail page
appendAnnouncements(announcements) {
    announcements.forEach(announcement => {
        this.announcementContainer.insertAdjacentHTML('beforeend', `
        <a href="/announcements/${announcement.newsItemId}" target="_self" uid="${announcement.newsItemId}">
            <div class="announcement ${announcement.tags[0]}" id="${announcement.newsItemId}">
                <p>${announcement.title}</p>
                <p>${announcement.publishDate} - ${announcement.tags[0]}</p>
            </div>
        </a>`)
    })
}
```

</details>

5. Now that we have the content ready we still need to make sure the web component interactions work. The web component at the moment has one enhancement/interaction; it keeps track of the announcements you've read (in localStorage). Whenever the user has visited a detail page the `uid` of the announcement is stored in localStorage. In the component it reflects if a announcement is read by the user or not.

![image](https://user-images.githubusercontent.com/45405413/84373633-24199580-abdd-11ea-8368-ac92a9379410.png)

>read announcements have a lighter font-style than unread announcements

To know when someone visits a page we need to watch for the click event on the announcement cards, we can do this by adding a addEventListener to the announcement cards. This is done in the `appendAnnouncements` method where the cards are created. Whenever the user clicks a announcement the `store` method is invoked. 

<details><summary>Example: Keeping track of Read History</summary>

**Handle click event** | Whenever the user clicks a announcement (and thus visits the page) we want to store the `uid` property of the announcement.

```js
appendAnnouncements(announcements) {
    const link = this.announcementContainer.querySelector('a')
    link.addEventListener('click', () => this.store(link))
}
```

**Store method** | stores the passed announcement in the localStorage readHistory property.

```js
store(announcement) {
    this.readHistory.push(announcement.getAttribute('uid'))
    utils.setLocalStorage('read-history', this.readHistory)
}
```

</details>

When the component is initialized the localStorage readHistory is evaluated and all read announcements get a class which give the title a heavier font style.

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

We know from experience that the portal is often used on the go, students need to travel to school and often use public transport. When travelling the connection can fail for a second. It's important our portal is still usable even when offline. To achieve offline support and faster load times we Service Workers. We also want to be able to notify a student for urgent announcements, this is also done with a Service Worker.

### Offline page and Caching

When using a service worker to cache pages you need to choose a caching strategy; we want to show the most recent pages which is only possible when fetching pages over a connection. We try to fetch the page over the network first, this ensures we always try to get the up to date page. If that fails (slow internet of no connection) we show a cached version of the page, if we don't have that we show an offline page.

This makes sure we always have a page to show users even if they don't have a connection.

>Out caching strategy is: try requesting over the network, if that fails we serve a cached page, if we don't have the page cached we serve an offline page.

**Installing SW**

When installing the SW we immediately cache the most important assets of our app. These are the assets we want to make sure we can always serve, these are the homepage, offline page, styling, scripts and some assets like fonts and important icons. They are the base of our application.

<details></summary>Example: Installing SW</summary>

```js
const cacheAssets = [
    '/',
    '/offline',
    '/css/master.css',
    '/js/index.js',
    '/media/fonts/OpenSans-Bold.woff',
    '/media/fonts/OpenSans-Regular.woff',
    '/media/icons/favicon.png'
]

self.addEventListener('install', e => {
    e.waitUntil(caches.open(cacheName)
        .then(cache => cache.addAll(cacheAssets))
        .then(() => self.skipWaiting())
    )
})
```

</details>

**Activating SW**

When activating out SW we check if there are multiple caches, we always only want to keep our up to date cache, to achieve this we loop through all caches. Every cache that isn't the most recent cache we delete.

<details></summary>Example: Activating SW</summary>

```js
self.addEventListener('activate', e => {
    e.waitUntil(
        clients.claim() //Sync serviceWorkers across all active clients
        .then(() => caches.keys() //Remove outdated caches
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        //If there are multiple caches; remove all outdated caches
                        if (cache !== cacheName) {
                            return caches.delete(cache)
                        }
                    })
                )
            })
        ))
})
```

</details>

**Fetching and serving with SW**

Whenever the browser fetches something the SW intervenes, it first tries to GET the request over the network. If the request is succesfull we serve the requested resource and we put the resource in our cache. This way we build up a cache of all resources used by the app. If the user later comes back to the page witha  bad connection the resources can be served from the cache.

If the network request fails we check our cache. Do we have a cached version of the requested resource, ff so serve the cached version. If we don't have the resource cached we serve the offline page.

<details></summary>Example: Fetching & Serving Cached</summary>

```js
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
        //If a network connection is available => use fetched data
        .then(res => { //Network succesful
            const resClone = res.clone() //Clone the response
            caches.open(cacheName)
                .then(cache => {
                    if (isHtmlGetRequest(e.request)) {
                        cache.put(e.request, resClone)
                    }
                })
            return res
        })
        //Network failed 
        .catch(err => {
            //Check if request is in cache
            return caches.match(e.request).then(res => {
                if (res === undefined) { //If not in cache => serve '/offline'
                    return caches.match('/offline').then(response => response)
                } else { //Otherwise serve cached page
                    return caches.match(e.request).then(response => response)
                }
            })
        })
    )
})
```

</details>

Using a SW we can make sure the user has the best experience possible with a bad/no connection.

### Push notifications

When an urgent announcement is delivered from the server we want to show users this in app and outside of the app. Using SW we can send push notifications to the user even when the browser is closed.

Notifying users in app is done through interface pop-ups. The server sends a custom event using socket.io to the client, the client listens for the event and handles it by updating the interface. In the same event handler we can call out `displayNotification` function.

This function first checks if the user has given permission for push notifications. This is important to check because users can change their settings whenever your website is not open (meaning your application doesn't immediately register the change). If the user has blocked you app you can't send notifications, if the user has never anwsered the permission prompt it will automatically pop-up.

If allowed we create a notification; doing this you can customize a few options;
* the server sends a title and payload, we use these as the title and message for the notification
* we can give a custom vibrate pattern
* we can set custom icons to show in the notification
* we can create a payload storing custom data 
* we can set custom actions, these are shown in the notification under a drop-down list. The custom actions can be handled on the clientside JS but the support for this isn't great (even with modern browsers)

<details><summary>Example: Sending Push Notifications</summary>

```js
function displayNotification(title, body) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            const options = {
                body,
                icon: './media/icons/hva-logo-purple.svg',
                vibrate: [100, 50, 100],
                data: {
                    timestamp: Date.now()
                },
                actions: [{
                        action: 'goto',
                        title: 'Go to HvA Portal',
                        icon: './media/icons/hva-logo-purple.svg'
                    },
                    {
                        action: 'close',
                        title: 'Close notification',
                        icon: './media/icons/hva-logo-purple.svg'
                    },
                ]
            }
            reg.showNotification(title, options)
        })
    }
}
```

</details>


<hr>

## Personal preferences
As soon as our dashboard was finished, the next user test showed that the user wanted to be able to personalize the dashboard. We did this by creating a section on the account page with the four widgets that the user can toggle on and off and drag to change the order in this way. Together with Koop we discussed how we can tackle this UI and UX best to make it clear that these blocks are interactable.

### Drag and Drop  
For the drag and drop, Sjors first made this in Vanilla Javascript. However, the interaction was not very nice and it was difficult to switch from a two-column grid to a one-column grid. Then he researched other possibilities to achieve the same. After doing some research on `Sortable.js` he started working on this.

<img alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45365598/84365503-d9dee700-abd1-11ea-8830-7b889528e4e4.gif">

**Sortable.js**  
Sortable is a Javascript library for reordering drag and drop lists. This way it is way easier to drag and drop in multiple layouts and it is also compatible with the mobile Javascript events. With Sortable you get a lot of options to manipulate and change the interaction with your drag and drop list. 
Curious about the full documentation or about my implementation of Sortable.js? View that code or read the [full documentations](https://github.com/SortableJS/Sortable)

<details><summary>Sortable.js - Code</summary>

```js
function dragHandler() {
    const preferencesContainer = document.querySelector('#preferences')

    new Sortable(preferencesContainer, {
        draggable: ".on",
        animation: 150,
        onStart: (event) => addStylingToDropZones(event),
        onEnd: (event) => {
            removeStylingFromDropZones(event)
            setPreferencesObject()
        }
    })
}

function addStylingToDropZones(event) {
    const dragLocations = [...event.target.querySelectorAll('label:not(.sortable-chosen)')]
    dragLocations.forEach(location => location.classList.add('optional-location'))
}

function removeStylingFromDropZones(event) {
    const dragLocations = [...event.target.querySelectorAll('label:not(.sortable-chosen)')]
    dragLocations.forEach(location => location.classList.remove('optional-location'))
}
```
</details>


### LocalStorage 
In order to allow the usersettings to be saved, Sjors used LocalStorage. As soon as the user comes to the page, the LocalStorage checks whether the usersettings have already been set. If not, an object is created in the LocalStorage. If this is the case, the blocks are placed in the correct order and at the correct state. The LocalStorage object is modified every time the user changes the order or state.

The main function is to update/set the preferences object. This keeps the LocalStorage up to date and allows the user to personalize his dashboard. You can view this function below.

<details><summary>setPreferencesObject() - Code</summary>

```js
function setPreferencesObject() {
    const inputs = [...document.querySelectorAll('#account form label')]
    let preferences = []

    inputs.forEach(label => {
        // Data
        const id = label.id
        const text = label.textContent
        const state = label.querySelector('input').checked

        // Set LocalStorage
        const object = { id: id, name: text, state: state }
        preferences.push(object)
        setLocalStorage('preferences', preferences)
    })

    return preferences
}
```
</details>



<hr>

## Enhancements
We have implemented enhancements to make our application as accessible as possible for all users and to make users who use a more modern browser happier. So we did this by using: web components and rendered pages from the server.

If for some reason the user can't use Javascript on our website, the web components which contain the most important information of the website can't be rendered and the user can't use the website properly. This covers the server that still loads static components. However, the user cannot interact with these static components, such as: filtering messages or viewing the schedule for the coming week.

Below is a list of our enhancements and how they have been applied in our website.

### Announcements
**Filter**  
...

**Read History and Unread Messages Indicator**  
During the user test it became clear that students wanted clarity about which announcements have or haven't been read. To make this clear, the students themselves indicated that they liked the pattern of email, in which the unread messages are bolder than the unread messages. We have also applied this in our website.

In the LocalStorage, an object is kept of read messages. When the user has read an announcement, it is added to the object. The menu shows an indicator of the amount of unread messages. In this way, the user can keep track of whether he has read all messages and whether new messages have been added. This indicator is also determined by the object in the LocalStorage.

### Timetable
Because students should be able to view not only today's schedule, but also the schedule for the rest of the week, we have enhanced this component. In this way the student can navigate between the days with the arrows. When the student doesn't have Javascript available the server will render the schedule of today.

<img width="500" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45365598/84381343-30a3eb00-abe9-11ea-8c03-1dcaeeda5618.gif">

### Course overview
To make it possible for the student to see which courses he/she has had this block or past blocks, it is also necessary to enhance this component. To keep the interactions recognizable, we have also added the arrows here to navigate to a previous or next block. When the student doesn't have Javascript available the server will render the courses of your current block.

<img width="500" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45365598/84381339-2c77cd80-abe9-11ea-858e-aac51e1b5460.gif">

### Searchbar
...

<hr>

# What we would like to add
...

<hr>

# Which we didn't add in the end
...