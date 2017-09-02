import React from "react";
import Competitions from "./competitions";
require("../../../styles/style-front.css");

class NomMnmApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            regionId: this.props.region
        }
    }
    render(){
        return <div id="nm-front">
            <Competitions />
        </div>;
    }
}
export default NomMnmApp;