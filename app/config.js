/*eslint no-process-env: "off"*/
const config = {};

config.github = {
    'postUrl' : process.env.GITHUB_HOST + '/repos/' + process.env.GITHUB_NAME + '/' + process.env.GITHUB_REPO + '/contents',
    'key' : process.env.GITHUB_KEY,
    'repo' : process.env.GITHUB_REPO,
    'name' : process.env.GITHUB_NAME,
    'user' : process.env.GITHUB_USER,
    'email' : process.env.GITHUB_USER_EMAIL,
    'host' : process.env.GITHUB_HOST,
    'branch' : process.env.GITHUB_BRANCH
};

config.api = {
    'port' : process.env.API_PORT
};

config.syndicate = {
    'feed' : process.env.SYNDICATION_FEED,
    'interval' : process.env.INTERVAL_DURATION,
    'lastSentPath' : process.env.SYNDICATION_LAST_PATH,
    'token' : process.env.SYNDICATION_ROUTE_TOKEN
};

config.twitter = {
    'ApiKey' : process.env.TWITTER_API_KEY,
    'ApiSecret' : process.env.TWITTER_API_SECRET,
    'AccessToken' : process.env.TWITTER_ACCESS_TOKEN,
    'AccessSecret' : process.env.TWITTER_ACCESS_SECRET
};

module.exports = config;
