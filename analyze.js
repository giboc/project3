function analyze() {
    let url = "https://bloodmallet.com/json/secondary_distributions/"
    let player_class = $("#class_select").val().toLowerCase()
    player_class = player_class.replace(" ", "_");

    console.log(player_class);

    url += (player_class + "_");
    let spec = $("#spec_select").val().toLowerCase();
    spec = spec.replace(" ", "_");
    url += (spec + "_patchwerk.json");
    console.log(url);

    $.getJSON(url, (data) => {
        let best = {
            secondary: "0_0_0_0",
            dps: 0
        };
        let distribution = Object.entries(data.data)
        distribution = Object.entries((distribution[0][1]))
        distribution.forEach((pair) => {
            if (pair[1] > best.dps) {
                best.dps = pair[1]
                best.secondary = pair[0]
            }
        })
        let stat = best.secondary.split("_");
        $("#display").empty();
        $("#display").append("Critical Hit: " + stat[0] + "%<br>");
        $("#display").append("Haste: " + stat[1] + "%<br>");
        $("#display").append("Mastery: " + stat[2] + "%<br>");
        $("#display").append("Versatility: " + stat[3] + "%<br>");
        $("#display").append("Sim dps: " + best.dps + "<br>");

    });
}

$("form").submit(() => {
    event.preventDefault();
    let name = $("#char_name").val();
    let realm = $("#realm_name").val();
    let key = "USqSyMcrX18lBAUbDg1LFLbE6X6cyZifSE";
    let url = `https://us.api.blizzard.com/wow/character/${realm}/${name}?fields=items&locale=en_US&access_token=${key}`

    $("#char_data").empty();

    console.log("hello!");


    var stamina = 0;

    $.getJSON(url, (data) => {
        console.log(data.items);
        let agility = 0;
        let haste = 0;
        let secondary = 0;
        let crit = 0;
        let mastery = 0;
        let vers = 0;
        let gear = Object.values(data.items);
        for (let i = 2; i < gear.length; i++) {

            gear[i].stats.forEach((value) => {
                switch (value.stat) {
                    case 3:
                    case 71:
                    case 72:
                    case 73:
                        agility += value.amount;
                        break;
                    case 7:
                        stamina += value.amount;
                        break;
                    case 32:
                        crit += value.amount;
                        break;
                    case 36:
                        haste += value.amount;
                        break;
                    case 40:
                        vers += value.amount;
                        break;
                    case 49:
                        mastery += value.amount;
                        break;
                    default:
                        console.log("Something went wrong :O"); 
                        console.log(`case ${value.stat}: not accounted for`)
                        break;
                }
            })

        }
        secondary += (crit+haste+mastery+vers);
        $("#char_data").append(`Critical Hit: ${crit} (${(100.00*crit/secondary).toFixed(2)}%)<br>`);
        $("#char_data").append(`Haste: ${haste} (${(100.00*haste/secondary).toFixed(2)}%)<br>`);
        $("#char_data").append(`Mastery: ${mastery} (${(100.00*mastery/secondary).toFixed(2)}%)<br>`);
        $("#char_data").append(`Versatility: ${vers} (${(100.00*vers/secondary).toFixed(2)}%)<br>`);
        $('#char_data').append(`Stamina: ${stamina}<br>`);
        $("#char_data").append(`Agility: ${agility}<br>`);



        
    });

})

$("#thanks").append('<p>All values are taken from <a href="https://bloodmallet.com">Bloodmallet</a>.</p>')