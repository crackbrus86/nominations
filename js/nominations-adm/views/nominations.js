import React from "react";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
require("../../scripts/colResizable-1.6.js");


class Nominations extends React.Component{
    constructor(props){
        super();
        this.state = {
            compInfo: null,
            isLoading: false,
            regions: [],
            wClasses: [],
            lifters: [],
            referees: []
        }
    }

    getCompInfo(compId){
        this.setState({isLoading: true});
        services.getCompetitionById({id: compId}).then(data => {
            var tmpComp = JSON.parse(data)[0];
            if(tmpComp.isJun === "") tmpComp.isJun = "false";
            this.setState({compInfo: tmpComp});
            this.setState({isLoading: false});
            this.getWeightCategories(this.state.compInfo.gender);
            this.getAllLifters();
            this.getAllReferees();
        })
    }

    getAllLifters(){
        this.setState({isLoading: true});
        services.getAllLifters({
            competition: this.state.compInfo.id,
            gender: this.state.compInfo.gender,
            type: "lifter"
        }).then(data => {
            this.setState({lifters: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getAllReferees(){
        this.setState({isLoading: true});
        services.getAllReferees({
            competition: this.state.compInfo.id,
            type: "official"
        }).then(data => {
            this.setState({referees: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getAllRegions(){
        this.setState({isLoading: true});
        services.getAllRegionsNames().then(data => {
            this.setState({regions: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getWeightCategories(gender){
        this.setState({isLoading: true});
        services.getWeightCategories({gender: gender}).then(data => {
            this.setState({wClasses: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    componentWillReceiveProps(props){
        if(props.competition){
            this.getCompInfo(props.competition);
        }
    }

    componentDidMount(){
        this.getAllRegions();
    }

    componentDidUpdate(){
        jQuery(function(){jQuery(".grid").colResizable();});
    }

    render(){
        if(!this.props.competition) return null;
        return <div>
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Nominations;