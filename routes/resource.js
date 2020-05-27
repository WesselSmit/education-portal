const express = require('express')
const router = express.Router()

const getResourceInformation = require('#data/local/getData')

module.exports = router
    .get('/brightspace', (req, res) => res.render('layouts/resource', getResourceInformation('Brightspace')))
    .get('/sis', (req, res) => res.render('layouts/resource', getResourceInformation('SIS')))
    .get('/mail', (req, res) => res.render('layouts/resource', getResourceInformation('Mail')))
    .get('/events', (req, res) => res.render('layouts/resource', getResourceInformation('Events')))
    .get('/teamsites', (req, res) => res.render('layouts/resource', getResourceInformation('Teamsites')))
    .get('/az_list', (req, res) => res.render('layouts/resource', getResourceInformation('A-Z')))
    .get('/staff', (req, res) => res.render('layouts/resource', getResourceInformation('Staff')))
    .get('/locations', (req, res) => res.render('layouts/resource', getResourceInformation('Locations')))
    .get('/studies', (req, res) => res.render('layouts/resource', getResourceInformation('Studies')))
    .get('/hva_organisation', (req, res) => res.render('layouts/resource', getResourceInformation('HvA_organisation')))
    .get('/help', (req, res) => res.render('layouts/resource', getResourceInformation('Help')))