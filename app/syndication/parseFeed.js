/*
Use the feed data to loop over the syndication items and check for new items
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
    Loop over the feed and look for new syndication items
    If a new item is found:
     - Syndicate the item
     - update the tempTime variable to the date of the new item
    */
    for (item in syndicationItems) {
        if (syndicationItems.hasOwnProperty(item)) {
            if (syndicationItems[item].date > lastSentTime) {
                syndication.send(syndicationItems[item].url, syndicationItems[item].target, syndicationItems[item].content);
                tempTime = syndicationItems[item].date;
            }
        }
    }

    /*
    Check if  any syndication items were sent by comparing tempTime.
    */
    if (tempTime > lastSentTime) {
        const payload = `{"time" : "${tempTime}"}`;
        logger.info(`Updating syndication last sent time to ${tempTime}`);
        lastFetchDate.update(payload, lastDate.data.sha);
    } else {
        logger.info('No Syndication items found');
    }
};
