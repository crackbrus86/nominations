import React from "react";

export const isFormValid = (formObject, required) => {
    for(var i = 0; i < required.length; i++){
        if(!formObject[required[i]]) return true;
    }
    return false;
}

export const isFieldValid = (field, text = "") => {
    if(!!field) return null;
    return <i className="invalid">*<sub>{text}</sub></i>
}

export const isEmailValid = (field, required = false) => {
    if(!field && required) return <i className="invalid">*<sub>{"Це поле є обов'язковим"}</sub></i>;
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    if(!pattern.test(field) && field !== "") return <i className="invalid">*<sub>{"Не вірно вказано email"}</sub></i>;
}

export const isSelectValid = (value) => {
    if(!value || value === 0 || value === "0" || !JSON.parse(value)) return <i className="invalid">*<sub>{"Оберіть корректне значення"}</sub></i>;
}

export const hasComma = (str) => {
    if((str.toString()).indexOf(",") > -1) return <i className="invalid">*<sub>{"Використовуйте '.' замість ','!"}</sub></i>;
}