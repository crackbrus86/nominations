import React from "react";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import CompGrid from "./partial/comp.grid";

class Competitions extends React.Component{
    constructor(props){
        super();
        this.state = {
            competitions: [],
            isLoading: false
        }
    }

    fetchCompetitions(){
        this.setState({isLoading: true});
        services.getCompetitions().then(data => {
            this.setState({competitions: JSON.parse(data)});
            this.setState({isLoading: false});
        });
    }

    componentDidMount(){
        this.fetchCompetitions();
    }

    render(){
        if(this.props.competition) return null;
        return <div>
            <CompGrid data={this.state.competitions} onEdit={this.props.getComp} />
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Competitions;