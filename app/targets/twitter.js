/* eslint-disable camelcase */

/*
Syndicate conent  to Twitter
*/
exports.send = function send(content, source) {
    const OAuth = require('oauth');
    const logger = require(appRootDirectory + '/app/logging/bunyan');
    const config = require(appRootDirectory + '/app/config.js');
    const twitter = config.twitter;
    const tweetContent = content + source;
    const postBody = {'status' : tweetContent};
    const oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        twitter.ApiKey,
        twitter.ApiSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    // logger.info('Ready to Tweet article:\n\t', postBody.status);
    oauth.post('https://api.twitter.com/1.1/statuses/update.json',
        twitter.AccessToken,
        twitter.AccessSecret,
        postBody,
        '',
        function sendIt(err, data, res) {
            if (err) {
                logger.error(err);
            } else {
                logger.info(data);
            }
        });
};
