import React from "react";
import Grid from "../../../components/grid/grid";

const OfficialGrid = (props) => {
    if(!props.game) return null;
    var duties = [{value: "assistantCoach", text: "Асистент тренера"}, {value: "coach", text: "Тренер"}, {value: "doctor", text: "Лікар"}, 
    {value: "headCoach", text: "Головний тренер"}, {value: "official", text: "Офіційна особа"}, {value: "physiotherapist", text: "Фізіотерапевт"}, 
    {value: "unknown", text: "Невідомо"}];
    var columns = [
        {
            title: "#",
            field: "number",
            width: "28px",
            class: "al-right"            
        },
        {
            title: "Ім'я",
            field: "fullName",
            width: "*"
        },
        {
            title: "Обов'язки",
            field: "duty",
            width: "*"
        }                
    ];
    var controls = [        {
        title: "",
        field: "id",
        button: "edit",
        width: "*",
        action: (e) => {
            props.onOfficialEdit(e.target.dataset["rel"]);
        }
    },
    {
        title: "",
        field: "id",
        button: "delete",
        width: "*",
        action: (e) => {
            props.onDelete(e.target.dataset["rel"]);
        }
    }];
    var info = props.game;
    var bm7 = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 10);  
    if((+new Date()) <= bm7) columns = columns.concat(controls);
    var officials = props.nominations.map(x => {
        var official = {};
        official.id = x.id;
        official.number = "";
        official.fullName = x.surname + " " + x.firstName;
        official.duty = duties.filter(d => d.value === x.duty)[0].text;
        return official;
    });
    officials.sort();
    var counter = 1;
    officials.map(official => {
        official.number = counter++;
    })
    var table = <Grid data={{columns: columns, rows: officials}} />;
    if(!props.nominations.length) table = (<div className="empty-nomination"><p>Жодної номінації офіційної особи не було створено</p></div>);
    return (<div className="nom-grid-wrap">
        <h4>Список офіційних осіб</h4>
        {table}
    </div>)
}
export default OfficialGrid;