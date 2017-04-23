const passport = require("passport");
const TwitterTokenStrategy = require('passport-twitter-token');

const dotenv = require('dotenv');

dotenv.load();

const authenticateUser = new TwitterTokenStrategy(getTwitterOptions(), function(token, tokenSecret, profile, done) {
        if(profile) {
           done(null, profile);
        } else {
           done(null, false);
        }
});

function getTwitterOptions() {
    return {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET
    };
}

passport.use(authenticateUser);