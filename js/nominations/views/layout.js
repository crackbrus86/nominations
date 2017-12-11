import React from "react";
import Competitions from "./competitions";
import Nominations from "./nominations";
require("../../../styles/style-front.css");

class NomLayout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
        <Nominations competition={this.state.competition} back={this.unsetComp} />
    </div>;
    }
}
export default NomLayout;