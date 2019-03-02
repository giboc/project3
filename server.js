let express = require("express");
let app = express();

let PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("another test");

    
});

app.listen(PORT, ()=> {
    console.log(`Listening to ${PORT}`);
})