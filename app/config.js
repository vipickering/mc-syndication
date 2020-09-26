/*eslint no-process-env: "off"*/
const config = {};
config.api = {
    'port' : process.env.API_PORT
};

config.github = {
    'host' : process.env.GITHUB_HOST,
    'key' : process.env.GITHUB_KEY,
    'name' : process.env.GITHUB_NAME,
    'user' : process.env.GITHUB_USER,
    'email' : process.env.GITHUB_USER_EMAIL
};

config.syndicationRepo = {
    'postUrl' : process.env.GITHUB_HOST + '/repos/' + process.env.GITHUB_NAME + '/' + process.env.SYNDICATION_REPO + '/contents',
    'repo' : process.env.SYNDICATION_REPO,
    'branch' : process.env.SYNDICATION_REPO_BRANCH
};

config.syndicate = {
    'feed' : process.env.SYNDICATION_FEED,
    'lastSentPath' : process.env.SYNDICATION_LAST_PATH,
    'token' : process.env.SYNDICATION_ROUTE_TOKEN
};

config.twitter = {
    'ApiKey' : process.env.TWITTER_API_KEY,
    'ApiSecret' : process.env.TWITTER_API_SECRET,
    'AccessToken' : process.env.TWITTER_ACCESS_TOKEN,
    'AccessSecret' : process.env.TWITTER_ACCESS_SECRET
};

config.slack = {
    'token' : process.env.SLACK_TOKEN
};

module.exports = config;
