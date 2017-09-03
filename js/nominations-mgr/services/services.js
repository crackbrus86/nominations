import $ from "jquery";
var compPath = "../wp-content/plugins/nominations/api/competitions/";
var regPath = "../wp-content/plugins/nominations/api/regions/";
var wcPath = "../wp-content/plugins/nominations/api/weight-categories/";

export const getCompetitions = () => {
    return $.ajax({
        url: compPath + "GetAllCompetitions.php",
        type: "POST"
    })
}

export const getCompetitionById = (contract) => {
    return $.ajax({
        url: compPath + "GetCompetitionById.php",
        type: "POST",
        data: contract
    })
}

export const getAllRegionsNames = () => {
    return $.ajax({
        url: regPath + "GetAllRegionsNames.php",
        type: "POST"
    })
}

export const getWeightCategories = (contract) => {
    return $.ajax({
        url: wcPath + "GetWeightCategoriesByGender.php",
        type: "POST",
        data: contract
    })
}