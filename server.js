var passport = require('./pass');
var express = require("express");
var path = require("path");
var session = require("express-session");
var axios = require("axios");
let cors = require("cors");
let bodyParser = require("body-parser");
const PORT = 8080;

var mongojs = require('mongojs');
let db = mongojs("wow", ["char"])

const app = module.exports = express();

let corsOption = {
    origin: "localhost:3000/",
    success: 200
}

app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());



app.get('/auth/bnet', (req, res, next) => {

    passport.authenticate('bnet',
        (err, user, info) => {
            if (err) {
                return next(err);
            }
        })(req, res, next);
});

app.post('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/foo' }),
    (req, res) => {
        req.session.token = req.user.token;

        let url = "https://us.api.blizzard.com/wow/character/Crushridge/Akron?locale=en_US";

        axios.get(url, {
            params: {
                access_token: req.session.token
            }
        }).then(response => {
            console.log(response.data);
            db.char.drop();
            db.char.save(response.data);
            //res.send(response.data);
        });



        res.send('callback');
    }
);

app.get("/foo", (req, res) => {

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
})

app.post("/moo", (req, res) => {
    console.log(req.body)
    console.log("mooo");

    res.send("hoohaahahah");
});

app.post("/test", (req, res) => {


    let url = "https://us.api.blizzard.com/wow/character/Crushridge/Akron?locale=en_US";

    axios.get(url, {
        params: {
            access_token: req.session.token
        }
    }).then(response => {
        console.log(response.data);
        db.char.drop();
        db.char.save(response.data);
        //res.send(response.data);
    });



})

app.get("/api/char", (req, res) => {
    db.char.find((err, data) => {
        res.send(data);
    })
})

let cl = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

// cl.connect(url, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("wow");
//     dbo.collection("item_list").findOne({}, function (err, result) {
//         if (err) throw err;
//         console.log(result.name);
//         db.close();
//     });
// })


app.listen(process.env.PORT || PORT);
