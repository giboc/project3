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

        $("#display").append("Critical Hit: " + stat[0] + "%<br>");
        $("#display").append("Haste: " + stat[1] + "%<br>");
        $("#display").append("Mastery: " + stat[2] + "%<br>");
        $("#display").append("Versatility: " + stat[3] + "%<br>");
        $("#display").append("Sim dps: " + best.dps + "<br>");
        $("#thanks").append('<p>All values are taken from <a href="https://bloodmallet.com">Bloodmallet</a>.</p>')
    });


}
