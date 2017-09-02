import $ from "jquery";
var compPath = "../wp-content/plugins/nominations/api/competitions/";

export const getCompetitions = () => {
    return $.ajax({
        url: compPath + "GetAllCompetitions.php",
        type: "POST"
    })
}