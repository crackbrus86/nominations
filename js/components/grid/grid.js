import React from "react";
var classNames = require("classnames");

class Grid extends React.Component{
    getCells(row){
        var cells = [];
        this.props.data.columns.forEach((column, counter = 0) => {
            counter++;
            if(column.button) {
                var color = (column.button === "edit")? "success" : "danger";
                var icon;
                switch(column.button){
                    case "edit":
                    icon = "fa-pencil-square-o";
                    break;
                    case "delete":
                    icon = "fa-times";
                    break;
                }
                cells.push(<td key={counter} width={column.width}>
                    <i className={classNames("fa", icon, column.button)}  data-rel={row[column.field]} onClick={(v) => column.action(v)}></i>
                </td>)
            }else{
                var content = (column.rel)? <span className="grid-rel" data-rel={row[column.rel]} onClick={v => column.action(v)}>{row[column.field]}</span> : row[column.field];
                var hint = (typeof content != "object")? content : "";
                cells.push(<td key={counter} width={column.width} className={column.class} title={hint}>{content}</td>)
            }            
        })
        return cells
    }
    render(){
        let cols = this.props.data.columns.map((column, counter = 0) => {
            counter++;
            return <th key={counter} width={column.width} className={column.class} title={column.title}>{column.title}</th>;
        });
        let rows = this.props.data.rows.map((row, counter = 0) => {
            counter++;
            return <tr key={counter}>{this.getCells(row)}</tr>
        });
        return <table className="grid">
            <thead><tr>{cols}</tr></thead>
            <tbody>{rows}</tbody>
        </table>
    }
}

export default Grid