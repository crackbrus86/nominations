import React from "react";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import RegionsGrid from "./partial/regions.grid";
import Modal from "../../components/modal/modal";
import RegionForm from "./partial/regions.form";

class Regions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            regions: [],
            isLoading: false,
            region: null
        }
        this.onEdit = this.chooseRegion.bind(this);
        this.onClose = this.closeRegion.bind(this);
        this.onChange = this.changeRegion.bind(this);
    }

    chooseRegion(id){
        this.setState({isLoading: true});
        services.getRegionById({id: id}).then(data => {
            this.setState({region: JSON.parse(data)[0]});
            this.setState({isLoading: false});
        });
    }

    closeRegion(){
        this.setState({region: null});
    }

    changeRegion(field, value){
        var temp = this.state.region;
        temp[field] = value;
        this.setState({region: temp});
    }

    fetchRegions(){
        this.setState({isLoading: true});
        services.getAllRegions().then(data => {
            this.setState({regions: JSON.parse(data)});
            this.setState({isLoading: false});
        });
    }

    componentWillMount(){
        this.fetchRegions();
    }
    render(){
        return <div>
            <h3>Області</h3>
            <RegionsGrid data={this.state.regions} onEdit={this.onEdit} />
            <Modal target={this.state.region} onClose={this.onClose}>
                <RegionForm region={this.state.region} onChange={this.onChange} />
            </Modal>
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Regions;