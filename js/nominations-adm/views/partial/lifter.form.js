import React from "react";
import moment from "moment";
require("../../../../styles/react-datetime.css");
import Datetime from "react-datetime";
import * as validation from "../../../components/validation/validation";

const LifterForm = (props) => {
    if(props.nomination.type !== "lifter") return null;
    var info = props.compInfo;
    var date = moment(info.startDate).locale("uk").format("DD MMM") + "-" + moment(info.endDate).locale("uk").format("DD MMM") + ", " + moment(info.endDate).format("YYYY");    
    var nom = props.nomination;
    var mName = (nom.mName)? nom.mName : "";
    var bDate = (nom.birthDate)? new Date(nom.birthDate) : null;
    var genders = [{type: "male", title: "чоловіки"}, {type: "female", title: "жінки"}];
    var gendersList = genders.map(gender => <option key={gender.type} value={gender.type}>{gender.title}</option>);  
    var regionsList = props.regions.map(region => <option key={region.id} value={region.id}>{region.name}</option>);
    var divisions = (nom.gender === "male")? [{value: "seniors", name: "Чоловіки"},{value: "subjuniors", name: "Юнаки"},{value: "juniors", name: "Юніори"},{value: "masters1", name: "Ветерани 1"},{value: "masters2", name: "Ветерани 2"},{value: "masters3", name: "Ветерани 3"},{value: "masters4", name: "Ветерани 4"}] : 
    [{value: "seniors", name: "Жінки"},{value: "subjuniors", name: "Дівчата"},{value: "juniors", name: "Юніорки"},{value: "masters1", name: "Ветерани 1"},{value: "masters2", name: "Ветерани 2"},{value: "masters3", name: "Ветерани 3"},{value: "masters4", name: "Ветерани 4"}];
    var evalAge = (bdate) => {
        var year = parseInt(new Date().getFullYear());
        var born = new Date(bdate).getFullYear();
        var diff = year - born;
        if(diff >= 12 && diff <=18) return "subjuniors";
        if(diff>= 19 && diff <= 23) return "juniors";
        return null;
    }
    var validateDivision = () => {
        if(JSON.parse(info.isJun) && evalAge(bDate)){
            var isValid = (nom.division === evalAge(bDate))? true : false;
            return {
                isValid: isValid,
                text: <span className="validation">Дивізіон не відповідає віковій групі</span>
            }
        }
        return {
            isValid: true
        };
    }

    var divisionsList = divisions.map(div => <option key={div.value} value={div.value}>{div.name}</option>);
    var weightClassList = props.wc.map(w => <option key={w.id} value={w.id}>{w.name}</option>);
    var shortWc = [];
    for(var i = 1; i < props.wc.length; i++){
        shortWc.push(props.wc[i]);
    }
    var shortWCList = shortWc.map(w => <option key={w.id} value={w.id}>{w.name}</option>);
    var subWeightClassList = props.subwc.map(s => <option key={s.id} value={s.id}>{s.name}</option>);
    var st = (info.typeId === "1")? {squat: nom.squat, isDisabled: false} : { squat: nom.squat, isDisabled: true};
    var dl = (info.typeId === "1")? {deadlift: nom.deadlift, isDisabled: false} : { deadlift: nom.deadlift, isDisabled: true};
    var levels = [{id: 1, name: "ІІІ юн"},{id: 2, name: "ІІ юн"},{id: 3, name: "І юн"},{id: 4, name: "ІІІ"},{id: 5, name: "ІІ"},
    {id: 6, name: "І"},{id: 7, name: "КМСУ"},{id: 8, name: "МСУ"},{id: 9, name: "МСУМК"},{id: 10, name: "ЗМСУ"}];
    var levelList = levels.map(level => <option key={level.id} value={level.id}>{level.name}</option>);
    var getAgeCat = (bdate) => {
        var year = parseInt(new Date().getFullYear());
        var born = new Date(bdate).getFullYear();
        var diff = year - born;
        if(diff >= 12 && diff <= 13) return "I група (" + parseInt(year-13) + " - " + parseInt(year-12) + "р.н.)";
        if(diff >= 14 && diff <= 15) return "II група (" + parseInt(year-15) + " - " + parseInt(year-14) + "р.н.)";
        if(diff >= 16 && diff <= 18) return "III група (" + parseInt(year-18) + " - " + parseInt(year-16) + "р.н.)";
        if(diff >= 19 && diff <= 23) return "IV група (" + parseInt(year-23) + " - " + parseInt(year-19) + "р.н.)";
        return null;
    }
    var ageGroups = (((nom.division === "subjuniors" || nom.division === "juniors") && !!bDate) && JSON.parse(info.isJun) )? 
    <tr><td><label>Вікова група</label></td>
    <td><input value={getAgeCat(bDate)} type="text" readOnly={true} /></td>
    </tr> : null;
    return (<div>
        <div className="form-header">
            <h3>Додати спортсмена до номінації</h3>
            <p className="comp-name">{info.name}</p>
            <p className="comp-location">{info.location}</p>
            <p className="comp-date">{date}</p>
        </div>
        <form>
            <div className="formBody">
                <table>
                    <tbody>
                    <tr>
                        <td><label>Прізвище</label></td>
                        <td><input value={nom.surname} type="text" maxLength="150" onChange={e => props.onChange("surname", e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td><label>Ім'я</label></td>
                        <td><input value={nom.firstName} type="text" maxLength="50" onChange={e => props.onChange("firstName", e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td><label>По-батькові</label></td>
                        <td><input value={mName} type="text" maxLength="50" onChange={e => props.onChange("mName", e.target.value)} /></td>
                    </tr>                    
                    <tr>
                        <td><label>Дата народження</label></td>
                        <td><Datetime value={bDate} dateFormat="DD-MM-YYYY" timeFormat={false} onChange={(v) => props.onChange("birthDate", v.format("YYYY-MM-DD"))} closeOnSelect={true} /></td>
                    </tr>
                    <tr>
                        <td><label>Стать</label></td>
                        <td><select value={nom.gender} disabled={true}>{gendersList}</select></td>
                    </tr>
                    <tr>
                        <td><label>Область</label></td>
                        <td><select value={nom.team}  onChange={e => props.onChange("team", e.target.value)}>{regionsList}</select></td>
                    </tr>
                    <tr>
                        <td><label>Місто</label></td>
                        <td><input value={nom.city} type="text" maxLength="100" onChange={e => props.onChange("city", e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td><label>ФСТ</label></td>
                        <td><input value={nom.fst} type="text" maxLength="100" onChange={e => props.onChange("fst", e.target.value)} /></td>
                    </tr>  
                    <tr>
                        <td><label>Клуб</label></td>
                        <td><input value={nom.club} type="text" maxLength="100" onChange={e => props.onChange("club", e.target.value)} /></td>
                    </tr>  
                    <tr>
                        <td><label>ДЮСШ</label></td>
                        <td><input value={nom.school} type="text" maxLength="100" onChange={e => props.onChange("school", e.target.value)} /></td>
                    </tr>                                                                                  
                    <tr>
                        <td><label>Розряд</label></td>
                        <td><select value={nom.level} onChange={e => props.onChange("level", e.target.value)}>{levelList}</select></td>
                    </tr>
                    <tr>
                        <td><label>Дивізіон{(!validateDivision().isValid)? validateDivision().text : ""}</label></td>
                        <td><select value={nom.division} onChange={e => props.onChange("division", e.target.value)} disabled={JSON.parse(info.isCup)}>{divisionsList}</select></td>
                    </tr>
                    {ageGroups}
                    <tr><td></td><td>{validation.isSelectValid(nom.weightClass)}</td></tr>
                    <tr>
                        <td><label>Вагова категорія</label></td>
                        <td>
                            <select value={nom.weightClass} onChange={e => props.onChange("weightClass", e.target.value)} >
                                <option id="0" value="0">[не обрано]</option>
                                {(nom.division === "juniors" || nom.division === "subjuniors")? 
                                
                                    (nom.division === "subjuniors" && JSON.parse(info.isJun))? subWeightClassList : weightClassList 
                                : shortWCList }
                            </select>
                        </td>
                    </tr>
                    <tr><td></td><td>{validation.hasComma(st.squat)}</td></tr>
                    <tr>
                        <td><label>Присідання</label></td>
                        <td><input value={st.squat} type="number" maxLength="10" onChange={e => props.onChange("squat", e.target.value)} disabled={st.isDisabled} /></td>
                    </tr>
                    <tr><td></td><td>{validation.hasComma(nom.benchpress)}</td></tr>
                    <tr>
                        <td><label>Жим</label></td>
                        <td><input value={nom.benchpress} type="number" maxLength="10" onChange={e => props.onChange("benchpress", e.target.value)} /></td>
                    </tr>
                    <tr><td></td><td>{validation.hasComma(dl.deadlift)}</td></tr>
                    <tr>
                        <td><label>Тяга</label></td>
                        <td><input value={dl.deadlift} type="number" maxLength="10" onChange={e => props.onChange("deadlift", e.target.value)} disabled={dl.isDisabled} /></td>
                    </tr>
                    <tr>
                        <td><label>Сума</label></td>
                        <td><input value={nom.total} type="number" readOnly={true} /></td>
                    </tr>
                    <tr>
                        <td><label>Тренер(и)</label></td>
                        <td><textarea value={nom.coaches} onChange={e => props.onChange("coaches", e.target.value)} maxLength="300" /></td>
                    </tr>                      
                    <tr>
                        <td><label>Особисто</label></td>
                        <td><input checked={JSON.parse(nom.personally)} type="checkbox" onChange={e => props.onChange("personally", e.target.checked ? 1:0)} /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="formFooter">
                <div className="form-footer-tab left">
                    <button type="button" className="footer-button success" onClick={() => props.onSave()} disabled={!validateDivision().isValid}>Зберегти</button>
                </div>
                <div className="form-footer-tab right">
                <button type="button" className="footer-button danger" onClick={() => props.onClose()}>Скасувати</button>
                </div>
            </div>
        </form>
    </div>);
}
export default LifterForm;