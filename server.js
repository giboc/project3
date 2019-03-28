require('dotenv').config();

var BNET_ID = process.env.BNET_ID
var BNET_SECRET = process.env.BNET_SECRET
let BNET_TOKEN = process.env.BNET_TEMP_TOKEN


let request = require("request");

var passport = require('./pass');
var express = require("express");
var path = require("path");
var session = require("express-session");
var axios = require("axios");

let bodyParser = require("body-parser");
const PORT = 8080;

var mongojs = require('mongojs');
if (process.env.NODE_ENV === 'production') 
    let db = mongojs("insert:1234567a@ds111718.mlab.com:11718/heroku_vkn7ltzz",["char"]);
else
    let db = mongojs("wow", ["char"])

const app = module.exports = express();

app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());

app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

}

// var dataString = 'grant_type=client_credentials';

// var options = {
//     url: 'https://us.battle.net/oauth/token',
//     method: 'POST',
//     body: dataString,
//     auth: {
//         'user': BNET_ID,
//         'pass': BNET_SECRET
//     }
// };

// function callback(error, response, body) {
//     console.log("callback?")
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
// }


// console.log("session token: " + session.token);
// if (session.token === undefined){
//     console.log("hello?");
//     request(options,callback);
// }
// else{
//     console.log("not undefined?");
// }



app.get('/auth/bnet', (req, res, next) => {
    passport.authenticate('bnet',
        (err, user, info) => {
            if (err)
                return next(err);
        })(req, res, next);
});

app.post('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/foo' }),
    (req, res) => {
        req.session.token = req.user.token;
        session.token = req.user.token;

        let url = "https://us.api.blizzard.com/wow/character/Crushridge/Akron?locale=en_US";

        axios.get(url, {
            params: {
                access_token: req.session.token
            }
        }).then(response => {
            console.log(response.data);
            db.char.drop();
            db.char.save(response.data);
        });
        res.send('callback');
    }
);

app.post("/foo", (req, res) => {
    let url = `https://us.api.blizzard.com/wow/character/${req.body.input.realm}/${req.body.input.name}`
    axios.get(url, {
        params: {
            access_token: BNET_TOKEN,
            fields: "items"
        }
    }).then(response => {
        db.char.drop();
        db.char.save(response.data);
        res.send(response.data);
    });
})

app.get("/api/char", (req, res) => {
    db.char.find((err, data) => {
        res.send(data);
    })
})

app.listen(process.env.PORT || PORT);
