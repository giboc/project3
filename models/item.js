let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ID: {
        type: Number,
        required: true
    }

})

let Item = mongoose.model("Item", ItemSchema);

module.exports = Item;  
