import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const NomGrid = (props) => {
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
        // {
        //     title: "Статус",
        //     field: "status",
        //     width: "*"
        // }, 
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
            title: "Вагова категорія",
            field: "wClass",
            width: "*"
        }                          
                    
    ];
    var results = []
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
    var gridColumns = columns.concat(results);
    var info = props.game;
    var f = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 11);
    var bm7 = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 8);    
    var controls = [];
    if((+new Date()) <= f){
        controls.push({
            title: "",
            field: "id",
            button: "edit",
            width: "*",
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
            width: "*",
            action: (e) => {
                props.onDelete(e.target.dataset["rel"]);
            }            
        })
    }

    if(controls.length){
        gridColumns = gridColumns.concat(controls);
    }
    var tables = divisions.map(division => { 
        if(division.items.length) {
            var countOfLifters = division.items.length;
            var countOfReserve = 0;
            var countOfTeam = 0;
            var divName = (props.game.gender === "male")? division.titleM : division.titleF;
            var items = division.items.map(item => {
                var rowItem = {};
                if(item.reserve && JSON.parse(item.reserve)) countOfReserve++;
                countOfTeam = countOfLifters - countOfReserve;
                rowItem.reserve = (item.reserve && JSON.parse(item.reserve))? <sup>R</sup> : null;
                rowItem.id = item.id;
                // rowItem.status = (<input type="checkbox" checked={JSON.parse(item.status)} data-rel={item.id} 
                // onChange={e => {props.onChangeStatus(e.target.dataset["rel"], !JSON.parse(item.status))}} />);
                rowItem.number = "";
                rowItem.fullName = item.surname + " " + item.name;
                rowItem.born = new Date(item.born).getFullYear();
                rowItem.wClass = item.wClass;
                if(props.game.typeId === "1"){
                    rowItem.squat = item.squat;
                    rowItem.deadlift = item.deadlift;
                    rowItem.total = item.total;
                }
                rowItem.benchpress = item.benchpress;
                return rowItem;
            });
            items.sort((a,b) => (parseInt(a.wClass.replace("-","").replace("+","")) - parseInt(b.wClass.replace("-","").replace("+",""))));
            if(props.game.typeId === "1"){
                items.sort((a,b) => (parseInt(a.total) - parseInt(b.total)));  
            }else{
                items.sort((a,b) => (parseInt(a.benchpress) - parseInt(b.benchpress))); 
            }            
            var counter = 1;
            items.map(item => {
                item.number = <div>{item.reserve}{counter++}</div>;
            });
            return (<div key={division.id}>
                <div key={division.id} className="division-head">Дивізіон "{divName}"</div>
                <Grid data={{columns: gridColumns, rows: items}} />
                <div className="division-counters">У дивізіоні <strong>{countOfLifters}</strong> спортсменів (в команді: <strong>{countOfTeam}</strong>, в резерві: <strong>{countOfReserve}</strong>)</div>
            </div>)
        }
    });

    if(!props.nominations.length) tables = (<div className="empty-nomination"><p>Жодної номінації спортсмена не було створено</p></div>);
    return (<div className="nom-grid-wrap">
        <h4>Список номінацій спортсменів</h4>
        {tables}</div>);
}
export default NomGrid;