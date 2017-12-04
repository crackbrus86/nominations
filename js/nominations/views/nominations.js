import React from "react";
import * as services from "../services/services";
import CompInfo from "./partial/comp.info";
import Preloader from "../../components/preloader/preloader";
import LiftersGrid from "./partial/lifters.grid";
import IsJunLiftersGrid from "./partial/isJun.lifters.grid";
import RefGrid from "./partial/referees.grid";
require("../../scripts/colResizable-1.6.js");

class Nominations extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            compInfo: null,
            isLoading: false,
            regions: [],
            weightClasses: [],
            lifters: [],
            referees: []
        }
        this.onPrint = this.printGrid.bind(this);
        this.onExport = this.exportGrid.bind(this);
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
            this.setState({weightClasses: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }   
    
    printGrid(){
        jQuery.print(".print-wrap");
    }

    exportGrid(){
        jQuery(".print-wrap").wordExport();
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
            <div className="nom-header">
                <div className="nom-header-cell">
                    <button type="button" className="back-to-nom-list" onClick={() => this.props.back()}><i className="fa fa-chevron-left"></i>Назад до списку номінацій</button>
                </div>
                <div className="nom-header-cell right-header-cell">
                    <button type="button" className="print-btn" title="Друкувати"  onClick={this.onPrint}><i className="fa fa-print"></i></button>
                    <button type="button" className="print-btn" title="Експортувати в Word"   onClick={this.onExport}><i className="fa fa-file-word-o"></i></button>
                </div>
            </div>
            <CompInfo compInfo={this.state.compInfo} />
            <div className="print-wrap">
                <IsJunLiftersGrid nominations={this.state.lifters} game={this.state.compInfo} weightClasses={this.state.weightClasses} regions={this.state.regions} />
                <LiftersGrid nominations={this.state.lifters} game={this.state.compInfo} weightClasses={this.state.weightClasses} regions={this.state.regions} />
                <RefGrid nominations={this.state.referees} game={this.state.compInfo} regions={this.state.regions} />
            </div>
            <Preloader loading={this.state.isLoading} />            
        </div>
    }
}
export default Nominations;