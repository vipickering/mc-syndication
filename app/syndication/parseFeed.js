/*
Use the feed data to loop over the webmention items and check for new items
Use the last sent date to compare if there are new items in the feed
If new items are found pass to the Send function
If new items are found, update the last sent date to the latest item in the feed
*/

const logger = require(appRootDirectory + '/app/logging/bunyan');
const base64 = require('base64it');
const syndication = require(appRootDirectory + '/app/syndication/send');
const lastFetchDate = require(appRootDirectory + '/app/github/update');

exports.check = function check(lastDate, feedItems) {
    const decodedDate = base64.decode(lastDate.data.content);
    const parsedData = JSON.parse(decodedDate);
    const syndicationItems = feedItems.data;
    const lastSentTime = parsedData.time;
    let item;
    let tempTime = 0;

    logger.info(`last sent at ${lastSentTime}`);
    /*
    Loop over the feed and look for new webmentions
    If a new webmention is found:
     - Send the webmention
     - update the timpTime variable to the date of the new webmention
    */
    for (item in syndicationItems) {
        if (syndicationItems.hasOwnProperty(item)) {
            if (syndicationItems[item].date > lastSentTime) {
                logger.info(`${syndicationItems[item].source} on date ${syndicationItems[item].date} sending to ${syndicationItems[item].target}`);
                syndication.send(syndicationItems[item].source, syndicationItems[item].target);
                tempTime = syndicationItems[item].date;
            }
        }
    }

    /*
    Check if  any webmentions were sent by comparing tempTime.
    */
    if (tempTime > lastSentTime) {
        const payload = `{"time" : "${tempTime}"}`;
        logger.info(`Updating webmention last sent time to ${tempTime}`);
        lastFetchDate.update(payload, lastDate.data.sha);
    } else {
        logger.info('No Webmentions found');
    }
};
