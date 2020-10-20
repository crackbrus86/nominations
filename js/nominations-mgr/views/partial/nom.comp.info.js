import React from "react";
import moment from "moment";
import Countdown from "../../../components/countdown/countdown";

const CompInfo = (props) => {
    if(!props.compInfo) return null;
    var info = props.compInfo;
    var date = moment(info.startDate).locale("uk").format("DD MMM") + "-" + moment(info.endDate).locale("uk").format("DD MMM") + ", " + moment(info.endDate).format("YYYY");
    var p = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 30);
    var f = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 15);
    var bm7 = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 10);
    var mc = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate());
    var status = null;
    var statusColor = null;
    var statusEnd = null;
    if((+new Date()) <= p){
        status = "Попередня номінація";
        statusColor = "#7AB800";
        var statusEnd = p;
    }else if(p < (+new Date()) && (+new Date()) <= f){
        status = "Фінальна номінація";
        statusColor = "#0582FF";
        var statusEnd = f;
    }else if(f < (+new Date()) && (+new Date()) <= mc){
        status = "Перед мандатною комісією";
        statusColor = "#CC0033";
        var statusEnd = mc;
    }else{
        status = "Архів";
        statusColor = "#8E8E48";
    }  
    const pLabel = moment(p).subtract(1, "day").locale("uk").format("DD.MM.YYYY")
    const fLabel = moment(f).subtract(1, "day").locale("uk").format("DD.MM.YYYY")
    const bm7Label = moment(bm7).locale("uk").format("DD.MM.YYYY")
    const mcLabel = moment(mc).locale("uk").format("DD.MM.YYYY")   
    return (<div>
        <div className="comp-info-header">
            <p className="info-title">{info.name}</p>
            <p className="info-location">{info.location}</p>
            <p className="info-date">{date}</p>
        </div>
        <div className="comp-info-status">
            <p className="status">Статус: <span style={{color: statusColor}}>{String(status).toUpperCase()}</span></p>
            <Countdown till={statusEnd} />
            <p>Останній день попередньої номінації: {pLabel}</p>
            <p>Останній день фінальної номінації: {fLabel}</p>
            <p>10 днів до мандатної комісії: {bm7Label}</p>
            <p>Мандатна комісія: {mcLabel}</p>
        </div>
    </div>);
}
export default CompInfo;