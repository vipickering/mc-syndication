const express = require('express');
require('dotenv').config();
const favicon = require('serve-favicon');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');

appRootDirectory = path.join(__dirname, '/..');
const config = require(appRootDirectory + '/app/config.js');
const logger = require(appRootDirectory + '/app/logging/bunyan');
const syndication = require(appRootDirectory + '/app/syndication/check');
const routes = require(appRootDirectory + '/app/routes.js');

const api = config.api;
const syndicate = config.syndicate;
const port = api.port;
const app = express();

app.use(helmet());
app.use(favicon('public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use('/', routes);

// Setup interval timer
const intervalMins = syndicate.interval;
const interval = intervalMins * 60 * 1000;

// Let's log how often we are checking for syndication content
logger.info(`Checking for syndication content every ${intervalMins} minutes`);

// The interval function runs every X mins to check the JSON feed for new content to syndicate.
setInterval(function intervalTimer() {
    logger.info('Checking feed for new Syndication items');
    syndication.check();
}, interval);

const server = app.listen(process.env.PORT || port, function serveTheThings() {
    logger.info('MC Syndication Online Port:%s...', server.address().port);
});
