import * as $ from "jquery";
var path = "../wp-content/plugins/nominations/api/regions/";
var compPath = "../wp-content/plugins/nominations/api/competitions/";

export const getAllRegions = () => {
    return $.ajax({
        url: path + "GetAllRegions.php",
        type: "POST"
    })
}

export const getRegionById = (contract) => {
    return $.ajax({
        url: path + "GetRegionById.php",
        type: "POST",
        data: contract
    })
}

export const insertRegion = (contract) => {
    return $.ajax({
        url: path + "InsertRegion.php",
        type: "POST",
        data: contract
    })
}

export const updateRegion = (contract) => {
    return $.ajax({
        url: path + "UpdateRegion.php",
        type: "POST",
        data: contract
    })
}

export const deleteRegion = (contract) => {
    return $.ajax({
        url: path + "DeleteRegion.php",
        type: "POST",
        data: contract
    })
}

//Competitions

export const getAllCompetitions = () => {
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

export const insertCompetition = (contract) => {
    return $.ajax({
        url: compPath + "InsertCompetition.php",
        type: "POST",
        data: contract
    })
}

export const updateCompetition = (contract) => {
    return $.ajax({
        url: compPath + "UpdateCompetition.php",
        type: "POST",
        data: contract
    })
}

export const deleteCompetition = (contract) => {
    return $.ajax({
        url: compPath + "DeleteCompetition.php",
        type: "POST",
        data: contract
    })
}