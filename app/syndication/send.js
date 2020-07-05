/*
POST the found item to Syndication service
*/
exports.send = function send(source, service, content) {
    const logger = require(appRootDirectory + '/app/logging/bunyan');
    const twitter = require(appRootDirectory + '/app/targets/twitter');

    // I need a function to decide which service to post to, some may require authentication e.g. pinboard or Twitter.
    // I can use ${service} to determine how this works. and pass to the relevant file.
    //logger.info(`Would send ${content} from ${source} to ${service}`); // Test to prove it works.

    switch (service) {
    case 'Twitter' :
        logger.info(`Found ${content}  for ${service}`);
        twitter.send(content, source);
        break;
    case 'Pinboard' :
        logger.info(`Found ${content}  for  ${service}`);
        //do a thing
        break;
    default:
        logger.info(`cannot determine ${service}.`);
    }
};
