let express = require ("express");

let app = express();

app.get("/", (req,res)=>{
    res.send("test"); 

})

app.listen(3000, ()=> {
    console.log("Listening on port 3000");
})