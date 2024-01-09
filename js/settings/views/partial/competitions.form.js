import React from "react";
import moment from "moment";
require("../../../../styles/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../../components/validation/validation";

const CompForm = (props) => {
    var required = ["name"];
    var types = [{id: 1, title: "пауерліфтинг"}, {id: 2, title: "жим лежачи"}, {id: 3, title: "класичний пауерліфтинг"}, {id: 4, title: "класичний жим лежачи"}];
    var typesList = types.map(type => <option key={type.id} value={type.id}>{type.title}</option>);
    var genders = [{type: "male", title: "чоловіки"}, {type: "female", title: "жінки"}];
    var gendersList = genders.map(gender => <option key={gender.type} value={gender.type}>{gender.title}</option>);
    var word = (props.competition.id)? "Редагувати" : "Створити";
    var startDate = (props.competition.startDate)? new Date(props.competition.startDate) : null;
    var endDate = (props.competition.endDate)? new Date(props.competition.endDate) : null;
    var isJun = (props.competition.isJun)? JSON.parse(props.competition.isJun) : false;
    var isCup = (props.competition.isCup)? JSON.parse(props.competition.isCup) : false;
    const events = [{ id: null, title: "" }].concat(props.events);
    const eventsList = events.map(x => (<option key={x.id} value={x.id}>{x.title}</option>));

    const handleStartDateChange = (val) => {
		const nextValue =
			!!val && moment.isMoment(val) && moment(val).isValid()
				? moment(new Date(val)).format('YYYY-MM-DD')
				: null;

		props.onChange('startDate', nextValue);
	};

	const handleEndDateChange = (val) => {
		const nextValue =
			!!val && moment.isMoment(val) && moment(val).isValid()
				? moment(new Date(val)).format('YYYY-MM-DD')
				: null;

		props.onChange('endDate', nextValue);
	};

    return (<div>
        <h4>{word + " змагання"}</h4>
        <form>
            <div>
                <label>Назва {validation.isFieldValid(props.competition.name, "Назва обов'язкова")}</label>
                <input value={props.competition.name} type="text" maxLength="250" onChange={e => props.onChange("name", e.target.value)} />
            </div> 
            <div>
                <label>Тип змагань</label>
                <select value={props.competition.typeId} onChange={(e) => props.onChange("typeId", e.target.value)}>{typesList}</select>                
            </div>     
            <div>
                <label>Стать</label>
                <select value={props.competition.gender} onChange={(e) => props.onChange("gender", e.target.value)}>{gendersList}</select>                
            </div> 
            <div>
                <label>Місце проведення</label>
                <input value={props.competition.location} type="text" maxLength="50" onChange={e => props.onChange("location", e.target.value)} />
            </div>  
            <div>
                <label>Дата початку</label>
                <Datetime value={startDate} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(v) => handleStartDateChange(v)} closeOnSelect={true} />
            </div>   
            <div>
                <label>Дата закінчення</label>
                <Datetime value={endDate} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(v) => handleEndDateChange(v)} closeOnSelect={true} />
            </div>
            <div>
                <label>Є змаганням для учнів ДЮСШ</label>
                <input checked={isJun} type="checkbox" onChange={e => props.onChange("isJun", e.target.checked)} />
            </div>  
            <div>
                <label>Кубок</label>
                <input checked={isCup} type="checkbox" onChange={e => props.onChange("isCup", e.target.checked)} />
            </div>
            <div>
                <label>Приєднане змагання</label>
                <select value={props.competition.eventId} onChange={e => props.onChange("eventId", e.target.value)}>{eventsList}</select>
            </div>
            <div>
                <button type="button" disabled={validation.isFormValid(props.competition, required)} onClick={() => props.onSave()}>Зберегти</button>    
            </div>                                                       
        </form>
    </div>)
}
export default CompForm;