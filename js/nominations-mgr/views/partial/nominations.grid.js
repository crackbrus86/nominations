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
    var table = divisions.map(division => { 
        if(division.items.length) {
            var divName = (props.game.gender === "male")? division.titleM : division.titleF;
            var counter = 1;
            var items = division.items.map(item => <li key={counter}>{counter++ + " " + item.name + " " + item.surname}</li>)
            return (<div key={division.id}>
                <div key={division.id}>Дивізіон "{divName}"</div>
                <ul>{items}</ul>
            </div>)
        }
    });

    return (<div>{table}</div>);
}
export default NomGrid;