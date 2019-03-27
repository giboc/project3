let conn = new Mongo();
let db = conn.getDB("wow");

db = db.lootTable;

db.drop();

db.insertMany([
    { itemID: "158321", itemName: "Wand of Zealous Purification", location: "Atal'Dazar", boss: "Priestess Alun'za"},
    { itemID: "158322", itemName: "Aureus Vessel", location: "Atal'Dazar", boss: "Priestess Alun'za"},
    { itemID: "158309", itemName: "Wristlinks of Alchemical Transfusion", location: "Atal'Dazar", boss: "Priestess Alun'za"},
    { itemID: "158306", itemName: "Belt of Gleaming Determination", location: "Atal'Dazar", boss: "Priestess Alun'za"},
    { itemID: "158347", itemName: "Cincture of Glittering Gold", location: "Atal'Dazar", boss: "Priestess Alun'za"},
    { itemID: "158313", itemName: "Legplates of Beaten Gold", location: "Atal'Dazar", boss: "Priestess Alun'za"},
    { itemID: "155861", itemName: "Embellished Ritual Sabatons", location: "Atal'Dazar", boss: "Priestess Alun'za"},
    { itemID: "158319", itemName: "My'das Talisman", location: "Atal'Dazar", boss: "Priestess Alun'za"},

    { itemID: "159632", itemName: "Adulation Enforcer", location: "Atal'Dazar", boss: "Vol'kaal"},
    { itemID: "158375", itemName: "Drape of the Loyal Vassal", location: "Atal'Dazar", boss: "Vol'kaal"},
    { itemID: "158348", itemName: "Wraps of Everliving Fealty", location: "Atal'Dazar", boss: "Vol'kaal"},
    { itemID: "158317", itemName: "Gauntlets of Eternal Service", location: "Atal'Dazar", boss: "Vol'kaal"},
    { itemID: "159445", itemName: "Grips of the Everlasting Guardian", location: "Atal'Dazar", boss: "Vol'kaal"},
    { itemID: "155869", itemName: "Shambling Berserker's Leggings", location: "Atal'Dazar", boss: "Vol'kaal"},
    { itemID: "158320", itemName: "Revitalizing Voodoo Totem", location: "Atal'Dazar", boss: "Vol'kaal"},

    { itemID: "158303", itemName: "Devilsaur Worshiper's Sandals", location: "Atal'Dazar", boss: "Rezan"},
    { itemID: "158713", itemName: "Disc of Indomitable Will", location: "Atal'Dazar", boss: "Rezan"},
    { itemID: "158711", itemName: "Hallowed Ossein Longbow", location: "Atal'Dazar", boss: "Rezan"},
    { itemID: "155868", itemName: "Kilt of Fantatical Consumption", location: "Atal'Dazar", boss: "Rezan"},
    { itemID: "158712", itemName: "Rezan's Gleaming Eye", location: "Atal'Dazar", boss: "Rezan"},
    { itemID: "159458", itemName: "Seal of the Regal Loa", location: "Atal'Dazar", boss: "Rezan"},
    { itemID: "160269", itemName: "Soulrending Claw", location: "Atal'Dazar", boss: "Rezan"},
    { itemID: "160214", itemName: "Venerated Raptorhide Bindings", location: "Atal'Dazar", boss: "Rezan"},

    { itemID: "159358", itemName: "Coif of the Court Spider", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "159233", itemName: "Loa Betrayer's Vestments", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "158304", itemName: "Mantle of Fastidious Machinations", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "158315", itemName: "Secret Spinner's Miter", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "160212", itemName: "Shadowshroud Vambraces", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "158308", itemName: "Souldrifting Sabatons", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "158323", itemName: "Soulrender's Fang", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "155866", itemName: "Soulspun Casque", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "155860", itemName: "Spymaster's Wrap", location: "Atal'Dazar", boss: "Yazma"},
    { itemID: "159610", itemName: "Vessel of Skittering Shadows", location: "Atal'Dazar", boss: "Yazma"}


    
]);

cursor = db.find().pretty();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

