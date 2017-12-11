import React from "react";
import Grid from "../../../components/grid/grid";

const RegionsGrid = (props) => {
    var columns = [
        {
            title: "",
            field: "id",
            button: "edit",
            width: "*",
            action: (e) => {
                props.onEdit(e.target.dataset["rel"]);
            }
        },
        {
            title: "",
            field: "id",
            button: "delete",
            width: "*",
            action: (e) => {
                    props.onDelete(e.target.dataset["rel"]);
            }
        },
        {
            title: "Область",
            field: "name",
            width: "200px"
        },  
        {
            title: "Логін",
            field: "login",
            width: "*"
        },
        {
            title: "Email",
            field: "email",
            width: "*"
        }                          
    ];
    var rows = props.data.map(item => {
        return {
            id: item.id,
            name: item.name,
            login: item.login,
            token: item.token,
            email: item.email
        }
    });
    return(<div><Grid data={{columns, rows}}/></div>)
}

export default RegionsGrid;