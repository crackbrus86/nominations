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
            title: "Область",
            field: "team",
            width: "*"
        },        
        {
            title: "Обов'язки",
            field: "duty",
            width: "*"
        }                
    ];
    var counter = 1;
    var officials = props.nominations.map(x => {
        var official = {};
        official.id = x.id;
        official.number = counter++;
        official.fullName = x.surname + " " + x.firstName;
        official.team = props.regions.filter(r => r.id === x.team)[0].name;
        official.duty = duties.filter(d => d.value === x.duty)[0].text;
        return official;
    });
    officials.sort((a,b) => a.team > b.team);
    var table = <Grid data={{columns: columns, rows: officials}} />;
    if(!props.nominations.length) table = (<div className="empty-nomination"><p>Жодної номінації офіційної особи не було створено</p></div>);
    return (<div className="nom-grid-wrap">
        <h4>Список офіційних осіб</h4>
        {table}
    </div>)
}
export default OfficialGrid;