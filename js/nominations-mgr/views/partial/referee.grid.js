import React from "react";
import Grid from "../../../components/grid/grid";

const RefGrid = (props) => {
    if(!props.game) return null;
    var refCategories = [{value: "category1", text: "Кат. І"},{value: "category2", text: "Кат. ІІ"},{value: "national", text: "Нац."}];
    var columns = [
        {
            title: "#",
            field: "number",
            width: "*"
        },
        {
            title: "Ім'я",
            field: "fullName",
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
    columns = columns.concat(controls);
    var counter = 1;
    var referees = props.nominations.map(x => {
        var referee = {};
        referee.id = x.id;
        referee.number = counter++;
        referee.fullName = x.surname + " " + x.firstName;
        referee.refCategory = refCategories.filter(r => r.value === x.refCategory)[0].text;
        referee.refRemark = x.refRemark;
        return referee;
    });
    referees.sort();
    return (<div>
        <h4>Список суддів</h4>
        <Grid data={{columns: columns, rows: referees}} />
    </div>);
}
export default RefGrid;