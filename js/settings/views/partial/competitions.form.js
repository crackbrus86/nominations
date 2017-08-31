import React from "react";
import moment from "moment";
require("../../../../styles/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../../components/validation/validation";

const CompForm = (props) => {
    var types = [{id: 1, title: "пауерліфтинг"}, {id: 2, title: "жим лежачи"}];
    var typesList = types.map(type => <option key={type.id} value={type.id}>{type.title}</option>);
    var genders = [{type: "male", title: "чоловіки"}, {type: "female", title: "жінки"}];
    var gendersList = genders.map(gender => <option key={gender.type} value={gender.type}>{gender.title}</option>);
    var word = (props.competition.id)? "Редагувати" : "Створити";
    var startDate = (props.competition.startDate)? new Date(props.competition.startDate) : null;
    var endDate = (props.competition.endDate)? new Date(props.competition.endDate) : null;
    return (<div>
        <h4>{word + " регіон"}</h4>
        <form>
            <div>
                <label>Назва {validation.isFieldValid(props.competition.name, "Назва обов'язкова")}</label>
                <input value={props.competition.name} type="text" maxLength="30" onChange={e => props.onChange("name", e.target.value)} />
            </div> 
            <div>
                <label>Тип змагань</label>
                <select value={props.competition.typeId} onChange={(e) => this.props.onChange("typeId", e.target.value)}>{typesList}</select>                
            </div>     
            <div>
                <label>Стать</label>
                <select value={props.competition.gender} onChange={(e) => this.props.onChange("gender", e.target.value)}>{gendersList}</select>                
            </div> 
            <div>
                <label>Місце проведення</label>
                <input value={props.competition.location} type="text" maxLength="30" onChange={e => props.onChange("location", e.target.value)} />
            </div>  
            <div>
                <label>Дата початку</label>
                <Datetime value={startDate} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(v) => props.onChange("startDate", v.format("YYYY-MM-DD"))} closeOnSelect={true} />
            </div>   
            <div>
                <label>Дата закінчення</label>
                <Datetime value={endDate} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(v) => props.onChange("endDate", v.format("YYYY-MM-DD"))} closeOnSelect={true} />
            </div>                                         
        </form>
    </div>)
}
export default CompForm;