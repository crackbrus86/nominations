import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";
import classnames from "classnames";

const NomGrid = (props) => {
    if(!props.game) return null;
    var divisions = [
        {
            id: "subjuniors",
            titleM: "Юнаки",
            titleF: "Дівчата",
            items: props.nominations.filter(nom => nom.division === "subjuniors")
        },
        {
            id: "juniors",
            titleM: "Юніори",
            titleF: "Юніорки",
            items: props.nominations.filter(nom => nom.division === "juniors")
        },
        {
            id: "seniors",
            titleM: "Чоловіки",
            titleF: "Жінки",
            items: props.nominations.filter(nom => nom.division === "seniors")
        },   
        {
            id: "masters1",
            titleM: "Ветерани 1",
            titleF: "Ветерани 1",
            items: props.nominations.filter(nom => nom.division === "masters1")
        },   
        {
            id: "masters2",
            titleM: "Ветерани 2",
            titleF: "Ветерани 2",
            items: props.nominations.filter(nom => nom.division === "masters2")
        },  
        {
            id: "masters3",
            titleM: "Ветерани 3",
            titleF: "Ветерани 3",
            items: props.nominations.filter(nom => nom.division === "masters3")
        },  
        {
            id: "masters4",
            titleM: "Ветерани 4",
            titleF: "Ветерани 4",
            items: props.nominations.filter(nom => nom.division === "masters4")
        }                                                   
    ];
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
            title: "Дата народження",
            field: "born",
            width: "75px"
        },
        {
            title: "Вагова категорія",
            field: "wClass",
            width: "*"
        },
        {
            title: "Розряд",
            field: "level",
            width: "*"
        },  
        {
            title: "Місто",
            field: "city",
            width: "*"
        },  
        {
            title: "ФСТ",
            field: "fst",
            width: "*"
        },  
        {
            title: "Клуб",
            field: "club",
            width: "*"
        },   
        {
            title: "ДЮСШ",
            field: "school",
            width: "*"
        }                                                              
                    
    ];
    var results = []
    if(props.game.typeId === "1"){
        results = [{
                title: "Присідання",
                field: "squat",
                width: "45px",
                class: "al-right"
            },
            {
                title: "Жим",
                field: "benchpress",
                width: "45px",
                class: "al-right"
            },
            {
                title: "Тяга",
                field: "deadlift",
                width: "45px",
                class: "al-right"
            },
            {
                title: "Сума",
                field: "total",
                width: "*",
                class: "al-right exercise-total"
            }];
    } else{
        results = [{
                title: "Жим",
                field: "benchpress",
                width: "45px",
                class: "al-right exercise-total"
            }];
    }
    var coachesCol = [{
        title: "Тренер(и)",
        field: "coaches",
        width: "*"
    }]
    var gridColumns = columns.concat(results);
    gridColumns = gridColumns.concat(coachesCol);
    var info = props.game;
    var f = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 15);
    var bm7 = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 10);    
    var controls = [];
    if((+new Date()) <= f){
        controls.push({
            title: "",
            field: "id",
            button: "edit",
            tooltip: "Редагувати",
            width: "30px",
            action: (e) => {
                props.onLifterEdit(e.target.dataset["rel"]);
            }            
        })
    }
    if((+new Date()) <= bm7){
        controls.push({
            title: "",
            field: "id",
            button: "delete",
            tooltip: "Видалити",
            width: "30px",
            action: (e) => {
                props.onDelete(e.target.dataset["rel"]);
            }            
        })
    }

    if(controls.length){
        gridColumns = gridColumns.concat(controls);
    }
    var getAgeCat = (bdate) => {
        var year = parseInt(new Date().getFullYear());
        var born = new Date(bdate).getFullYear();
        var diff = year - born;
        if(diff >= 12 && diff <= 13) return "I група (" + parseInt(year-13) + " - " + parseInt(year-12) + "р.н.)";
        if(diff >= 14 && diff <= 15) return "II група (" + parseInt(year-15) + " - " + parseInt(year-14) + "р.н.)";
        if(diff >= 16 && diff <= 18) return "III група (" + parseInt(year-18) + " - " + parseInt(year-16) + "р.н.)";
        if(diff >= 19 && diff <= 23) return "IV група (" + parseInt(year-23) + " - " + parseInt(year-19) + "р.н.)";
        return null;
    }    
    var tables = divisions.map(division => { 
        if(division.items.length) {
            var countOfLifters = division.items.length;
            var countOfPersonally = 0;
            var countOfTeam = 0;
            var cropZero = val => {
                return (val[(val.length - 1)] === "0")? val.slice(0, val.length - 1) : val;
            }
            var divName = (props.game.gender === "male")? division.titleM : division.titleF;
            var items = division.items.map(item => {
                var rowItem = {};
                
                if(item.personally && JSON.parse(item.personally)) countOfPersonally++;
                countOfTeam = countOfLifters - countOfPersonally;
                rowItem.personally = (item.personally && JSON.parse(item.personally))? <sup title="Особисто">О</sup> : null;
                rowItem.outOfContest = (item.outOfContest && JSON.parse(item.outOfContest)) ? <sup title="Поза конкурсом">ПК</sup> : null;
                rowItem.id = item.id;
                const status = JSON.parse(item.status);
                var statusTitle = status ? "Підтверджено" : "Очікує підтвердження";
                var statusClass = status ? "fa fa-check status-mark status-ok" : "fa fa-question status-mark status-pending";
                rowItem.status = (<span className={classnames(statusClass, { 'with-warning': !status && !!item.comment })} title={statusTitle}>
                    { !status && !!item.comment && (
                        <i 
                            className="fa fa-exclamation-triangle warning"
                            title={item.comment}
                            onClick={(e) => props.onShowTooltip(item.comment, e)}
                        />
                    )}
                </span>);
                rowItem.number = "";
                rowItem.fullName = item.surname + " " + item.name;
                rowItem.fullName = (item.mName)? rowItem.fullName + " " + item.mName : rowItem.fullName;
                rowItem.fullName = rowItem.fullName.toUpperCase();
                rowItem.born = moment(new Date(item.born)).format("DD.MM.YYYY");
                rowItem.level = item.level;
                rowItem.city = item.city.toUpperCase();
                rowItem.fst = item.fst.toUpperCase();
                rowItem.club = item.club.toUpperCase();
                rowItem.school = item.school.toUpperCase();
                rowItem.coaches = item.coaches.toUpperCase();
                rowItem.wClass = item.wClass;
                if((division.id === "subjuniors" || division.id === "juniors") && JSON.parse(props.game.isJun)) {
                    rowItem.ageCat = getAgeCat(item.born);
                }
                if(props.game.typeId === "1"){
                    rowItem.squat = cropZero(item.squat);
                    rowItem.deadlift = cropZero(item.deadlift);
                    rowItem.total = cropZero(item.total);
                }
                rowItem.benchpress = cropZero(item.benchpress);
                return rowItem;
            });
            items.sort((a,b) => (parseInt(a.wClass.replace("-","").replace("+","")) - parseInt(b.wClass.replace("-","").replace("+",""))));
            items = items.map(item => {
                const currentWeightClass = props.weightClasses.find(x => x.name === item.wClass);
                item.wClass = !!currentWeightClass && currentWeightClass.hide 
                ? <span className='issue' title='!!!Увага!!! Дана категорія є застарілою!'>
                        <i className='fa fa-warning'></i>{item.wClass}
                    </span> 
                : item.wClass;
                return item;
            })
            if(props.game.typeId === "1"){
                items.sort((a,b) => (parseFloat(b.total) - parseFloat(a.total)));  
            }else{
                items.sort((a,b) => (parseFloat(b.benchpress) - parseFloat(a.benchpress))); 
            }            
            var counter = 1;
            items.map(item => {
                item.number = <div>{item.outOfContest ? item.outOfContest : item.personally}{counter++}</div>;
            });
            if((division.id === "subjuniors" || division.id === "juniors") && JSON.parse(props.game.isJun) && gridColumns[4].field != "ageCat"){
                gridColumns.splice(4, 0, {
                    title: "Вікова група",
                    field: "ageCat",
                    width: "*"
                });
            }
            return (<div key={division.id}>
                <div key={division.id} className="division-head">Дивізіон "{divName}"</div>
                <Grid data={{columns: gridColumns, rows: items}} />
                <div className="division-counters">У дивізіоні <strong>{countOfLifters}</strong> спортсменів (в команді: <strong>{countOfTeam}</strong>, особисто: <strong>{countOfPersonally}</strong>)</div>
            </div>)
        }
    });

    if(!props.nominations.length) tables = (<div className="empty-nomination"><p>Жодної номінації спортсмена не було створено</p></div>);
    return (<div className="nom-grid-wrap">
        <h4>Список номінацій спортсменів</h4>
        {tables}</div>);
}
export default NomGrid;