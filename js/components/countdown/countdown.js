import React from "react";

class Countdown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }

    componentDidMount(){
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    tick(){
        this.setState({
            currentDate: new Date()
        })
    }

    render(){
        if(!this.props.till) return null;
        var endDay = new Date(this.props.till);
        var timeDiff = Math.abs(endDay.getTime() - this.state.currentDate.getTime());
        var diffDays = Math.floor(timeDiff / (1000*3600*24));
        var diffHours = Math.floor((timeDiff % (1000*3600*24))/(1000*3600));
        var diffMin = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var diffSec = Math.floor((timeDiff % (1000 * 60)) / 1000);
        return <div>
            <div>до зміни статусу залишилось:</div>
            <div>{diffDays} д. {diffHours} год. {diffMin} хв. {diffSec} сек.</div>
        </div>
    }
}
export default Countdown;