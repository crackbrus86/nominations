import React from "react";
import CompInfo from "./partial/nom.comp.info";
import Preloader from "../../components/preloader/preloader";
import * as services from "../services/services";
import Modal from "../../components/modal/modal";
import LifterForm from "./partial/lifter.form";
import OfficialForm from "./partial/official.form";
import Inform from "../../components/modal/inform";
import NomGrid from "./partial/nominations.grid";

class Nominations extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            compInfo: null,
            isLoading: false,
            nomination: null,
            region: this.props.region,
            regions: [],
            wc: [],
            inform: null,
            compStatus: "p",
            lNominations: []
        }
        this.closeNom = this.closeNomination.bind(this);
        this.onChange = this.changeNom.bind(this);
        this.onSave = this.saveNom.bind(this);
        this.onCloseInform = this.hideInform.bind(this);
    }

    getCompInfo(id){
        this.setState({isLoading: true});
        services.getCompetitionById({id: id}).then(data => {
            this.setState({compInfo: JSON.parse(data)[0]});
            this.setState({isLoading: false});
            this.getWeightCategories(this.state.compInfo.gender);
            this.evalCompStatus();
            this.getLifterNominations();
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
            console.log(this.state);            
        })
    }

    evalCompStatus(){
        var info = this.state.compInfo;
        var compStatus = "";
        var p = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 22);
        var f = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 11);
        var mc = (new Date(info.startDate)).setDate((new Date(info.startDate)).getDate() - 1);
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
            birthDate: null,
            gender: this.state.compInfo.gender,
            team: this.state.region,
            division: "open",
            weightClass: this.state.wc[0],
            squat: 0.00,
            benchpress: 0.00,
            deadlift: 0.00,
            total: 0.00,
            reserve: false,
            competition: this.state.compInfo.id,
            status: false
        } : {
            type: type,
            surname: "",
            firstName: "",
            team: this.state.region,
            isOfficial: false,
            duty: "unknown",
            isReferee: false,
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
        this.setState({nomination: temp});
    } 
    
    saveNom(){
        this.setState({isLoading: true});
        if(this.state.nomination.type === "lifter"){
            services.insertLifterNomination(this.state.nomination).then(() => {
                this.closeNom();
                this.setState({isLoading: false});
                this.showInform("Спортсмена було успішно додано до номінації");
            })
        }else{
            services.insertOfficialNomination(this.state.nomination).then(() => {
                this.closeNom();
                this.setState({isLoading: false});
                this.showInform("Офіційну особу було успішно додано до номінації");
            })
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

    closeNomination(){
        this.setState({nomination: null});
    }

    componentWillReceiveProps(props){
        if(props.competition) {
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
        this.setState({isLoading: true});
        services.getWeightCategories({gender: gender}).then(data => {
            this.setState({wc: JSON.parse(data)});
            this.setState({isLoading: false});
        })
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
                <div className="nom-header-cell">
                    <div className="add-panel" hidden={((this.state.compStatus != "p") && (this.state.compStatus != "f"))}>
                        <span><img src="../wp-content/plugins/nominations/images/nom_add.png" alt="" title="Додати спортсмена" onClick={this.setNomination.bind(this, "lifter")} /></span>
                        <span><img src="../wp-content/plugins/nominations/images/nom_add_ref.png" alt="" title="Додати офіційну особу" onClick={this.setNomination.bind(this, "official")} /></span>  
                    </div>          
                </div>
            </div>
            <CompInfo compInfo={this.state.compInfo} />
            <NomGrid nominations={this.state.lNominations} game={this.state.compInfo} />
            <Modal target={this.state.nomination} onClose={this.closeNom}>
                <LifterForm nomination={this.state.nomination} compInfo={this.state.compInfo} onChange={this.onChange} regions={this.state.regions} wc={this.state.wc} onSave={this.onSave}  onClose={this.closeNom} />
                <OfficialForm nomination={this.state.nomination} compInfo={this.state.compInfo} onChange={this.onChange} regions={this.state.regions} onSave={this.onSave} onClose={this.closeNom}  />
            </Modal>
            <Inform inform={this.state.inform} onClose={this.onCloseInform} />
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Nominations;