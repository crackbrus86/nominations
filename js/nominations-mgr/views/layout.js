import React from "react";
import Competitions from "./competitions";
import Nominaions from "./nominations";
require("../../../styles/style-front.css");

class NomMnmApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            regionId: this.props.region,
            competition: null
        }
        this.setComp = this.chooseCompetition.bind(this);
        this.unsetComp = this.unsetCompetition.bind(this);
    }

    chooseCompetition(id){
        this.setState({competition: id});
    }
    unsetCompetition(){
        this.setState({competition: null});
    }
    render(){
        return <div id="nm-front">
            <Competitions competition={this.state.competition} setComp = {this.setComp} />
            <Nominaions competition={this.state.competition} back={this.unsetComp} region={this.state.regionId} />
        </div>;
    }
}
export default NomMnmApp;