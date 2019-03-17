// require('dotenv').config();
var passport = require('./pass');
// var BnetStrategy = require('passport-bnet').Strategy;
// var BNET_ID = process.env.BNET_ID
// var BNET_SECRET = process.env.BNET_SECRET

var express = require("express");
var path = require("path");
var session = require("express-session");
const PORT = 8080;


const app = module.exports = express();

//app.use(express.urlencoded({ extended: true }));


app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/bnet',
    passport.authenticate('bnet'));

app.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/foo' }),
    (req, res) => {
        req.session.token = req.user.token;
        console.log(req.user); 
        // console.log(req.user.token);
        //  console.log(Object.keys(req.session.passport));
         res.redirect('/test');
    }
);

app.get("/", (req,res)=>{
    console.log("mooooo?");
    res.send("Foobar");
});


app.get("/foo",(req,res)=>{
    res.send("foo");
})


app.get("/test",(req,res)=>{
    
    console.log(req.session.token);
    $.ajax({
        dataType: "json",
        url: "https://us.api.blizzard.com/wow/character/Crushridge/Akron?locale=en_US&access_token="+req.session.token,
        data: data,
        success: success
    });
    
    res.send(req.session.token);
})
// $.ajax({
//     dataType: "json",
//     url: "bloodmallet.com/json/secondary_distributions/demon_hunter_havoc_patchwerk.json",
//     data: data,
//     success: success
// });

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

