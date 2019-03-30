
// var express = require("express");
// const PORT = 8081;

// var mongojs = require('mongojs');
// var db = mongojs("wowchar:1234567a@ds111718.mlab.com:11718/heroku_vkn7ltzz", ["item_list"]);


// const app = module.exports = express();



// app.get("/", (req, res) => {
//     let items = {
//         Back: "Turncoat's Cape",
//         Chest: "Venture Co. Plenipotentiary Vest",
//         Feet: "Tempered Tempest Boots of the Quickblade",
//         Finger1: "Rot-Scour Ring",
//         Finger2: "Lord Admiral's Signet",
//         Hands: "Wharf Warden's Gloves",
//         Head: "High Altitude Turban",
//         Legs: "Silver-Trimmed Breeches",
//         MainHand: "Bloodtooth, the Soulfeaster",
//         Neck: "Heart of Azeroth",
//         Shoulder: "Tentacle-Laced Spaulders",
//         Tabard: "Guild Tabard",
//         Trinket1: "Kul Tiran Cannonball Runner",
//         Trinket2: "Kimbul's Razor Claw",
//         Waist: "Stretched Sinew Waistcord",
//         Wrist: "Blood Elder's Bindings"
//         }

//         let best = {
//             stat1: 40,
//             stat2: 32
//         }

//         db.item_list.find(items, (err,data) => {
//             console.log(data);
//             res.send(data);
//         })
// })


// app.listen(process.env.PORT || PORT);















var mongojs = require('mongojs');
var db = mongojs("wowchar:1234567a@ds111718.mlab.com:11718/heroku_vkn7ltzz", ["item_list"]);


let items = {
    Back: "Turncoat's Cape",
    Feet: "Tempered Tempest Boots of the Quickblade",
    Finger1: "Rot-Scour Ring",
    Finger2: "Lord Admiral's Signet",
    Hands: "Wharf Warden's Gloves",
    Legs: "Silver-Trimmed Breeches",
    MainHand: "Bloodtooth, the Soulfeaster",
    Waist: "Stretched Sinew Waistcord",
    Wrist: "Blood Elder's Bindings"
}

let optimal_gear = {
    Back: false,
    Feet: false,
    Finger1: false,
    Finger2: false,
    Hands: false,
    Legs: false,
    MainHand: false,
    Waist: false,
    Wrist: false
}

let best = {
    stat1: 40,
    stat2: 32
}


for (let each in items) {
    // console.log(items[each])

    db.item_list.find({ name: items[each] }, (err, data) => {
        data = data[0]
        let optStat1 = false;
        let optStat2 = false;
        console.log("Item: " + items[each])
        if (!(data === undefined) && "bonusStats" in data) {
            console.log("Comparing stats...")
            for (let stat1 in data.bonusStats) {
                console.log("Stat: " +  data.bonusStats[stat1].stat)
                if (best.stat1 === data.bonusStats[stat1].stat){
                    console.log("This is the best stat!")
                    optStat1 = true;
                }
                else
                    console.log("This is not the best!");
                if (best.stat2 === data.bonusStats[stat1].stat){
                    console.log("This is the second best stat!")
                    optStat = true;
                }
                else
                    console.log("This is not the second best!");
            }
            optimal_gear[each] = optStat1 && optStat2;
            console.log(items[each] + " optimal: " + optStat1&&optStat2)
        }
        
        // data = data[0].bonusStats;
    })

}


console.log(optimal_gear);

// db.item_list.find({ name: items.Back }, (err, data) => {
//     data = (data[0].bonusStats);
//     for (let item in data){
//         console.log(item.name);
//     }








