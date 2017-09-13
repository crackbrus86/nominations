import React from "react";
import Grid from "../../../components/grid/grid";

const RefGrid = (props) => {
    if(!props.game) return null;
    var refCategories = [{value: "category1", text: "МК І"},{value: "category2", text: "МК ІІ"},{value: "national", text: "НК"}];
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
            title: "Категорія",
            field: "refCategory",
            width: "*"
        },
        {
            title: "Примітки",
            field: "refRemark",
            width: "*"
        }                 
    ];
    var referees = props.nominations.map(x => {
        var referee = {};
        referee.id = x.id;
        referee.number = "";
        referee.fullName = x.surname + " " + x.firstName + " " + x.middleName;
        referee.team = props.regions.filter(reg => reg.id === x.team)[0].name;
        referee.refCategory = refCategories.filter(r => r.value === x.refCategory)[0].text;
        referee.refRemark = x.refRemark;
        return referee;
    });
    referees.sort((a,b) => a.team > b.team);
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