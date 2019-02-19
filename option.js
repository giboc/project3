

$("#class_select").append("<option disabled selected value> </option>")
$("#class_select").append("<option disabled selected value> </option>")
$("#class_select").append("<option>Death Knight</option>")
$("#class_select").append("<option>Demon Hunter</option>")
$("#class_select").append("<option>Druid</option>")
$("#class_select").append("<option>Hunter</option>")
$("#class_select").append("<option>Mage</option>")
$("#class_select").append("<option>Monk</option>")
$("#class_select").append("<option>Paladin</option>")
$("#class_select").append("<option>Priest</option>")
$("#class_select").append("<option>Rogue</option>")
$("#class_select").append("<option>Shaman</option>")
$("#class_select").append("<option>Warlock</option>")
$("#class_select").append("<option>Warrior</option>")

function choose_spec() {
    let player_class = $("#class_select").val();
    $("#spec_select").empty();
    $("#spec_select").append("<option disabled selected value> </option>")
    //  Death Knight 
    if (player_class === "Demon Hunter") {
        $("#spec_select").append("<option>Havoc</option>")
        $("#spec_select").append("<option>Vengeance</option>")
    }
    //  Druid 
    if (player_class === "Hunter") {

        $("#spec_select").append("<option>Beast Mastery</option>")
        $("#spec_select").append("<option>Marksmanship</option>")
        $("#spec_select").append("<option>Survival</option>")
    }
    if (player_class === "Mage") {

        $("#spec_select").append("<option>Arcane</option>")
        $("#spec_select").append("<option>Fire</option>")
        $("#spec_select").append("<option>Frost</option>")
    }

    //  Monk  
    //  Paladin 
    //  Priest 
    //  Rogue 
    //  Shaman 
    //  Warlock 
    //  Warrior 
};