import React from "react";
import moment from "moment";
import Grid from "../../../components/grid/grid";

const CompGrid = (props) => {
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
                    // props.onDelete(e.target.dataset["rel"]);
            }
        },
        {
            title: "Змагання",
            field: "name",
            width: "500px"
        }, 
        {
            title: "Тип",
            field: "typeName",
            width: "*"
        }, 
        {
            title: "Місце проведення",
            field: "location",
            width: "*"
        },
        {
            title: "Дата початку",
            field: "startDate",
            width: "*"
        },
        {
            title: "Дата завершення",
            field: "endDate",
            width: "*"
        }              
                      
    ];
    var rows = props.data.map(item => {
        return{
            id: item.id,
            name: item.name,
            typeName: item.typeName,
            location: item.location,
            startDate: moment(item.startDate).format("DD-MM-YYYY"),
            endDate: moment(item.endDate).format("DD-MM-YYYY")
        }
    });
    return(<div><Grid data={{columns, rows}} /></div>)
}
export default CompGrid;