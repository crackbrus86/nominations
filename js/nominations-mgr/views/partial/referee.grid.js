import React from "react";
import Grid from "../../../components/grid/grid";
import classnames from 'classnames';

const RefGrid = (props) => {
    if(!props.game) return null;
    var refCategories = [{value: "category1", text: "МК І"},{value: "category2", text: "МК ІІ"},{value: "national", text: "НК"}, {value: "first", text: "I кат."}, 
    {value: "second", text: "ІІ кат."}];
    var columns = [
        {
            title: "#",
            field: "number",
            width: "28px",
            class: "al-right"
        },
        {
            title: "Статус",
            field: "status",
            width: "45px"
        },           
        {
            title: "Ім'я",
            field: "fullName",
            width: "200px"
        },
        {
            title: "Категорія",
            field: "refCategory",
            width: "50px"
        },
        {
            title: "Примітки",
            field: "refRemark",
            width: "*"
        }                 
    ];
    var controls = [        {
        title: "",
        field: "id",
        button: "edit",
        tooltip: "Редагувати",
        width: "30px",
        action: (e) => {
            props.onOfficialEdit(e.target.dataset["rel"]);
        }
    },
    {
        title: "",
        field: "id",
        button: "delete",
        tooltip: "Видалити",
        width: "30px",
        action: (e) => {
            props.onDelete(e.target.dataset["rel"]);
        }
    }];
    var info = props.game;
    var bm7 = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 10);   
    if((+new Date()) <= bm7) columns = columns.concat(controls);
    var referees = props.nominations.map(x => {
        var referee = {};
        referee.id = x.id;
        const status = JSON.parse(x.status);
        var statusTitle = status ? "Підтверджено" : "Очікує підтвердження";
        var statusClass = status ? "fa fa-check status-mark status-ok" : "fa fa-question status-mark status-pending";        
        referee.status = (<span className={classnames(statusClass, { 'with-warning': !status && !!x.comment })} title={statusTitle}>
            { !status && !!x.comment && (
                <i className="fa fa-exclamation-triangle warning" title={x.comment} onClick={(e) => props.onShowTooltip(x.comment, e)} />
            )}
        </span>);
        referee.number = "";
        referee.fullName = x.surname + " " + x.firstName + " " + x.middleName;
        referee.fullName = referee.fullName.toUpperCase();
        referee.refCategory = refCategories.filter(r => r.value === x.refCategory)[0].text;
        referee.refRemark = x.refRemark;
        return referee;
    });
    referees.sort();
    var counter = 1;
    referees.map(referee => {
        referee.number = counter++;
    })
    var table = <Grid data={{columns: columns, rows: referees}} />;
    if(!props.nominations.length) table = (<div className="empty-nomination"><p>Жодної номінації судді не було створено</p></div>);
    return (<div className="nom-grid-wrap">
        <h4>Список суддів</h4>
        {table}
    </div>);
}
export default RefGrid;