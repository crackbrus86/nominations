import React from "react";
import moment from "moment";

const CompInfo = (props) => {
    if(!props.compInfo) return null;
    var info = props.compInfo;
    var date = moment(info.startDate).locale("uk").format("DD MMM") + "-" + moment(info.endDate).locale("uk").format("DD MMM") + ", " + moment(info.endDate).format("YYYY");
    var p = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 22);
    var f = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 11);
    var bm7 = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 8);
    var mc = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 1);
    var status = null;
    var statusColor = null;
    if((+new Date()) <= p){
        status = "Попередня номінація";
        statusColor = "#7AB800";
    }else if(p < (+new Date()) && (+new Date()) <= f){
        status = "Остаточна номінація";
        statusColor = "#0582FF";
    }else if(f < (+new Date()) && (+new Date()) <= mc){
        status = "Перед мандатною комісією";
        statusColor = "#CC0033";
    }else{
        status = "Архів";
        statusColor = "#8E8E48";
    }    
    return (<div>
        <div className="comp-info-header">
            <p className="info-title">{info.name}</p>
            <p className="info-location">{info.location}</p>
            <p className="info-date">{date}</p>
        </div>
        <div className="comp-info-status">
            <p className="status">Статус: <span style={{color: statusColor}}>{String(status).toUpperCase()}</span></p>
            <p>Попередня номінація: {moment(p).locale("uk").format("DD.MM.YYYY")}</p>
            <p>Остаточна номінація: {moment(f).locale("uk").format("DD.MM.YYYY")}</p>
            <p>7 днів до мандатної комісії: {moment(bm7).locale("uk").format("DD.MM.YYYY")}</p>
            <p>Мандатна комісія: {moment(mc).locale("uk").format("DD.MM.YYYY")}</p>
        </div>
    </div>);
}
export default CompInfo;