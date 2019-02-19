

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

    switch (player_class) {

        case "Death Knight":
            $("#spec_select").append("<option>Blood</option>")
            $("#spec_select").append("<option>Frost</option>")
            $("#spec_select").append("<option>Unholy</option>")
            break;
        case "Demon Hunter":
            $("#spec_select").append("<option>Havoc</option>")
            $("#spec_select").append("<option>Vengeance</option>")
            break;
        case "Druid":
            $("#spec_select").append("<option>Balance</option>")
            $("#spec_select").append("<option>Feral</option>")
            $("#spec_select").append("<option>Guardian</option>")
            break;
        case "Hunter":
            $("#spec_select").append("<option>Beast Mastery</option>")
            $("#spec_select").append("<option>Marksmanship</option>")
            $("#spec_select").append("<option>Survival</option>")
            break;
        case "Mage":
            $("#spec_select").append("<option>Arcane</option>")
            $("#spec_select").append("<option>Fire</option>")
            $("#spec_select").append("<option>Frost</option>")
            break;
        case "Monk":
            $("#spec_select").append("<option>Windwalker</option>")
            break;
        case "Paladin":
            $("#spec_select").append("<option>Protection</option>")
            $("#spec_select").append("<option>Retribution</option>")
            break;
        case "Priest":
            $("#spec_select").append("<option>Shadow</option>")
            break;
        case "Rogue":
            $("#spec_select").append("<option>Assassination</option>")
            $("#spec_select").append("<option>Outlaw</option>")
            $("#spec_select").append("<option>Subtlety</option>")
            break;
        case "Shaman":
            $("#spec_select").append("<option>Elemental</option>")
            $("#spec_select").append("<option>Enhance</option>")
            break;
        case "Warlock":
            $("#spec_select").append("<option>Affliction</option>")
            $("#spec_select").append("<option>Demonology</option>")
            $("#spec_select").append("<option>Destruction</option>")
            break;
        case "Warrior":
            $("#spec_select").append("<option>Arms</option>")
            $("#spec_select").append("<option>Fury</option>")
            $("#spec_select").append("<option>Prot</option>")
            break;
    }
};