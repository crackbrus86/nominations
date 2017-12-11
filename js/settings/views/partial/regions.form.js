import React from "react";
import * as validation from "../../../components/validation/validation";

const RegionForm = (props) => {
    var required = ["name", "login", "token"];
    var email = (props.region.email)? props.region.email : "";
    var word = (props.region.id)? "Редагувати" : "Створити";
    return (<div>
        <h4>{word + " регіон"}</h4>
        <form>
            <div>
                <label>Назва {validation.isFieldValid(props.region.name, "Назва обов'язкова")}</label>
                <input value={props.region.name} type="text" maxLength="30" onChange={e => props.onChange("name", e.target.value)} />
            </div>
            <div>
                <label>Логін {validation.isFieldValid(props.region.login, "Логін обов'язковий")}</label>
                <input value={props.region.login} type="text" maxLength="20" onChange={e => props.onChange("login", e.target.value)} />
            </div>
            <div>
                <label>Токен {validation.isFieldValid(props.region.token, "Токен обов'язковий")}</label>
                <input value={props.region.token} type="text" maxLength="20" onChange={e => props.onChange("token", e.target.value)} />
            </div>
            <div>
                <label>Email {validation.isEmailValid(email)}</label>
                <input value={email} type="email" maxLength="30" onChange={e => props.onChange("email", e.target.value)} />
            </div>  
            <div>
                <button type="button" disabled={validation.isFormValid(props.region, required)} onClick={() => props.onSave()}>Зберегти</button>    
            </div>                                  
        </form>
    </div>)
}
export default RegionForm;