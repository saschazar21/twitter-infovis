var Twitter = require('twit');

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000,
});

module.exports = (obj) => new Promise((resolve, reject) => {
  if (obj !== null && typeof obj === 'object') {
    var settings = {};
    if (obj.follow) {
      settings.follow = obj.follow;
    }
    if (obj.track) {
      settings.track = obj.track;
    }
    if (obj.locations) {
      settings.locations = obj.locations;
    }

    var stream = twitter.stream('statuses/filter', settings);

    return resolve(stream);
  }
  return reject('Parameter was not an object!');
});
