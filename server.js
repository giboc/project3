let express = require("express");
let app = express();
let mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:3000/itemDB',{useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', ()=> {
});

let PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("another another test!");

    
});

app.listen(PORT, ()=> {
    console.log(`Listening to ${PORT}`);
})