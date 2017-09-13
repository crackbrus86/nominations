import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const LiftersGrid = (props) => {
    if(!props.game) return null;
    var divisions = [
        {
            id: "open",
            titleM: "Відкритий",
            titleF: "Відкритий",
            items: props.nominations.filter(nom => nom.division === "open")
        },
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
            title: "Ім'я",
            field: "fullName",
            width: "220px"
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
    var lifters = divisions.map(division => {
        if(division.items.length){
            var divName = (props.game.gender === "male")? division.titleM : division.titleF;
            var weightClasses = props.weightClasses;
            weightClasses.sort((a,b) => (parseInt(a.name.replace("-","").replace("+","")) - parseInt(b.name.replace("-","").replace("+",""))));
            var wcl = weightClasses.map(w => {
                var wItems = division.items.filter(x => x.wId === w.id);
                var cropZero = val => {
                    return (val[(val.length - 1)] === "0")? val.slice(0, val.length - 1) : val;
                }
                if(wItems.length){
                    var items = wItems.map(i => {
                        var rowItem = {};
                        rowItem.reserve = (i.reserve && JSON.parse(i.reserve))? <sup>R</sup> : null;
                        rowItem.number = "";
                        rowItem.fullName = i.surname + " " + i.name;
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
            return (<div key={division.id} className="division-wrap">
                <div key={division.id} className="division-head">Дивізіон "{divName}"</div>
                {wcl}
            </div>)            
        }
    }); 
    
    if(!props.nominations.length) lifters = (<div className="empty-nomination"><p>Жодної номінації спортсмена не було створено</p></div>);
    return (<div className="nom-grid-wrap">
        {lifters}</div>);    
}
export default LiftersGrid;