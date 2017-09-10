import React from "react";
import * as services from "../services/services";
import CompInfo from "./partial/comp.info";
import Preloader from "../../components/preloader/preloader";
import LiftersGrid from "./partial/lifters.grid";
import RefGrid from "./partial/referees.grid";
import OfficialGrid from "./partial/officials.grid";

class Nominations extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            compInfo: null,
            isLoading: false,
            regions: [],
            weightClasses: [],
            lifters: [],
            referees: [],
            officials: []
        }
    }

    getCompInfo(compId){
        this.setState({isLoading: true});
        services.getCompetitionById({id: compId}).then(data => {
            this.setState({compInfo: JSON.parse(data)[0]});
            this.setState({isLoading: false});
            this.getWeightCategories(this.state.compInfo.gender);
            this.getAllLifters();
            this.getAllReferees();
            this.getAllOfficials();
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

    getAllOfficials(){
        this.setState({isLoading: true});
        services.getAllOfficials({
            competition: this.state.compInfo.id,
            type: "official"
        }).then(data => {
            this.setState({officials: JSON.parse(data)});
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
            this.setState({weightClasses: JSON.parse(data)});
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

    render(){
        if(!this.props.competition) return null;
        return <div>
            <div className="nom-header">
                <div className="nom-header-cell">
                    <button type="button" className="back-to-nom-list" onClick={() => this.props.back()}><i className="fa fa-chevron-left"></i>Назад до списку номінацій</button>
                </div>
            </div>
            <CompInfo compInfo={this.state.compInfo} />
            <LiftersGrid nominations={this.state.lifters} game={this.state.compInfo} weightClasses={this.state.weightClasses} regions={this.state.regions} />
            <RefGrid nominations={this.state.referees} game={this.state.compInfo} regions={this.state.regions} />
            <OfficialGrid nominations={this.state.officials} game={this.state.compInfo} regions={this.state.regions} />
            <Preloader loading={this.state.isLoading} />            
        </div>
    }
}
export default Nominations;