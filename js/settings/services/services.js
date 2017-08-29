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