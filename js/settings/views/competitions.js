import React from "react";
import * as services from "../services/services";
import CompGrid from "./partial/competitions.grid";
import Preloader from "../../components/preloader/preloader";
import CompForm from "./partial/competitions.form";
import Modal from "../../components/modal/modal";
import Dialog from "../../components/modal/dialog";

class Competitions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            competitions: [],
            isLoading: false,
            competition: null,
            dialog: null
        }
        this.onEdit = this.chooseComp.bind(this);
        this.onClose = this.closeComp.bind(this);
        this.onChange = this.changeComp.bind(this);
        this.onAdd = this.createEmptyComp.bind(this);
        this.onSave = this.saveComp.bind(this);
        this.onDelete = this.confirmDeleting.bind(this);
        this.onCancel = this.cancelDeleting.bind(this);
        this.onConfirm = this.deleting.bind(this);
    }

    chooseComp(id){
        this.setState({isLoading: true});
        services.getCompetitionById({id: id}).then(data => {
            this.setState({competition: JSON.parse(data)[0]});
            this.setState({isLoading: false});
        })
    }

    closeComp(){
        this.setState({competition: null});
    }

    changeComp(field, value){
        var temp = this.state.competition;
        temp[field] = value;
        this.setState({competition: temp});
    }   
    
    createEmptyComp(){
        var competition = {
            name: "",
            gender: "male",
            location: "",
            typeId: 1,
            startDate: null,
            endDate: null,
            isJun: "false",
            isCup: false
        }
        this.setState({competition: competition});
    }

    saveComp(){
        var competition = this.state.competition;
        this.setState({isLoading: true});        
        if(competition.id){
            services.updateCompetition(competition).then(() => {
                this.closeComp();
                this.fetchCompetitions();
            })
        }else{
            services.insertCompetition(competition).then(() => {
                this.closeComp();
                this.fetchCompetitions();
            })
        }
    }

    confirmDeleting(id){
        this.setState({dialog: {
            id: id,
            text: "Ви впевнені, що хочете видалити це змагання?"
        }})
    }

    cancelDeleting(){
        this.setState({dialog: null});
    }

    deleting(){
        this.setState({isLoading: true});
        services.deleteCompetition({id: this.state.dialog.id}).then(() => {
            this.cancelDeleting();
            this.fetchCompetitions();
        })
    }

    fetchCompetitions(){
        this.setState({isLoading: true});
        services.getAllCompetitions().then(data => {
            this.setState({competitions: JSON.parse(data)});
            this.setState({isLoading: false});
        })
    }

    componentWillMount(){
        this.fetchCompetitions();
    }

    render(){
        return <div>
            <h3>Змагання</h3>
            <CompGrid data={this.state.competitions} onEdit={this.onEdit} onDelete={this.onDelete} />
            <div className="control-panel"><button type="button" onClick={this.onAdd}>Додати</button></div>
            <Modal target={this.state.competition} onClose={this.onClose}>
                <CompForm competition={this.state.competition} onChange={this.onChange} onSave={this.onSave}/>
            </Modal>
            <Dialog dialog={this.state.dialog} onConfirm={this.onConfirm} onClose={this.onCancel} />
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Competitions