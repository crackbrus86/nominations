import React from "react";

class Inform extends React.Component{
    render(){
        if(!this.props.inform) return null;
        return <div className="blackout">
            <div className="inform">
                <div className="inform-header">
                    <div className="icons">
                        <i className="fa fa-lg fa-times" onClick={this.props.onClose}></i>
                    </div>
                </div>
                <div className="inform-body">
                    {this.props.inform.text}
                </div>           
            </div>
        </div>
    }
}
export default Inform;