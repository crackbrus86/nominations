import React from "react";
import * as services from "../services/services";
import Preloader from "../../components/preloader/preloader";
require("../../scripts/colResizable-1.6.js");
import CompInfo from "./partial/comp.info";
import IsJunLiftersGrid from "./partial/isJun.lifters.grid";
import LiftersGrid from "./partial/lifters.grid";
import RefGrid from "./partial/referees.grid";
import Modal from "../../components/modal/modal";
import Dialog from "../../components/modal/dialog";
import LifterForm from "./partial/lifter.form";
import OfficialForm from "./partial/official.form";
import Inform from "../../components/modal/inform";

class Nominations extends React.Component{
    constructor(props){
        super();
        this.state = {
            compInfo: null,
            isLoading: false,
            regions: [],
            wClass: [],
            wc: [],
            subwc: [],
            lifters: [],
            referees: [],
            nomination: null,
            inform: null,
            dialog: null
        }
        this.onClose = this.closeNomination.bind(this);
        this.onChange = this.changeNom.bind(this);
        this.onCloseInform = this.hideInform.bind(this);
        this.onSave = this.saveNom.bind(this);
        this.onEditLifter = this.editLifterNom.bind(this);
        this.onDelete = this.deleteDialog.bind(this);
        this.onCancel = this.cancelDeleting.bind(this);
        this.onConfirm = this.confirmDeleting.bind(this);
        this.onEditReferee = this.editRefereeNom.bind(this);
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
            var categories = JSON.parse(data);
            this.setState({wClass: categories});
            var wc = categories.filter(x => x.division === "open");
            var subwc = categories.filter(y => y.division === "subjuniors");
            this.setState({wc: wc});
            this.setState({subwc: subwc})
            this.setState({isLoading: false});
        })
    }

    editLifterNom(id){
        this.setState({isLoading: true});
        services.getLifterNominationById({id: id}).then(data => {
            var nom = JSON.parse(data)[0];
            this.setState({isLoading: false});
            this.setState({nomination: nom});
        })
    }

    editRefereeNom(id){
        this.setState({isLoading: true});
        services.getOfficialNominationById({id: id}).then(data => {
            var nom = JSON.parse(data)[0];
            this.setState({isLoading: false});
            this.setState({nomination: nom});
        })
    }

    createNomination(type){
        var nom = (type === "lifter")? {
            type: type,
            surname: "",
            firstName: "",
            mName: "",
            birthDate: null,
            gender: this.state.compInfo.gender,
            team: this.state.regions[0].id,
            city: "",
            fst: "",
            club: "",
            school: "",
            level: 1,
            division: "seniors",
            weightClass: 0,
            squat: 0,
            benchpress: 0,
            deadlift: 0,
            total: 0,
            reserve: false,
            competition: this.state.compInfo.id,
            coaches: "",
            status: false
        } : {
            type: type,
            surname: "",
            firstName: "",
            middleName: "",
            team: this.state.regions[0].id,
            isReferee: true,
            refCategory: "category1",
            refRemark: "",
            competition: this.state.compInfo.id,
            status: false            
        };

        this.setState({nomination: nom})
    }

    closeNomination(){
        this.setState({nomination: null});
    }

    changeNom(field, value){
        var temp = this.state.nomination;
        temp[field] = value;
        if(temp["type"] === "lifter") temp["total"] = parseFloat(temp.squat) + parseFloat(temp.benchpress) + parseFloat(temp.deadlift);
        if(field === "division") temp["weightClass"] = 0;
        this.setState({nomination: temp});
    }

    saveNom(){
        this.setState({isLoading: true});
        if(this.state.nomination.type === "lifter"){
            if(this.state.nomination.id){
                services.updateLifterNominationById(this.state.nomination).then(() => {
                    this.closeNomination();
                    this.setState({isLoading: false});
                    this.showInform("Номінацію спортсмена було успішно оновлено");
                    this.getAllLifters();
                    this.getAllReferees();
                })
            }else{
                services.insertLifterNomination(this.state.nomination).then(() => {
                    this.closeNomination();
                    this.setState({isLoading: false});
                    this.showInform("Спортсмена було успішно додано до номінації");
                    this.getAllLifters();
                    this.getAllReferees();
                })
            }
        }else{
            if(this.state.nomination.id){
                services.updateOfficialNominationById(this.state.nomination).then(() => {
                    this.closeNomination();
                    this.setState({isLoading: false});
                    this.showInform("Номінацію судді було успішно оновлено");
                    this.getAllLifters();
                    this.getAllReferees();
                })
            }else{
                services.insertOfficialNomination(this.state.nomination).then(() => {
                    this.closeNomination();
                    this.setState({isLoading: false});
                    this.showInform("Суддю було успішно додано до номінації");
                    this.getAllLifters();
                    this.getAllReferees();                    
                })
            }
        }
    }

    showInform(txt){
        this.setState({inform: {
            text: txt
        }})
    }

    hideInform(){
        this.setState({inform: null});
    }

    deleteDialog(id){
        this.setState({dialog: {
            id: id,
            text: "Ви впевнені, що хочете видалити цей запис?"
        }})
    }

    cancelDeleting(){
        this.setState({dialog: null});
    }

    confirmDeleting(){
        this.setState({isLoading: true});
        services.deleteNomination({id: this.state.dialog.id}).then(() => {
            this.cancelDeleting();
            this.getAllLifters();
            this.getAllReferees();
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
            <div className="nom-header">
                <div className="nom-header-cell">
                    <button type="button" className="back-to-nom-list" onClick={() => this.props.back()}><i className="fa fa-chevron-left"></i>Назад до списку номінацій</button>
                </div>
                <div className="nom-header-cell">
                    <div className="add-panel">
                        <span><img src="../wp-content/plugins/nominations/images/nom_add.png" alt="" title="Додати спортсмена" onClick={this.createNomination.bind(this, "lifter")} /></span>
                        <span><img src="../wp-content/plugins/nominations/images/nom_add_ref.png" alt="" title="Додати офіційну особу" onClick={this.createNomination.bind(this, "official")} /></span>
                    </div>          
                </div>                
            </div>  
            <CompInfo compInfo={this.state.compInfo} />  
            <div className="adm-grids-wrap">
                <IsJunLiftersGrid nominations={this.state.lifters} game={this.state.compInfo} weightClasses={this.state.wClass} regions={this.state.regions} onEdit={this.onEditLifter} onDelete={this.onDelete} />
                <LiftersGrid nominations={this.state.lifters} game={this.state.compInfo} weightClasses={this.state.wClass} regions={this.state.regions} onEdit={this.onEditLifter} onDelete={this.onDelete} />
                <RefGrid nominations={this.state.referees} game={this.state.compInfo} regions={this.state.regions} onEdit={this.onEditReferee} onDelete={this.onDelete} />
            </div>
            <Modal target={this.state.nomination} onClose={this.onClose}>
                <LifterForm nomination={this.state.nomination} compInfo={this.state.compInfo} onChange={this.onChange} regions={this.state.regions} wc={this.state.wc} subwc = {this.state.subwc} onSave={this.onSave}  onClose={this.onClose} />
                <OfficialForm nomination={this.state.nomination} compInfo={this.state.compInfo} onChange={this.onChange} regions={this.state.regions} onSave={this.onSave} onClose={this.onClose}  />
            </Modal>   
            <Dialog dialog={this.state.dialog} onConfirm={this.onConfirm} onClose={this.onCancel} />
            <Inform inform={this.state.inform} onClose={this.onCloseInform} />               
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Nominations;