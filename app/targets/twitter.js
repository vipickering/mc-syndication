/* eslint-disable camelcase */

/*
Syndicate conent  to Twitter
*/
exports.send = function send(content, source) {
    const logger = require(appRootDirectory + '/app/logging/bunyan');
    const config = require(appRootDirectory + '/app/config.js');
    const syndicate = config.syndicate;
    const Twit = require('twit');
    const tweetContent = content + source;
    var tweet = new Twit({
        consumer_key :  syndicate.twitter.ApiKey,
        consumer_secret :  syndicate.twitter.ApiSecret,
        access_token : syndicate.twitter.AccessToken,
        access_token_secret :  syndicate.twitter.AccessSecret,
        timeout_ms : 60 * 1000,
        strictSSL : true     // optional - requires SSL certificates to be valid.
    });

    //
    //  tweet 'hello world!'
    //
    tweet.post('statuses/update', {status : tweetContent}, function sendTweet(data) {
        logger.info(data);
    });
};
