require('dotenv').config();
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var BNET_ID = process.env.BNET_ID
var BNET_SECRET = process.env.BNET_SECRET

const app = require("./server");

passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: "/auth/bnet/callback", //us.api.blizzard.com/wow/character/Crushridge/Akron",
    region: "us"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);

    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
      done(null, id);
});

module.exports = passport; 