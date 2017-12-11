import React from "react";
import moment from "moment";

const OfficialForm = (props) => {
    if(props.nomination.type !== "official") return null;
    var info = props.compInfo;
    var date = moment(info.startDate).locale("uk").format("DD MMM") + "-" + moment(info.endDate).locale("uk").format("DD MMM") + ", " + moment(info.endDate).format("YYYY");
    var nom = props.nomination;
    var regionsList = props.regions.map(region => <option key={region.id} value={region.id}>{region.name}</option>);
    var refCategories = [{value: "category1", text: "МК І"},{value: "category2", text: "МК ІІ"},{value: "national", text: "НК"}];
    var refCatList = refCategories.map(cat => <option key={cat.value} value={cat.value}>{cat.text}</option>);
    var statusFinal = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 10);
    var isNameDisabled = !((+ new Date()) <= statusFinal);
    return (<div>
        <div className="form-header">
            <h3>Додати суддю до номінації</h3>
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
                        <td><input value={nom.surname} type="text" maxLength="150" onChange={e => props.onChange("surname", e.target.value)} disabled={isNameDisabled} /></td>
                    </tr>
                    <tr>
                        <td><label>Ім'я</label></td>
                        <td><input value={nom.firstName} type="text" maxLength="50" onChange={e => props.onChange("firstName", e.target.value)} disabled={isNameDisabled} /></td>
                    </tr>
                    <tr>
                        <td><label>По-батькові</label></td>
                        <td><input value={nom.middleName} type="text" maxLength="50" onChange={e => props.onChange("middleName", e.target.value)} disabled={isNameDisabled} /></td>
                    </tr>                    
                    <tr>
                        <td><label>Область</label></td>
                        <td><select value={nom.team} disabled={true}>{regionsList}</select></td>
                    </tr>
                    <tr>
                        <td><label>Категорія</label></td>
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