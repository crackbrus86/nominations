import $ from "jquery";

var compPath = "../wp-content/plugins/nominations/api/competitions/";
var regPath = "../wp-content/plugins/nominations/api/regions/";
var wcPath = "../wp-content/plugins/nominations/api/weight-categories/";
var nomPath = "../wp-content/plugins/nominations/api/nominations/";

export const getCompetitions = () => {
    return $.ajax({
        url: compPath + "GetAllCompetitions.php",
        type: "POST"
    })
}