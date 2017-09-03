import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const CompGrid = (props) => {
    var columns = [
        {
            title: "Змагання",
            field: "name",
            width: "500px",
            rel: "id",
            action: (e) => {
                props.onEdit(e.target.dataset["rel"]);
            }
        }, 
        {
            title: "Дата",
            field: "date",
            width: "*"
        },
        {
            title: "Місце проведення",
            field: "location",
            width: "*"
        },
        {
            title: "Попередня",
            field: "preliminary",
            width: "*"
        },
        {
            title: "Остаточна",
            field: "final",
            width: "*"
        }, 
        {
            title: "Статус",
            field: "status",
            width: "*"
        },                              
                    
    ];   
    var rows = props.data.map(item => {
        var p = (new Date(item.startDate)).setDate((new Date(item.startDate)).getDate() - 22);
        var f = (new Date(item.startDate)).setDate((new Date(item.startDate)).getDate() - 11);
        var status = "";
        if((+new Date()) <= p){
            status = "Попередня";
        }else if(p < (+new Date()) && (+new Date()) <= f){
            status = "Остаточна";
        }else{
            status = "Мандатна комісія";
        }
        return{
            id: item.id,
            name: item.name,
            location: item.location,
            date: moment(item.startDate).locale("uk").format("DD.MMM") + "-" + moment(item.endDate).locale("uk").format("DD.MMM") + " " + moment(item.endDate).format("YYYY"),
            preliminary: moment(p).locale("uk").format("MMM DD, YYYY "),
            final:  moment(f).locale("uk").format("MMM DD, YYYY "),
            status: status
        }
    });
    return(<div><Grid data={{columns, rows}} /></div>) 
}
export default CompGrid;