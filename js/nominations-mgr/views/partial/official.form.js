import React from "react";
import moment from "moment";

const OfficialForm = (props) => {
    if(props.nomination.type !== "official") return null;
    var info = props.compInfo;
    var date = moment(info.startDate).locale("uk").format("DD MMM") + "-" + moment(info.endDate).locale("uk").format("DD MMM") + ", " + moment(info.endDate).format("YYYY");
    var nom = props.nomination;
    var regionsList = props.regions.map(region => <option key={region.id} value={region.id}>{region.name}</option>);
    var duties = [{value: "assistantCoach", text: "Асистент тренера"}, {value: "coach", text: "Тренер"}, {value: "doctor", text: "Лікар"}, 
    {value: "headCoach", text: "Головний тренер"}, {value: "official", text: "Офіційна особа"}, {value: "physiotherapist", text: "Фізіотерапевт"}, 
    {value: "unknown", text: "Невідомо"}];
    var dutiesList = duties.map(duty => <option key={duty.value} value={duty.value}>{duty.text}</option>);
    var refCategories = [{value: "category1", text: "Категорія І"},{value: "category2", text: "Категорія ІІ"},{value: "national", text: "Національна"}];
    var refCatList = refCategories.map(cat => <option key={cat.value} value={cat.value}>{cat.text}</option>);
    return (<div>
        <div className="form-header">
            <h3>Додати офіційну особу до номінації</h3>
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
                        <td><label>Область</label></td>
                        <td><select value={nom.team} disabled={true}>{regionsList}</select></td>
                    </tr>
                    <tr className="another-position">
                        <td><label>Є офіційною особою</label></td>
                        <td><input checked={JSON.parse(nom.isOfficial)} type="checkbox" onChange={e => props.onChange("isOfficial", e.target.checked)} /></td>
                    </tr>
                    <tr className="another-position">
                        <td><label>на посаді</label></td>
                        <td><select value={nom.duty} onChange={e => props.onChange("duty", e.target.value)} >{dutiesList}</select></td>
                    </tr>
                    <tr>
                        <td><label>Є суддею</label></td>
                        <td><input checked={JSON.parse(nom.isReferee)} type="checkbox" onChange={e => props.onChange("isReferee", e.target.checked)} /></td>
                    </tr>
                    <tr>
                        <td><label>категорії</label></td>
                        <td><select value={nom.refCategory} onChange={e => props.onChange("refCategory", e.target.value)} >{refCatList}</select></td>
                    </tr>   
                    <tr>
                        <td><label>Примітки судді</label></td>
                        <td><textarea value={nom.refRemark} onChange={e => props.onChange("refRemark", e.target.value)} maxLength="300" /></td>
                    </tr>                                                                                                                                                          
                    </tbody>
                </table>
            </div>
            <div className="formFooter">
                <div className="form-footer-tab left">
                    <button type="button" className="footer-button success" onClick={() => props.onSave()}>Зберегти</button>
                </div>
                <div className="form-footer-tab right">
                <button type="button" className="footer-button danger" onClick={() => props.onClose()}>Скасувати</button>
                </div>
            </div>            
        </form>    
    </div>);
}
export default OfficialForm;