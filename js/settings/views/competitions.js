import React from "react";
import * as services from "../services/services";
import CompGrid from "./partial/competitions.grid";
import Preloader from "../../components/preloader/preloader";
import CompForm from "./partial/competitions.form";
import Modal from "../../components/modal/modal";

class Competitions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            competitions: [],
            isLoading: false,
            competition: null
        }
        this.onEdit = this.chooseComp.bind(this);
        this.onClose = this.closeComp.bind(this);
        this.onChange = this.changeComp.bind(this);
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
            <CompGrid data={this.state.competitions} onEdit={this.onEdit} />
            <Modal target={this.state.competition} onClose={this.onClose}>
                <CompForm competition={this.state.competition} onChange={this.onChange} />
            </Modal>
            <Preloader loading={this.state.isLoading} />
        </div>
    }
}
export default Competitions