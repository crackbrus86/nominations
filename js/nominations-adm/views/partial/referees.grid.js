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
            title: "Статус",
            field: "status",
            width: "45px"
        },              
        {
            title: "Ім'я",
            field: "fullName",
            width: "150px"
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
        },
        {
            title: "",
            field: "id",
            button: "edit",
            width: "30px",
            action: (e) => {
                props.onEdit(e.target.dataset["rel"]);
            }
        },
        {
            title: "",
            field: "id",
            button: "delete",
            width: "30px",
            action: (e) => {
                props.onDelete(e.target.dataset["rel"]);
            }
        }               
    ];
    var referees = props.nominations.map(x => {
        var referee = {};
        referee.id = x.id;
        referee.number = "";
        referee.status = (<input type="checkbox" checked={JSON.parse(x.status)} data-rel={x.id} 
        onChange={e => {props.onChangeStatus(e.target.dataset["rel"], !JSON.parse(x.status))}} />);   
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