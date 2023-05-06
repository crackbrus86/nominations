import $ from "jquery";
var flowPath = "../wp-content/plugins/nominations/api/flows/";

export const getCompetitions = ({ filter }) => {
    return $.ajax({
        url: flowPath + "getCompetitions.php",
        type: "GET",
        data: { "filter": filter }
    });
}