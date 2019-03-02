let express = require ("express");

let app = express();

app.get("/", (req,res)=>{
    res.send("test"); 

})

let PORT = process.env.PORT || 3000;


app.listen(PORT, ()=> {
    console.log("Listening on port 3000");
})