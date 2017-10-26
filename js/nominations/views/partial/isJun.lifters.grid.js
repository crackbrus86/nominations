import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

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
            class: "al-right"
        },
        {
            title: "Ім'я",
            field: "fullName",
            width: "150px"
        },
        {
            title: "Рік народження",
            field: "born",
            width: "*"
        },
        {
            title: "Розряд",
            field: "level",
            width: "*"
        },         
        {
            title: "Область",
            field: "team",
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
    var results = [];
    if(props.game.typeId === "1"){
        results = [{
                title: "Присідання",
                field: "squat",
                width: "*",
                class: "al-right"
            },
            {
                title: "Жим",
                field: "benchpress",
                width: "*",
                class: "al-right"
            },
            {
                title: "Тяга",
                field: "deadlift",
                width: "*",
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
                width: "*",
                class: "al-right exercise-total"
            }];
    } 
    var coachesCol = [{
        title: "Тренер(и)",
        field: "coaches",
        width: "*"
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

    var lifters = divisions.map(d => {
        if(d.items.length){
            var divName = (props.game.gender === "male")? d.titleM : d.titleF;
            var weightClasses = props.weightClasses;
            weightClasses.sort((a,b) => (parseInt(a.name.replace("-","").replace("+","")) - parseInt(b.name.replace("-","").replace("+",""))));
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
                                rowItem.reserve = (i.reserve && JSON.parse(i.reserve))? <sup>R</sup> : null;
                                rowItem.number = "";
                                rowItem.fullName = i.surname + " " + i.name;
                                rowItem.fullName = (i.mName)? rowItem.fullName + " " + i.mName : rowItem.fullName;
                                rowItem.born = new Date(i.born).getFullYear();
                                rowItem.team = props.regions.filter(reg => reg.id === i.team)[0].name;
                                rowItem.level = i.level;
                                rowItem.city = i.city;
                                rowItem.fst = i.fst;
                                rowItem.club = i.club;
                                rowItem.school = i.school;
                                rowItem.coaches = i.coaches;                                             
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
                                item.number = <div>{item.reserve}{counter++}</div>;;
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