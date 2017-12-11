import React from "react";
import Competitions from "./competitions";
import Nominations from "./nominations";

class NomAdmin extends React.Component{
    constructor(){
        super();
        this.state = {
            competition: null
        }
        this.getComp = this.chooseCompetition.bind(this);
        this.unComp = this.unsetCompetition.bind(this);
    }

    chooseCompetition(id){
        this.setState({competition: id});
    }

    unsetCompetition(){
        this.setState({competition: null});
    }

    render(){
        return <div id="nm-front">
            <Competitions competition = {this.state.competition} getComp = {this.getComp} />
            <Nominations competition={this.state.competition} back={this.unComp} />
        </div>
    }
}
export default NomAdmin;