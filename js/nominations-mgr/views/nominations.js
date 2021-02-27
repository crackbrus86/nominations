import React from "react";
import CompInfo from "./partial/nom.comp.info";
import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import Modal from "../../components/modal/modal";
import Dialog from "../../components/modal/dialog";
import LifterForm from "./partial/lifter.form";
import OfficialForm from "./partial/official.form";
import Inform from "../../components/modal/inform";
import NomGrid from "./partial/nominations.grid";
import RefGrid from "./partial/referee.grid";
import * as wCl from '../../weightClasses.json';

class Nominations extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            compInfo: null,
            isLoading: false,
            nomination: null,
            region: this.props.region,
            regions: [],
            weightClasses: [],
            wc: [],
            subwc:[],
            inform: null,
            compStatus: "p",
            lNominations: [],
            rNominations: [],
            dialog: null
        }
        this.closeNom = this.closeNomination.bind(this);
        this.onChange = this.changeNom.bind(this);
        this.onSave = this.saveNom.bind(this);
        this.onCloseInform = this.hideInform.bind(this);
        this.onCheckStatus = this.changeNomStatus.bind(this);
        this.onLifterEdit = this.getLifterNom.bind(this);
        this.onOfficialEdit = this.getOfficialNom.bind(this);
        this.onDelete = this.confirmDeleting.bind(this);
        this.onCancel = this.cancelDeleting.bind(this);
        this.onConfirm = this.deleting.bind(this);
        this.onChangeOutOfContest = this.changeOutOfContest.bind(this);
    }

    getCompInfo(id){
        this.setState({isLoading: true});
        services.getCompetitionById({id: id}).then(data => {
            var tmpComp = JSON.parse(data)[0];
            if(tmpComp.isJun === "") tmpComp.isJun = "false";
            this.setState({compInfo: tmpComp});
            this.setState({isLoading: false});
            this.getWeightCategories(this.state.compInfo.gender);
            this.evalCompStatus();
            this.getLifterNominations();
            this.getRefereeNominations();
        });
    }

    getLifterNominations(){
        this.setState({isLoading: true});
        services.getLifterNominationsByRegion({
            competition: this.state.compInfo.id,
            gender: this.state.compInfo.gender,
            team: this.state.region,
            type: "lifter"
        }).then(data => {
            this.setState({lNominations: JSON.parse(data)});
            this.setState({isLoading: false});        
        })
    }

    getRefereeNominations(){
        this.setState({isLoading: true});
        services.getRefereeNominations({
            competition: this.state.compInfo.id,
            team: this.state.region,
            type: "official"
        }).then(data => {
            this.setState({rNominations: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    evalCompStatus(){
        var info = this.state.compInfo;
        var compStatus = "";
        var p = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 30);
        var f = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 15);
        var mc = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate());
        if((+new Date()) <= p){
            compStatus = "p";
        }else if(p < (+new Date()) && (+new Date()) <= f){
            compStatus = "f";
        }else if(f < (+new Date()) && (+new Date()) <= mc){
            compStatus = "m";
        }else{
            compStatus = "a";
        } 
        this.setState({compStatus: compStatus});
    }

    setNomination(type){
        var nom = (type === "lifter")? {
            type: type,
            surname: "",
            firstName: "",
            mName: "",
            birthDate: null,
            gender: this.state.compInfo.gender,
            team: this.state.region,
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
            personally: false,
            competition: this.state.compInfo.id,
            coaches: "",
            status: false,
            outOfContest: false
        } : {
            type: type,
            surname: "",
            firstName: "",
            middleName: "",
            team: this.state.region,
            isReferee: true,
            refCategory: "category1",
            refRemark: "",
            competition: this.state.compInfo.id,
            status: false            
        };

        this.setState({nomination: nom})
    }

    changeNom(field, value){
        var temp = this.state.nomination;
        temp[field] = value;
        if(temp["type"] === "lifter") temp["total"] = parseFloat(temp.squat) + parseFloat(temp.benchpress) + parseFloat(temp.deadlift);
        if(field === "division") temp["weightClass"] = 0;
        this.setState({nomination: temp});
    }

    changeOutOfContest(value){
        var temp = this.state.nomination;
        if(!!value){
            temp.squat = 0;
            temp.benchpress = 0;
            temp.deadlift = 0;
            temp.total = 0;
        }
        temp.outOfContest = value;
        this.setState({nomination: temp});
    }
    
    getLifterNom(id){
        this.setState({isLoading: true});
        services.getLifterNominationById({id: id}).then(data => {
            var nom = JSON.parse(data)[0];
            this.setState({isLoading: false});
            this.setState({nomination: nom});
        })
    }

    getOfficialNom(id){
        this.setState({isLoading: true});
        services.getOfficialNominationById({id: id}).then(data => {
            var nom = JSON.parse(data)[0];
            this.setState({isLoading: false});
            this.setState({nomination: nom});
        })
    }
    
    saveNom(){
        this.setState({isLoading: true});
        if(this.state.nomination.type === "lifter"){
            if(this.state.nomination.id){
                services.updateLifterNominationById(this.state.nomination).then(() => {
                    this.closeNom();
                    this.setState({isLoading: false});
                    this.showInform("Номінацію спортсмена було успішно оновлено");
                    this.getLifterNominations();   
                    this.getRefereeNominations();
                })
            }else{
                    services.insertLifterNomination(this.state.nomination).then(() => {
                        this.closeNom();
                        this.setState({isLoading: false});
                        this.showInform("Спортсмена було успішно додано до номінації");
                        this.getLifterNominations();
                        this.getRefereeNominations();
                    })
            }
        }else{
            if(this.state.nomination.id){
                services.updateOfficialNominationById(this.state.nomination).then(() => {
                    this.closeNom();
                    this.setState({isLoading: false});
                    this.showInform("Номінацію судді було успішно оновлено");
                    this.getLifterNominations();   
                    this.getRefereeNominations();                      
                })
            }else{            
            services.insertOfficialNomination(this.state.nomination).then(() => {
                this.closeNom();
                this.setState({isLoading: false});
                this.showInform("Суддю було успішно додано до номінації");
                this.getLifterNominations();   
                this.getRefereeNominations();               
            })
        }
        }
    }

    changeNomStatus(id, value){
        this.setState({isLoading: true});
        services.checkNominationStatusById({id: id, status: value}).then(() => {
            this.setState({isLoading: false});
            this.getLifterNominations();
            this.getRefereeNominations();
        })
    }

    showInform(txt){
        this.setState({inform: {
            text: txt
        }})
    }

    hideInform(){
        this.setState({inform: null});
    }

    closeNomination(){
        this.setState({nomination: null});
    }

    componentWillReceiveProps(props){
        if(props.competition) {
            this.setState({lNominations: []});
            this.setState({rNominations: []});
            this.getCompInfo(props.competition);
        }
    }

    getAllRegions(){
        this.setState({isLoading: true});
        services.getAllRegionsNames().then(data => {
            this.setState({regions: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    getWeightCategories(gender){
        const allCategories = wCl.weightClasses.filter(c => c.gender === gender);
        const openClasses = allCategories.filter(c => c.division === 'open').sort((a,b) => a.sortOrder - b.sortOrder);
        const subJuniorClasses = allCategories.filter(c => c.division === 'subjuniors').sort((a,b) => a.sortOrder - b.sortOrder);
        this.setState({ weightClasses: allCategories, wc: openClasses, subwc: subJuniorClasses });
    }

    confirmDeleting(id){
        this.setState({dialog: {
            id: id,
            text: "Ви впевнені, що хочете видалити цей запис?"
        }})
    }

    cancelDeleting(){
        this.setState({dialog: null});
    }  
    
    deleting(){
        this.setState({isLoading: true});
        services.deleteNomination({id: this.state.dialog.id}).then(() => {
            this.cancelDeleting();
            this.getLifterNominations();
            this.getRefereeNominations();
        })
    }    

    componentDidMount(){
        this.getAllRegions();
    }

    componentDidUpdate(){
        jQuery(function(){jQuery(".grid").colResizable();});
    }

    render(){
        if(!this.props.competition) return null;
        var addLifterButton = (this.state.compStatus === "p")? <span><img src="../wp-content/plugins/nominations/images/nom_add.png" alt="" title="Додати спортсмена" onClick={this.setNomination.bind(this, "lifter")} /></span> : "";
        var addOfficialButton = ((this.state.compStatus === "p") || (this.state.compStatus === "f"))?
            <span><img src="../wp-content/plugins/nominations/images/nom_add_ref.png" alt="" title="Додати офіційну особу" onClick={this.setNomination.bind(this, "official")} /></span> : "";
        return <div>
            <div className="nom-header">
                <div className="nom-header-cell">
                    <button type="button" className="back-to-nom-list" onClick={() => this.props.back()}><i className="fa fa-chevron-left"></i>Назад до списку номінацій</button>
                </div>
                <div className="nom-header-cell">
                    <div className="add-panel" hidden={((this.state.compStatus != "p") && (this.state.compStatus != "f"))}>
                        {addLifterButton}
                        {addOfficialButton}
                    </div>          
                </div>
            </div>
            <CompInfo compInfo={this.state.compInfo} />
            <NomGrid
                nominations={this.state.lNominations}
                game={this.state.compInfo}
                onChangeStatus={this.onCheckStatus}
                onLifterEdit={this.onLifterEdit}
                onDelete={this.onDelete}
                weightClasses={this.state.weightClasses}
            />
            <RefGrid nominations={this.state.rNominations} game={this.state.compInfo} onOfficialEdit={this.onOfficialEdit} onDelete={this.onDelete} />
            <Modal target={this.state.nomination} onClose={this.closeNom}>
                <LifterForm nomination={this.state.nomination} 
                compInfo={this.state.compInfo} 
                onChange={this.onChange} 
                regions={this.state.regions} 
                wc={this.state.wc} 
                subwc = {this.state.subwc} 
                onSave={this.onSave}  
                onClose={this.closeNom}
                onChangeOutOfContest={this.onChangeOutOfContest} />
                <OfficialForm nomination={this.state.nomination} compInfo={this.state.compInfo} onChange={this.onChange} regions={this.state.regions} onSave={this.onSave} onClose={this.closeNom}  />
            </Modal>
            <Dialog dialog={this.state.dialog} onConfirm={this.onConfirm} onClose={this.onCancel} />
            <Inform inform={this.state.inform} onClose={this.onCloseInform} />
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Nominations;