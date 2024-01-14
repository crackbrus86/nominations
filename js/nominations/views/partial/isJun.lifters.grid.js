import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";
import classnames from 'classnames';

const IsJunLiftersGrid = (props) => {
    if(!props.game) return null;
    if(!JSON.parse(props.game.isJun)) return null;
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
        }                                                  
    ];
    var columns = [
        {
            title: "#",
            field: "number",
            width: "28px",
            class: "al-right lgr-no"
        },
        {
            title: "Статус",
            field: "status",
            width: "45px",
            class: "lgr-status"
        },         
        {
            title: "Ім'я",
            field: "fullName",
            width: "150px",
            class: "lgr-name"
        },
        {
            title: "Рік народження",
            field: "born",
            width: "75px",
            class: "lgr-born"
        },
        {
            title: "Розряд",
            field: "level",
            width: "*",
            class: "lgr-level"
        },         
        {
            title: "Область",
            field: "team",
            width: "35px",
            class: "lgr-team"
        }, 
        {
            title: "Місто",
            field: "city",
            width: "*",
            class: "lgr-city"
        },  
        {
            title: "ФСТ",
            field: "fst",
            width: "*",
            class: "lgr-fst"
        },  
        {
            title: "Клуб",
            field: "club",
            width: "*",
            class: "lgr-club"
        },   
        {
            title: "ДЮСШ",
            field: "school",
            width: "*",
            class: "lgr-school"
        }                                   
                    
    ];
    var results = [];
    if(props.game.typeId === "1"){
        results = [{
                title: "Присід.",
                field: "squat",
                width: "45px",
                class: "al-right lgr-squat"
            },
            {
                title: "Жим",
                field: "benchpress",
                width: "45px",
                class: "al-right lgr-press"
            },
            {
                title: "Тяга",
                field: "deadlift",
                width: "45px",
                class: "al-right lgr-lift"
            },
            {
                title: "Сума",
                field: "total",
                width: "*",
                class: "al-right exercise-total lgr-total"
            }];
    } else{
        results = [{
                title: "Жим",
                field: "benchpress",
                width: "45px",
                class: "al-right exercise-total lgr-press"
            }];
    } 
    var coachesCol = [{
        title: "Тренер(и)",
        field: "coaches",
        width: "*",
        class: "lgr-coaches"
    }];
    var gridColumns = columns.concat(results);
    gridColumns = gridColumns.concat(coachesCol);
    var getAgeCatByDate = (bdate) => {
        var year = parseInt(new Date().getFullYear());
        var born = new Date(bdate).getFullYear();
        var diff = year - born;
        if(diff >= 12 && diff <= 13) return {id: 1, name: "I група (" + parseInt(year-13) + " - " + parseInt(year-12) + "р.н.)"};
        if(diff >= 14 && diff <= 15) return {id: 2, name: "II група (" + parseInt(year-15) + " - " + parseInt(year-14) + "р.н.)"};
        if(diff >= 16 && diff <= 18) return {id: 3, name: "III група (" + parseInt(year-18) + " - " + parseInt(year-16) + "р.н.)"};
        if(diff >= 19 && diff <= 23) return {id: 4, name: "IV група (" + parseInt(year-23) + " - " + parseInt(year-19) + "р.н.)"};
        return {id: null};
    } 

    var getAgeCatByNumber = (n) => {
        var year = parseInt(new Date().getFullYear());
        if(n == 1) return {id: 1, name: "I група (" + parseInt(year-13) + " - " + parseInt(year-12) + "р.н.)"};
        if(n == 2) return {id: 2, name: "II група (" + parseInt(year-15) + " - " + parseInt(year-14) + "р.н.)"};
        if(n == 3) return {id: 3, name: "III група (" + parseInt(year-18) + " - " + parseInt(year-16) + "р.н.)"};
        if(n == 4) return {id: 4, name: "IV група (" + parseInt(year-23) + " - " + parseInt(year-19) + "р.н.)"};
        return null;        
    }

    var ageGroups = [1,2,3,4];

    var weightClassSorting = (a,b) => {
        var tmpA = parseInt(a.name.replace("-","").replace("+",""));
        var tmpB = parseInt(b.name.replace("-","").replace("+",""));
        if(a.name.indexOf("+") >= 0) tmpA += 1;
        if(b.name.indexOf("+") >=0)  tmpB +=1;
        return tmpA - tmpB;
    }

    var lifters = divisions.map(d => {
        if(d.items.length){
            var divName = (props.game.gender === "male")? d.titleM : d.titleF;
            var weightClasses = props.weightClasses;
            weightClasses.sort((a,b) => (weightClassSorting(a,b)));
            var ag = ageGroups.map(i => {
                var ac = d.items.filter(x => getAgeCatByDate(x.born).id == getAgeCatByNumber(i).id);
                if(ac.length){
                    var wcl = weightClasses.map(w => {
                        var wItems = ac.filter(x => x.wId === w.id);
                        var cropZero = val => {
                            return (val[(val.length - 1)] === "0")? val.slice(0, val.length - 1) : val;
                        }
                        if(wItems.length){
                            var items = wItems.map(i => {
                                var rowItem = {};
                                rowItem.personally = (i.personally && JSON.parse(i.personally))? <sup title="Особисто">О</sup> : null;
                                rowItem.outOfContest = (i.outOfContest && JSON.parse(i.outOfContest)) ? <sup title="Поза конкурсом">ПК</sup> : null;
                                rowItem.number = "";
                                const status = JSON.parse(i.status);
                                var statusTitle = status ? "Підтверджено" : "Очікує підтвердження";
                                var statusClass = status ? "fa fa-check status-mark status-ok" : "fa fa-question status-mark status-pending";
                                rowItem.status = (<span className={classnames(statusClass, {'with-warning': !status && !!i.comment})} title={statusTitle}>
                                    { !status && !!i.comment && <i className="fa fa-exclamation-triangle warning" title={i.comment} /> }
                                </span>);                                   
                                rowItem.fullName = i.surname + " " + i.name;
                                rowItem.fullName = (i.mName)? rowItem.fullName + " " + i.mName : rowItem.fullName;
                                rowItem.fullName = rowItem.fullName.toUpperCase();
                                rowItem.born = moment(new Date(i.born)).format("DD.MM.YYYY");
                                var region = props.regions.filter(reg => reg.id === i.team)[0];
                                rowItem.team = (!!region.shortName) ? region.shortName.toUpperCase() : region.name.toUpperCase();
                                rowItem.level = i.level;
                                rowItem.city = i.city.toUpperCase();
                                rowItem.fst = i.fst.toUpperCase();
                                rowItem.club = i.club.toUpperCase();
                                rowItem.school = i.school.toUpperCase();
                                rowItem.coaches = i.coaches.toUpperCase();                                             
                                if(props.game.typeId === "1"){
                                    rowItem.squat = cropZero(i.squat);
                                    rowItem.deadlift = cropZero(i.deadlift);
                                    rowItem.total = cropZero(i.total);
                                }
                                rowItem.benchpress = cropZero(i.benchpress);
                                return rowItem;                        
                            });
                            if(props.game.typeId === "1"){
                                items.sort((a,b) => (parseInt(b.total) - parseInt(a.total)));  
                            }else{
                                items.sort((a,b) => (parseInt(b.benchpress) - parseInt(a.benchpress))); 
                            }
                            var counter = 1;
                            items.map(item => {
                                item.number = <div>{item.outOfContest ? item.outOfContest : item.personally}{counter++}</div>;;
                            });                                          
                            return (<div key={w.id}>
                                <div key={w.id} className="w-class-name">{w.name}</div>
                                <Grid data={{columns: gridColumns, rows: items}} />
                            </div>)                                   
                        }
                    }); 
                    return  (<div key={i}>
                        <div key={i} className="w-class-name">{getAgeCatByNumber(i).name}</div>
                        {wcl}
                    </div>)                     
                }
            });

            return (<div key={d.id} className="division-wrap">
            <div key={d.id} className="division-head">Дивізіон "{divName}"</div>
            {ag}
        </div>)                
        }
    });
    
    if(!props.nominations.length) lifters = (<div className="empty-nomination"><p>Жодної номінації спортсмена не було створено</p></div>);
    return (<div className="nom-grid-wrap">
        {lifters}</div>);      
}
export default IsJunLiftersGrid;