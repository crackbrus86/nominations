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
        {
            title: "Статус",
            field: "status",
            width: "*"
        }, 
        {
            title: "#",
            field: "number",
            width: "*"
        },
        {
            title: "Ім'я",
            field: "fullName",
            width: "*"
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
                width: "*"
            },
            {
                title: "Жим",
                field: "benchpress",
                width: "*"
            },
            {
                title: "Тяга",
                field: "deadlift",
                width: "*"
            },
            {
                title: "Сума",
                field: "total",
                width: "*"
            }];
    } else{
        results = [{
                title: "Жим",
                field: "benchpress",
                width: "*"
            }];
    }
    var gridColumns = columns.concat(results);
    var controls = [        {
        title: "",
        field: "id",
        button: "edit",
        width: "*",
        action: (e) => {
            props.onLifterEdit(e.target.dataset["rel"]);
        }
    },
    {
        title: "",
        field: "id",
        button: "delete",
        width: "*",
        action: (e) => {
            // props.onDelete(e.target.dataset["rel"]);
        }
    }];
    gridColumns = gridColumns.concat(controls);
    var tables = divisions.map(division => { 
        if(division.items.length) {
            var divName = (props.game.gender === "male")? division.titleM : division.titleF;
            var counter = 1;
            var items = division.items.map(item => {
                var rowItem = {};
                var reserve = (item.reserve && JSON.parse(item.reserve))? <sup>R</sup> : null;
                rowItem.id = item.id;
                rowItem.status = (<input type="checkbox" checked={JSON.parse(item.status)} data-rel={item.id} 
                onChange={e => {props.onChangeStatus(e.target.dataset["rel"], !JSON.parse(item.status))}} />);
                rowItem.number = <div>{reserve}{counter++}</div>;
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
            return (<div key={division.id}>
                <div key={division.id}>Дивізіон "{divName}"</div>
                <Grid data={{columns: gridColumns, rows: items}} />
            </div>)
        }
    });


    return (<div>{tables}</div>);
}
export default NomGrid;