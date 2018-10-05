import React from 'react';

class Choices extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.getChoice = this.getChoice.bind(this);

        this.state = {
            choice: null
        }
    }

    handleClick(choice, event) {
        this.props.receiveChoice(choice);
    }

    getChoice(n) {
        if (this.props.choice) {
            if (this.props.answers[n] === this.props.currentCity) { 
                return "choices__correct" 
            } else { 
                return (this.props.answers[n] === this.props.choice) ? "choices__wrong" : "choices__col-button";
            }
        } else {
            return "choices__col-button"
        }
    }

    render () {

        return (
            <div className="choices">
               
               <div className="choices__header">
                    Which city is this?
                </div>
                <div className="choices__body">
                    <div className="choices__col">
                        <div 
                            onClick={event => this.handleClick(this.props.answers[0], event)} 
                            className={this.getChoice(0)}>
                            A: {this.props.answers[0]} 
                        </div>
                        <div 
                            onClick={event => this.handleClick(this.props.answers[1], event)} 
                            className={this.getChoice(1)}>
                            C: {this.props.answers[1]}
                        </div>
                    </div>
                    <div className="choices__col">
                        <div 
                            onClick={event => this.handleClick(this.props.answers[2], event)} 
                            className={this.getChoice(2)}>
                            B: {this.props.answers[2]} 
                        </div>
                        <div 
                            onClick={event => this.handleClick(this.props.answers[3], event)} 
                            className={this.getChoice(3)}>
                            D: {this.props.answers[3]} 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Choices;