Additional information about the progress can be found in the [wiki](https://github.com/WesselSmit/education-portal/wiki), the application can be found [here](https://hva-education-portal.herokuapp.com/)

# Table of Contents
* [Problem Definition](#Problem-Definition)
* [Debriefing](#Debriefing)
    * [Assignment (from the GGO)](#Assignment-from-the-GGO)
    * [Main Question](#Main-Question)
    * [Side Questions](#Side-Questions)
         * [How do you maintain an overview with large amounts of data?](#How-do-you-maintain-an-overview-with-large-amounts-of-data)
         * [What options can you give users to personalize the app?](#What-options-can-you-give-users-to-personalize-the-app)
         * [What is the best way to navigate through large amounts of data?](#What-is-the-best-way-to-navigate-through-large-amounts-of-data)
     * [HvA Style](#HvA-Style)
     * [Resources](#Resources)
     * [Deliverables](#Deliverables)
* [Solution](#Solution)
     * [Data](#Data)
        * [MongoDB](#MongoDB)
        * [Local JSONs](#Local-JSONs)
     * [Web components](#Web-components)
        * [The structure of a basic Web component](#The-structure-of-a-basic-Web-component)
        * [The Announcement Web component](#The-Announcement-Web-component)
        * [Our research into Web components](#Our-research-into-Web-components)
     * [Service Worker](#Service-Worker)
        * [Offline page and Caching](#Offline-page-and-Caching)
        * [Push notifications](#Push-notifications)
     * [Personal preferences](#Personal-preferences)
        * [Drag and Drop](#Drag-and-Drop)
        * [LocalStorage](#LocalStorage)
     * [Enhancements](#Enhancements)
        * [Announcements](#Announcements)
        * [Timetable](#Timetable)
        * [Course overview](#Course-overview)
        * [Searchbar](#Searchbar)
        * [Collapsable widgets](#Collapsable-widgets)
        * [Menu for mobile and tablet](#Menu-for-mobile-and-tablet)
     * [Responsiveness](#Responsiveness)
* [What we would like to add](#What-we-would-like-to-add)
* [Feedback we didn't implement](#Feedback-we-didnt-implement)
* [Feedback we implemented](#Feedback-we-implemented)

# Problem Definition

The HvA Portal is a hub for all resources and information related to it's studies. These resources and information are scattered across multiple platforms and websites. This causes problems because it isn't always clear to students what information can be found in what resource. Essentially; the HvA portal mostly functions as a hub for all HvA related information. It however fails in introducing students to all the services and resources available to them, this is mainly due to information being hidden behind other pages or not even being shown in the menu & not clarifying what information can be found behind what link.

# Debriefing

## Assignment (from the GGO)

The current HvA portal is very divided and it can be hard for students to know what reources are available and what information can be found on these websites. The goal of the redesign of the HvA portal is to deal with large amounts of data. Currently the solution is to redirect users from the portal to external resources. It's crucial we find a better way to show students what services and resources are available to them. The solution should have a intuitive navigation and be easily accessible.

The main goal of the redesign is not to redesign all small components and details of the portal but is more focussed towards the (data-)flow of the portal and the way users navgiate through the data.

Summarised: our task is to cope with the large amounts of data the HvA has and to present the information in a comprehensive way users can navigate through intuitively.

## Main Question

How do you present a large amount of information in a clear way that users can navigate through intuitively?

## Side Questions

These are the questions we ask ourselves and keep in mind whilst designing the new portal:

### How do you maintain an overview with large amounts of data?

We used a few principles to maintain an overview when dealing with the large amounts of data in our app;

To make sure users aren't overwhelmed with your content you have to spread it out over multiple pages, for every resource/user-goal we made a page. We chose to make a lot of pages and offer users clear navigation to find the pages, this combination is important because dividing your content can cause users to miss or not even be aware of it's existence within the app (this is actually the main problem in the current portal).

So we divide the content into smaller components/pages and we make sure users can find the pages, besides that we prioritize our data. The menu is divided into primary and secondary links. The primary links always have a subtext and show an icon, secondary links are smaller, don't show subtext and don't have icons. This is once again part of making sure users know of the content you're offering but also makes finding the most important content easier. 

>Our priorities are based on the provided research.

Lastly we provide users with personalisation options such as hiding, reordering and collapsing widgets/content. These features help users customize the app to their own needs, it can create a better flow and helps users in creating their own overview which may make more sense to them.

### What options can you give users to personalize the app?

As said in the previous question we allow users to customize the app. The customizations we implemented are:
* Hiding and showing (menu-items/widgets)
* Reordering (menu-items/widgets)
* Collapsing and expanding (widgets)
* Filtering (announcements)

By offering these features we give users control over the interface, but more importantly they help users in creating an clear overview, allowing users in organising content however it works best for them & hiding content they don't want to see.

All these personalisations are based on feedback we received in [user test sessions](https://github.com/WesselSmit/education-portal/wiki).

Other personalisations we could've offered but didn't:
* sorting
* customize what notifications you want to see
* change (push notification/app) permissions
* language
* list vs grid layout

### What is the best way to navigate through large amounts of data?

Creating a effective and intuitive navigation is hard, we believe the biggest problem we had to tackle was show users what content the portal and it's associated resources offer. To make sure users know of the resources we included all of them in our menu. This can bloat a menu and in total we have 18 menu items. That's a lot for a menu but according to our users we still manage to keep a clear overview.

How did we achieve a clear overview with 18 menu items? We prioritized, since most resources are only used sporadically and won't even be touched by a large portion of the userbase, we decided we'd make things a lot easier by seperating the most important menu items from the less important.

Once again we also allow users to hide/reorder the secondary (less important) menu items, this can also create additional space and overview for users.

If we had more time we also would've implemented the search feature, this would allow users to search for keywords if they can't find something. 

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
Because we would use personal data for our project, the client made small samples for us and provided JSONs. We had the idea to use MongoDB because we both have never worked with it before and we thought it would be interesting to do it once. During the development of our version of the HvA portal, we discovered that data was sometimes missing. We have written this [data ourselves in JSON files](https://github.com/WesselSmit/education-portal/wiki/The-data-we-missed-and-wrote-ourselves) and imported it locally in our app.

### MongoDB 
We used MongoDB for the data we received from the client. We have moved the data from the JSONs to MongoDB and set up code on the server that makes it possible to retrieve different `collections`. Since we both had no experience with this, it was quite a bit of work to figure this out. In the end we wrote a dynamic fetcher where we can pass the desired collection as a parameter. We then manipulate the data in separate functions in order to use the desired data in our app.

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
When we were building the app we discovered some data was missing that was necessary to build the desired features, we wrote this ourselves based on information on several websites of the HvA such as Brightspace and MijnHvA. Because we wrote this data ourselves, we did not have to manipulate it.

The JSONs we wrote ourselves contain data from:
* Course overview
* Study results and progress
* Urgent announcements/notifications
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
The template contains all static HTML and CSS of the element. You will only add the dynamic content later with functions in your custom element.

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
To make it possible to use the web component in the HTML you need to define it as a Custom Element first. To do this you create a class, which you define in the window `customElements` property. If you don't do this the browser won't recognize your custom element and it'll inherit the properties (behaviour + styling) of a `span`.

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
The second thing you want to do is to attach the shadow DOM to your web component and finally you clone your template into the shadowRoot.

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
To be able to use the web component in our HTML/DOM we need to register it in the `customElements` property of the window object. When you define your custom element you have to choose a name for it. All custom element names must contain a `-`, this indicates to the HTML parser that element is a custom element.

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

**The industry opinions about Web components**  
In this section I will show several statements that I have seen on different websites, with a number of arguments in favor and against.

1. "Websites should work without JavaScript wherever possible"  
Some developers think you shouldn't use components for an important element in the application like a navigation bar because it should always work, even without Javascript. But in our opinion it is quite possible to make a fallback on the server. So if Javascript is disabled or cannot be used, the server will still be able to render that element and the user will not even realize that it is or is not a web component.

2. "If you want to use Shadow DOM, you have to include your CSS in a `<style>` element inside of your JavaScript module"  
There are several options for styling web components without using a Shadow DOM. You can use the `standard context` or the` closed context`. By using the standard context it is possible to apply external CSS to your web component. <br>
We ourselves did not use the standard context but the closed context, Shadow DOM. We didn't like this because we first wrote the SCSS for the EJS template and then had to write it again in CSS for the web component. This meant we were basically writing the same logic twice (fallback and web component)

3. "Custom Elements aren't accessible"  
Currently, Custom Elements V1 are supported on any modern browser. So almost no polyfills are needed to support this. And if there is a browser that does not support the Custom Elements, we return to point 1 where you can always fall back on the server that renders the component.

<!--
Sources:
https://gist.github.com/WebReflection/71aed0c811e2e88e3cd3c647213f0e6c 
https://dev.to/richharris/why-i-don-t-use-web-components-2cia  
-->

**Our experience with Web components**  
The above points stood out for us because we also had to deal with this ourselves and we had to think about how we would solve those problems: 
1. Accessibility  
Using EJS we render the fallbacks for the web components on the server, when the user can use JavaScript, our app replaces the fallbacks with Web components. This way we have ensured that our app works well without JavaScript. However, the Web components do have the advantage that the user can interact with them, which makes sense since it requires JavaScript.

2. Styling the Web components  
To style the Web components we chose to use the closed context, this means that we add specific styling to the component using the Shadow DOM and don't use the stylesheet. However, we aren't big a fan of this because we have to convert the SCSS to CSS and then put this in the Javascript module, which is ugly and can be a pain in the arse whenever tryigin to change the srtyling a bit.

<hr>

## Service Worker

We know from experience that the portal is often used on the go, students need to travel to school and often use public transport. When travelling the connection can fail for a second. It's important our portal is still usable even when offline. To achieve offline support and faster load times we use Service Workers. We also want to be able to notify (push notification) a student for urgent announcements, this is also done with a Service Worker.

### Offline page and Caching

When using a service worker to cache pages you need to choose a caching strategy; we want to show the most recent pages which is only possible when fetching pages over a connection. We try to fetch the page over the network first, this ensures we always try to get the up to date page. If that fails (slow internet or no connection) we show a cached version of the page if available, if we don't have the page cached we show an offline page.

This makes sure we always have a page to show users even if they don't have a connection.

>Our caching strategy is: requesting over the network, if that fails we serve a cached page, if we don't have the page cached we serve an offline page.

**Installing SW**

When installing the SW we immediately cache the most important assets of our app. These are the assets we want to make sure we can always serve, these are the homepage, offline page, styling, scripts and some assets like fonts and important icons. They are the base of our application.

<details><summary>Example: Installing SW</summary>

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

When activating out SW we check if there are multiple caches, we always only want to keep our cache up to date, to achieve this we loop through all caches. Every cache that isn't up to date is deleted.

<details><summary>Example: Activating SW</summary>

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

Whenever the browser fetches something the SW intervenes, it first tries to GET the request over the network. If the request is succesfull we serve the requested resource and we put the resource in our cache. This way we build up a cache of all resources used by the app. If the user later comes back to the page with a bad connection the resources can be served from the cache.

If the network request fails we check our cache. Do we have a cached version of the requested resource, if so we serve the cached version. If we don't have the resource cached we serve the offline page.

<details><summary>Example: Fetching & Serving Cached</summary>

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

When an urgent announcement is delivered from the server we want to show users both in/outside the app. Using SW we can send push notifications to the user even when the browser is closed.

Notifying users in the app is done through interface pop-ups. The server sends a custom event using socket.io to the client, the client listens for the event and handles it by updating the interface. In the same event handler we can call the `displayNotification` function.

This function checks if the user has given permission for push notifications. This is important to check because users can change their settings whenever your website is not opened/active (meaning your application doesn't immediately register the change). If the user has blocked your app you can't send notifications, if the user has never anwsered the permission prompt it will automatically show.

With permission we create a notification; doing this you can customize a few options;
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
After several user tests, we decided to give the student the option to personalize the app. We made room for this on the account page so that all personal adjustments can be found in one place. The student can personalize:
* The widgets on the dashboard
* The secondary menu items, the external resources

To make this clear to the user it was important to come up with a good UI / UX. Here we discussed with Koop what hte best approach would be. Most importantly was the recognizability and the way to interact with the Drag and Drop.

### Drag and Drop
To create the drag and drop we used `Sortable.js` to achieve a responsive and easily customizable drag and drop. This way we were able to use a dynamic grid and still build a well-functioning drag and drop. After doing some research on Sortable.js we chose to use this because it also handled the events for mobile and reponsiveness works well.

**Sortable.js**  
Sortable is a Javascript library for reordering drag and drop lists. This way it's easier to drag and drop in multiple layouts and it's also compatible with the mobile Javascript events. With Sortable you get a lot of options to manipulate and change the interaction with your drag and drop list. 

Curious about the full documentation or about my implementation of Sortable.js?  

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

[Sortable.js - Documentation](https://github.com/SortableJS/Sortable)

Widgets  
<img width="800" src="https://user-images.githubusercontent.com/45365598/84769590-658fb380-afd6-11ea-9ad9-0751a3ffd1a9.gif">  

Secondary menu items  
<img width="800" src="https://user-images.githubusercontent.com/45365598/84769579-5f013c00-afd6-11ea-804d-58f41ed7354c.gif">

### LocalStorage
In order to save user settings, we've used LocalStorage. When the user goes to the account page, the LocalStorage is checked for any previously saved settings. If not, this object is created and saved in the LocalStorage. If this is the case, these settings are retrieved and displayed in the interface. Whenever the user modifies something, the LocalStorage is updated.

<details><summary>Example: Secondary menu items preferences - Code</summary>

```js
export default function setMenuPreferences() {
    container.classList.remove('disabled') // If Javascript is available the user can interact

    checker() ? renderPreferences() : setPreferences() // LocalStorage is allowed and are there there previously indicated preferences
    stateHandler() // Track whether the user wants to see the menu items or not
    dragHandler() // Track order and update
    cloneAndUpdateMenu() // Update the menu in the DOM
}

// Most important function to update LocalStorage and menu in the DOM
function setPreferences() {
    const labels = [...container.querySelectorAll('label')]
    let preferences = []

    labels.forEach(label => {
        const text = label.textContent
        const state = label.querySelector('input').checked
        state ? label.className = 'on' : label.className = 'off'

        const object = { name: text, state: state }
        preferences.push(object)
    })

    setLocalStorage('menu-preferences', preferences)
    cloneAndUpdateMenu()
}
```
</details>

<hr>

## Enhancements
We have implemented enhancements to make our application as accessible as possible for all users and to make users who use a more modern browser happier. So we did this with: web components and rendered pages from the server as fallbacks.

If for some reason the user can't use Javascript in the portal, the web components can't be rendered and the user is shown the fallback widgets. However, the user cannot interact with these fallbacks, actions such as: filtering messages or viewing the schedule for the coming week are only available in web components.

Below is a list of our enhancements and how they have been applied in our website.

### Announcements
**Filter**  

Students indicated the biggest problem with the announcements in the current portal is lack of overview, to create a better overview with more distinction between different types of announcements, we decided to create categories. The categories are: HvA, Medezeggenschap, Faculteit & Opleiding. Categories are indicated with colors, each color has it's own designated color.

Categories with associated colors are displayed in a legend which also funtions as filter. If users click on a legend item the announcement-list is filtered. All active filters are saved in localStorage meaning the user actions persist across page refreshes etc.

<img width="800" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45405413/84768719-fc5b7080-afd4-11ea-9d70-e4d3d5130e7e.gif">

**Read History and Unread Messages Indicator**  
During the user test it became clear that students wanted clarity about which announcements have or haven't been read. To show this, the students themselves indicated that they liked the pattern of email, in which the unread messages are bolder than the unread messages. We have also applied this in our website.

In the LocalStorage, an object is stored of read messages. When the user has read an announcement, it's added to the object. The menu shows an indicator of the number of unread messages. This way, the user can keep track of whether he has read all messages and whether new messages have been added. 

<img width="800" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45365598/84777532-fe77fc00-afe1-11ea-9d11-53719cf801aa.gif">

### Timetable
Because students shouldn't only be able to view today's schedule, but also the schedule for the rest of the week, we have enhanced this component. In this way the student can navigate between the days with the arrows. When Javascript isn't available the server will render the schedule of today.

<img width="500" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45365598/84381343-30a3eb00-abe9-11ea-8c03-1dcaeeda5618.gif">

### Course overview
To make it possible for the student to see which courses he/she has had in the past this quarter or past quarters, it is also necessary to enhance this component. To keep the interactions recognizable, we have also added the arrows here to navigate to a previous or next quarter. When Javascript isn't available the server will render the courses of your current quarter.

<img width="500" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45365598/84381339-2c77cd80-abe9-11ea-858e-aac51e1b5460.gif">

### Searchbar
When users press the `/` key on their keyboard (and the focussed element isn't an input) the focus will automatically be given to the searchbar. This shortcut is for users who use shortcuts to navigate websites. It's a small enhancement but can be a source of frustration for users who are used to it and more and more websites are starting to implement it.

The search icon is also enhanced, whenever it's clicked the clientSide JS evaluates what should happen:
* if the search-input is empty the searchbar gets focus
* if the search-input is not empty the search-query is send to the server

There is also a custom made reset icon in the search bar whenever it has focus and isn't empty. When clicked it removes the search-input from the searchbar.

### Collapsable widgets
Our widgets can take up a lot of space on smaller screens. Although we allow users the options to reorder + hide widgets on their dashboard there will always be users who prefer to have all widgets on their dashboard but don't want the widgets to take up too much space. For these users we have the collapse feature; widgets can be collapsed if you click on their title. This means the widgets are still easily accessible but can make scrolling and prioritizing for mobile users much easier.

<img width="800" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45405413/84770106-46ddec80-afd7-11ea-9cad-757fd6532eb3.gif">

### Menu for mobile and tablet
Since we use a hamburger menu on the mobile and tablet versions of our app which requires JavaScript to access the menu, we have had to write a fallback for when Javascript isn't available.

* The student has **no** access to Javascript  
The user clicks on the hamburger menu which contains a `<a>` to link to the menu at the bottom of the DOM. In this way the student can simply navigate through the app without Javascript.

* The student **does** have access to Javascript  
The `<a>`'s element normal behaviour is prevented in Javascript so that it no longer goes anywhere in the HTML but simply opens the menu using Javascript.

<img width="250" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45365598/84778147-d937bd80-afe2-11ea-9ff6-77edd46fa29e.gif">

<hr>

## Responsiveness
We expect that this app will also be used on the phone, for example when students come from public transport and quickly want to find the classroom where they have their first lesson of the day. We use a two-column layout on desktop that changes to a single-column layout when the screen is smaller.

<img width="800" alt="Schermafbeelding 2020-05-11 om 20 16 00" src="https://user-images.githubusercontent.com/45365598/84777522-fb7d0b80-afe1-11ea-8062-67925c0b0fd5.gif">

# What we would like to add

* Announcement detail pages contain ASCII characters which should be removed
* Search bar has no express route and thus results in a `cannot GET /search`
* The extra information pages for the resources don't have any content
* All mentions of: teachers, courses and grades should link to the individual pages
* Urgent-announcments should also be shown in the announcements widget
* Make the process of replacing the EJS with web-component widgets more efficient

>See our [github project](https://github.com/WesselSmit/education-portal/projects/1) `if we had more time` column for all items we dropped because of deadlines

<hr>

# Feedback we didn't implement
During the user tests, code- and designreviews we received a lot of feedback. In the end, not all feedback was implemented in our application:
* Using Nuxt to handle the routing  
Ultimately, we didn't do this because after doing some research, we chose to continue doing our routing with Express, but to invest more time in clear modules. We also thought Nuxt and Vue would be a bit much considering the size of our app and how static most pages are. We simply felt we wouldn't need most features of Vue.
* Using Vue to render components on the dashboard  
In the end we didn't do this because Wessel had researched Javascript Vanilla Web Components for his Weekly Nerd. We preferred to work on this so that it would remain a Vanilla Javascript project and we would like to dive into this. We also thought Vue to be overkill for this project, although a good practice and skill to be exercising but overkill for our mostly static app.

<hr>

# Feedback we implemented
This feedback comes from: students, teachers and stakeholders.

* Personalize the dashboard
* Categorizing announcements
* Legend for announcements in the dashboard
* Indicating the number of unread announcements
* Indicate which announcements have been read or not
* Possibility to go to the explanation page or to the external website
* Using Web components
* Use EJS as fallback for the Web components
* Use Socket.io to display urgent announcements
* Implementing a Service Worker
* Send users to an offline page when they have no internet
* Send a push notification for urgent announcements.
