const express = require('express');
const router = new express.Router();
const serviceProfile = require(appRootDirectory + '/app/data/serviceProfile.json');
const syndication = require(appRootDirectory + '/app/syndication/check');
const tokenChallenge = require(appRootDirectory + '/app/security/token');
/***
GET Routes
***/
router.get('/', (req, res) => {
    res.json(serviceProfile);
});

/***
POST Routes
***/
router.post('/check-syndication/:token', tokenChallenge.challenge, syndication.check);

module.exports = router;
