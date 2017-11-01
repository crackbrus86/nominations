import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const CompGrid = (props) => {
    if(!props.data.length) return null;
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
        var p = (new Date(item.startDate)).setDate((new Date(item.startDate)).getDate() - 21);
        var f = (new Date(item.startDate)).setDate((new Date(item.startDate)).getDate() - 10);
        var mc = (new Date(item.startDate)).setDate((new Date(item.startDate)).getDate() - 1);
        var status = "";
        if((+new Date()) <= p){
            status = <div className="status-code" style={{backgroundColor: "#BDF4BD"}}>{"Попередня"}</div>;
        }else if(p < (+new Date()) && (+new Date()) <= f){
            status = <div className="status-code" style={{backgroundColor: "#FEF0C7"}}>{"Остаточна"}</div>;
        }else if(f < (+new Date()) && (+new Date()) <= mc){
            status = <div className="status-code" style={{backgroundColor: "#FFDFDF"}}>{"Мандатна комісія"}</div>;
        }else{
            status = <div className="status-code" style={{backgroundColor: "#B2D9FF"}}>{"Архів"}</div>;
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