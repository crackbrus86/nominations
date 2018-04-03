import React from "react";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
import RegionsGrid from "./partial/regions.grid";
import Modal from "../../components/modal/modal";
import RegionForm from "./partial/regions.form";
import Dialog from "../../components/modal/dialog";

class Regions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            regions: [],
            isLoading: false,
            region: null,
            dialog: null
        }
        this.onEdit = this.chooseRegion.bind(this);
        this.onDelete = this.confirmDeleting.bind(this);
        this.onClose = this.closeRegion.bind(this);
        this.onChange = this.changeRegion.bind(this);
        this.onAdd = this.createEmptyRegion.bind(this);
        this.onSave = this.saveRegion.bind(this);
        this.onCancel = this.cancelDeleting.bind(this);
        this.onConfirm = this.deleting.bind(this);
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

    createEmptyRegion(){
        var region = {
            name: "",
            login: "",
            token: "",
            email: "",
            short_name: ""
        }
        this.setState({region: region});
    }

    saveRegion(){
        var region = this.state.region;
        this.setState({isLoading: true});
        if(region.id){
            services.updateRegion(region).then(() => {
                this.closeRegion();
                this.fetchRegions();
            })
        }else{
            services.insertRegion(region).then(() => {
                this.closeRegion();
                this.fetchRegions();             
            })
        }
    }

    confirmDeleting(id){
        this.setState({dialog: {
            id: id,
            text: "Ви впевнені що хочете видалити цю область?"
        }})
    }

    cancelDeleting(){
        this.setState({dialog: null});
    }

    deleting(){
        this.setState({isLoading: true});
        services.deleteRegion({id: this.state.dialog.id}).then(() => {
            this.cancelDeleting();
            this.fetchRegions();
        });
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
            <RegionsGrid data={this.state.regions} onEdit={this.onEdit} onDelete={this.onDelete} />
            <div className="control-panel"><button type="button" onClick={this.onAdd}>Додати</button></div>
            <Modal target={this.state.region} onClose={this.onClose}>
                <RegionForm region={this.state.region} onChange={this.onChange} onSave={this.onSave} />
            </Modal>
            <Dialog dialog={this.state.dialog} onClose={this.onCancel} onConfirm={this.onConfirm} />
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Regions;