import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const LiftersGrid = (props) => {
    if(!props.game) return null;
    if(JSON.parse(props.game.isJun)) return null;
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
            width: "250px"
        },
        {
            title: "Дата народження",
            field: "born",
            width: "75px"
        },
        {
            title: "Розряд",
            field: "level",
            width: "40px"
        },         
        {
            title: "Область",
            field: "team",
            width: "50px"
        }, 
        {
            title: "Місто",
            field: "city",
            width: "100px"
        },  
        {
            title: "ФСТ",
            field: "fst",
            width: "100px"
        },  
        {
            title: "Клуб",
            field: "club",
            width: "100px"
        },   
        {
            title: "ДЮСШ",
            field: "school",
            width: "100px"
        }                                   
                    
    ];
    var results = [];
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
                width: "45px",
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
    }];
    var controls = [
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
    var gridColumns = columns.concat(results);
    gridColumns = gridColumns.concat(coachesCol);
    gridColumns = gridColumns.concat(controls);
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
    var weightClassSorting = (a,b) => {
        var tmpA = parseInt(a.name.replace("-","").replace("+",""));
        var tmpB = parseInt(b.name.replace("-","").replace("+",""));
        if(a.name.indexOf("+") >= 0) tmpA += 1;
        if(b.name.indexOf("+") >=0)  tmpB +=1;
        return tmpA - tmpB;
    }
    
    var lifters = divisions.map(division => {
        if(division.items.length){
            var divName = (props.game.gender === "male")? division.titleM : division.titleF;
            var weightClasses = props.weightClasses;
            weightClasses.sort((a,b) => (weightClassSorting(a,b)));
            var wcl = weightClasses.map(w => {
                var wItems = division.items.filter(x => x.wId === w.id);
                var cropZero = val => {
                    return (val[(val.length - 1)] === "0")? val.slice(0, val.length - 1) : val;
                }
                if(wItems.length){
                    var items = wItems.map(i => {
                        var rowItem = {};
                        rowItem.id = i.id;
                        rowItem.personally = (i.personally && JSON.parse(i.personally))? <sup title="Особисто">О</sup> : null;
                        rowItem.number = "";
                        rowItem.status = (<input type="checkbox" checked={JSON.parse(i.status)} data-rel={i.id} 
                        onChange={e => {props.onChangeStatus(e.target.dataset["rel"], !JSON.parse(i.status))}} />);
                        rowItem.fullName = i.surname + " " + i.name;
                        rowItem.fullName = (i.mName)? rowItem.fullName + " " + i.mName : rowItem.fullName;
                        rowItem.fullName = rowItem.fullName.toUpperCase();
                        rowItem.born = moment(new Date(i.born)).format("DD.MM.YYYY");
                        var region = props.regions.filter(reg => reg.id === i.team)[0]
                        rowItem.team = region.shortName.toUpperCase() || region.name.toUpperCase();
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
                        item.number = <div>{item.personally}{counter++}</div>;;
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