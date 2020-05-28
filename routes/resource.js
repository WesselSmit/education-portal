const express = require('express')
const router = express.Router()

const getResourceInformation = require('#data/local/getData')

module.exports = router
    .get('/brightspace', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('Brightspace'), pageName: 'brightspace' }))
    .get('/sis', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('SIS'), pageName: 'sis' }))
    .get('/mail', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('Mail'), pageName: 'mail' }))
    .get('/events', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('Events'), pageName: 'events' }))
    .get('/teamsites', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('Teamsites'), pageName: 'teamsites' }))
    .get('/az_list', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('A-Z'), pageName: 'a-z' }))
    .get('/staff', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('Staff'), pageName: 'staff' }))
    .get('/locations', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('Locations'), pageName: 'locations' }))
    .get('/studies', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('Studies'), pageName: 'studies' }))
    .get('/hva_organisation', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('HvA_organisation'), pageName: 'organisation' }))
    .get('/help', (req, res) => res.render('layouts/resource', { resource: getResourceInformation('Help'), pageName: 'help' }))