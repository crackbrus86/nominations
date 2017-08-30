import * as $ from "jquery";
var path = "../wp-content/plugins/nominations/api/regions/";

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