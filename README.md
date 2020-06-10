The application can be found [here](https://hva-education-portal.herokuapp.com/)

More information can be found in the [design rationale](https://github.com/WesselSmit/education-portal/blob/master/DESIGN_RATIONALE.md)

# Table of contents
* [App](https://hva-education-portal.herokuapp.com/)
* [Design Rationale](https://github.com/WesselSmit/education-portal/blob/master/DESIGN_RATIONALE.md)
* [Concept](#concept)
* [Install Notes](#install-notes)
* [Features](#features)
* [Data](#data)
* [Credits](#credits)

![image](https://user-images.githubusercontent.com/45405413/84251309-78554480-ab0d-11ea-81f9-2ddb7b5047bd.png)

# Concept

The HvA student portal is supposed to be a central point for all study related infomation, at the momment this information is scattered across many websites and platforms. The current portal functions as a hub, but fails to offer students a complete overview of all available services.

With our redesign we try to achieve 2 things:
* clearly communicate the available resources
* bring (most important) data forward

The homepage includes a dashboard where the most important data is displayed, this way the most important data is immediately visible, for details users can navigate to the external resource. There is also a menu with all in-/external resources listed, this is to show students what services are available.

Since external resources all look and function different we offer detail pages for students to read up on some important information such as:
* which information you can find on the external website
* how you can navigate the external website
* why it's on a external website 
* where you can go for extra help
* a link to the external website

# Install Notes

To install this application follow these steps in the CLI:

1. Clone this repository

```shell
git clone https://github.com/WesselSmit/education-portal.git
```

2. Navigate to the local folder root

```shell
cd education-portal
```

3. Install all dependencies

```shell
npm install
```

4. Run the application

```shell
npm start
```

# Features

## Menu

To show users what resources are available we have a menu, it's categorized in multiple sections based on priority. Additional information is shown when users hover over the menu items. 

## Dashboard

Provided research shows students have a core set of functionalities which are most used, theses pages/resources are the biggest reason students visit the portal. These resources are however external websites at the moment, so in reality students visit the portal to be redirected to the external resource. In our redesign the homepage contains a dashboard with 4 widgets. These widgets are the most used external resources, by showing the most recent data from these external resources we cut down the need to visit the external websites significantly.

### Preferences

The widgets are based on the provided research and our own user tests, however we understand not all students have the same needs and wishes. To accomodate students we allow for personalization of the dashboard. On the menu 'ACCOUNT' page of the portal students can reorder and hide widgets (they can also undo their previous actions). 

### Enhancements 

The application wil be used a lot on the go by students travelling to/from the university, since JS might not load due to tunnels or bad connection etc. we use enhacements. If the JS can't be loaded the app still works, however some extended functionalities and enhancements won't be available without JS. To see a full list of all our enhancements see our [design rationale](https://github.com/WesselSmit/education-portal/blob/master/DESIGN_RATIONALE.md#enhancements)

# Data

Because the HvA portal has a lot of data and is very personal, the client GGO provided us with fake-data in JSON format, we stored the provided data in an mongoDB database and fetch it when needed in the app.

There also was some data we wanted to use but the client didn't provide for us (such as 'urgent-announcements', 'external resource explanations' etc.), we created our own JSON files to use in the application.

All data used is either: JSON (provided, created) or data created by the user (preferences stored in localStorage)

We don't use any API's.

>You can read more about our data in our [design rationale](https://github.com/WesselSmit/education-portal/blob/master/DESIGN_RATIONALE.md#data)

# Credits

### [Sjors Eveleens](https://github.com/choerd) 

For being my partner in crime, this application was designed, built and deployed by [Sjors Eveleens](https://github.com/choerd) and [Wessel Smit](https://github.com/WesselSmit).

### Goed Georganiseerd Onderwijs (GGO)

Client, provided us with: an assignment, data, user test & a nice cooperation all around.

[MIT](https://github.com/WesselSmit/education-portal/blob/master/LICENSE) © [Sjors Eveleens](https://github.com/choerd) and [Wessel Smit](https://github.com/WesselSmit)
