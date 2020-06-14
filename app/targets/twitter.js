/* eslint-disable camelcase */

/*
Send to Twitter

*/

const logger = require(appRootDirectory + '/app/logging/bunyan');
const config = require(appRootDirectory + '/app/config.js');
const Twit = require('twit');

var tweet = new Twit({
    consumer_key :  '...',
    consumer_secret :  '...',
    access_token : '...',
    access_token_secret :  '...',
    timeout_ms : 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL : true     // optional - requires SSL certificates to be valid.
});

//
//  tweet 'hello world!'
//
tweet.post('statuses/update', {status : 'hello world!'}, function sendTweet(err, data, response) {
    logger.info(data);
});
