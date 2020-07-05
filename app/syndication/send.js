/*
POST the found item to Syndication service
*/
exports.send = function send(source, service, content) {
    const logger = require(appRootDirectory + '/app/logging/bunyan');
    const twitter = require(appRootDirectory + '/app/targets/twitter');

    //Make sure tweet doesn't exceed char count.
    function truncate(str, n) {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    }

    switch (service) {
    case 'Twitter' :
        logger.info(`Found ${content}  for ${service}`);
        const truncatedContent = truncate(content, 140);
        twitter.send(truncatedContent, source);
        break;
    case 'Pinboard' :
        logger.info(`Found ${content}  for  ${service}`);
        //do a thing
        break;
    default:
        logger.info(`cannot determine ${service}.`);
    }
};
