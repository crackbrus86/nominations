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

export const insertLifterNomination = (contract) => {
    return $.ajax({
        url: nomPath + "InsertLifterNomination.php",
        type: "POST",
        data: contract
    })
}

export const insertOfficialNomination = (contract) => {
    return $.ajax({
        url: nomPath + "InsertOfficialNomination.php",
        type: "POST",
        data: contract
    })
}

export const getLifterNominationsByRegion = (contract) => {
    return $.ajax({
        url: nomPath + "GetLifterNominationsByRegion.php",
        type: "POST",
        data: contract
    })
}

export const checkNominationStatusById = (contract) => {
    return $.ajax({
        url: nomPath + "CheckNominationStatusById.php",
        type: "POST",
        data: contract
    })
}

export const getLifterNominationById = (contract) => {
    return $.ajax({
        url: nomPath + "GetLifterNominationById.php",
        type: "POST",
        data: contract
    })
}

export const updateLifterNominationById = (contract) => {
    return $.ajax({
        url: nomPath + "UpdateLifterNominationById.php",
        type: "POST",
        data: contract
    })
}

export const deleteNomination = (contract) => {
    return $.ajax({
        url: nomPath + "DeleteNomination.php",
        type: "POST",
        data: contract
    })
}

export const getRefereeNominations = (contract) => {
    return $.ajax({
        url: nomPath + "GetRefereeNominations.php",
        type: "POST",
        data: contract
    })
}

export const getOfficialNominationById = (contract) => {
    return $.ajax({
        url: nomPath + "GetOfficialNominationById.php",
        type: "POST",
        data: contract
    })
}

export const updateOfficialNominationById = (contract) => {
    return $.ajax({
        url: nomPath + "UpdateOfficialNomination.php",
        type: "POST",
        data: contract
    })
}