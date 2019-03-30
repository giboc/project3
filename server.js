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
var db = mongojs("wowchar:1234567a@ds111718.mlab.com:11718/heroku_vkn7ltzz", ["char"]);


const app = module.exports = express();

app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());

app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

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

app.post("/api/charData", (req, res) => {
    console.log(req.body.input);
    
    let url = `https://us.api.blizzard.com/wow/character/${req.body.input.realm}/${req.body.input.char}`

    console.log(url)
    axios.get(url, {
        params: {
            access_token: BNET_TOKEN,
            fields: "items,stats,talents"

        }
    }).then(response => {
        db.char.drop();
        db.char.save(response.data);
        res.send(response.data);
    }).catch(error => {
        res.sendStatus(error);
    });
})

app.get("/api/char", (req, res) => {
    db.char.find((err, data) => {
        res.send(data);
    })
})

app.post("/api/secondary", (req, res) => {
    let bloodmalletURL = "https://bloodmallet.com/json/secondary_distributions/" + req.body.input.class + "_" + req.body.input.spec + "_patchwerk.json";
    console.log(bloodmalletURL);
    axios.get(bloodmalletURL)
        .then(response => {

            let best = {
                secondary: "0_0_0_0",
                dps: 0
            };

            let distribution = Object.entries(response.data.data);
            distribution = Object.entries((distribution[0][1]))
            distribution.forEach((pair) => {
                if (pair[1] > best.dps) {
                    best.dps = pair[1]
                    best.secondary = pair[0]
                }
            })
            let stat = best.secondary.split("_")
            let results = {
                dps: best.dps,
                crit: stat[0],
                haste: stat[1],
                mastery: stat[2],
                versatility: stat[3]
            }
            res.send(results);
        })
})

app.listen(process.env.PORT || PORT);
