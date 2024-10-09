import React, {Component} from "react";

class Timer extends Component
{
    constructor(props)
    {   
        super(props);
        const { targetDate } = this.props;
        const targetTime = new Date(targetDate).getTime();
        this.interval = "";
        this.state = {
            timeRemaining: targetTime - Date.now(), // TEMPO RESTANTE, DATA RECEBIDA MENOS DATA ATUAL
        }
    }


    componentDidMount()
    {
        this.interval = setInterval(() => {
            const { targetDate } = this.props;
            const targetTime = new Date(targetDate).getTime();
            const timeRemaining = targetTime - Date.now();

            if(timeRemaining <= 0)
            {
                clearInterval(this.interval);
                this.setState({
                    timeRemaining: 0
                })
            }
            else
            {
                this.setState({ timeRemaining });
            }
        }, 1000);
    }


    componentWillUnmount()
    {
        clearInterval(this.interval);
    }


    formatTime(time)
    {
        const total = Math.floor(time / 1000);
        const minutes = Math.floor(total / 60).toString().padStart(2, "0");
        const seconds = (total % 60).toString().padStart(2, "0");

        return `${minutes}:${seconds}`;
    }


    render()
    {
        const { timeRemaining } = this.state;

        return (
            <>
                {timeRemaining > 0 ? (
                    <strong>{this.formatTime(timeRemaining)}</strong>
                ) : (
                    <strong>Tempo esgotado!</strong>
                )}
            </>
        )
    }
}
export default Timer;