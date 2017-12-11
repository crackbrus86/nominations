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

export const getAllLifters = (contract) => {
    return $.ajax({
        url: nomPath + "GetAllLifters.php",
        type: "POST",
        data: contract
    })
}

export const getAllReferees = (contract) => {
    return $.ajax({
        url: nomPath + "GetAllReferees.php",
        type: "POST",
        data: contract
    })
}

export const insertLifterNomination = (contract) => {
    return $.ajax({
        url: nomPath + "InsertLifterNominationAdmin.php",
        type: "POST",
        data: contract
    })
}

export const insertOfficialNomination = (contract) => {
    return $.ajax({
        url: nomPath + "InsertOfficialNominationAdmin.php",
        type: "POST",
        data: contract
    })
}

export const getLifterNominationById = (contract) => {
    return $.ajax({
        url: nomPath + "GetLifterNominationByIdAdmin.php",
        type: "POST",
        data: contract
    })
}

export const updateLifterNominationById = (contract) => {
    return $.ajax({
        url: nomPath + "UpdateLifterNominationByIdAdmin.php",
        type: "POST",
        data: contract
    })
}

export const deleteNomination = (contract) => {
    return $.ajax({
        url: nomPath + "DeleteNominationAdmin.php",
        type: "POST",
        data: contract
    })
}

export const getOfficialNominationById = (contract) => {
    return $.ajax({
        url: nomPath + "GetOfficialNominationByIdAdmin.php",
        type: "POST",
        data: contract
    })
}

export const updateOfficialNominationById = (contract) => {
    return $.ajax({
        url: nomPath + "UpdateOfficialNominationAdmin.php",
        type: "POST",
        data: contract
    })
}

export const changeStatus = (contact) => {
    return $.ajax({
        url: nomPath + "CheckNominationStatusById.php",
        type: "POST",
        data: contact
    })
}