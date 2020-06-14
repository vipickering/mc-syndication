/*
POST the found webmention to Syndication service
*/

const logger = require(appRootDirectory + '/app/logging/bunyan');
const axios = require('axios');
const config = require(appRootDirectory + '/app/config.js');
// const querystring = require('querystring');

// Need switch statement here to work out syndication service and route to correct POST
exports.send = function send(source, service) {
    // const telegraph = config.telegraph;
    // const github = config.github;
logger.info(`Would send ${source} to ${service}`); // Test to prove it works.
//     (async () => {
//         try {
//             const response = axios.post(telegraph.url, querystring.stringify({ token : telegraph.token, source : source, target : target }));
//             logger.info('Webmention Sent');
//     } catch (error) {
//         logger.error(error);
//         logger.info('Webmention Send Failed');
//     }
//   })();
};
