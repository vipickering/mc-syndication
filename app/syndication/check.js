/*
Perform a GET:
- On the last sent date file in the GithubAPI
- To get the feed of syndication items

Then pass those items to the Parse Feed funcntion
*/

const logger = require(appRootDirectory + '/app/logging/bunyan');
const slack = require(appRootDirectory + '/app/slack/post-message-slack');
const axios = require('axios');
const config = require(appRootDirectory + '/app/config.js');
const parseFeed = require(appRootDirectory + '/app/syndication/parseFeed');
const github = config.github;
const syndicate = config.syndicate;
const syndicationRepo = config.syndicationRepo;

exports.check = function check() {
    const urlDestination = `${syndicationRepo.postUrl}/${syndicate.lastSentPath}`;
    const options = {
        headers : {
            Authorization : `token ${github.key}`,
            'Content-Type' : 'application/vnd.github.v3+json; charset=UTF-8',
            'User-Agent' : github.name
        }
    };

    logger.info(urlDestination);
    // GET the most recent sent date and the feed of syndication items
    axios.all([
        axios.get(urlDestination, options),
        axios.get(syndicate.feed)
    ])
        .then(axios.spread((lastDate, feedItems) => {
            // Pass this to the parseFeed function
            parseFeed.check(lastDate, feedItems);
        }))
        .catch(function fail(error) {
            logger.error(error);
            logger.info('GIT GET Failed');
            slack.sendMessage('Failed to get feed or last update time, check logs');
        });
};
