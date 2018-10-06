import React from 'react';
import '../styles/components/choices.scss';

class Choices extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.getChoice = this.getChoice.bind(this);
    }

    handleClick(choice, event) {
        this.props.receiveChoice(choice);
    }

    getChoice(n) {
        if (this.props.choice) {
            if (this.props.choices[n] === this.props.currentCity) { 
                return "choices__correct" 
            } else { 
                return (this.props.choices[n] === this.props.choice) ? "choices__wrong" : "choices__col-button";
            }
        } else {
            return "choices__col-button"
        }
    }

    render () {

        const createButton = (choice, number) => {
            return <div 
                onClick={event => this.handleClick(this.props.choices[number], event)} 
                className={this.getChoice(number)}>
                {choice}: {this.props.choices[number]} 
            </div>
        }

        return (
            <div className="choices">

                <div className="choices__header">
                    Which city is this?
                </div>

                <div className="choices__body">

                    <div className="choices__col">
                        {createButton("A", 0)}
                        {createButton("C", 1)}
                    </div>
                    
                    <div className="choices__col">
                        {createButton("B", 2)}
                        {createButton("D", 3)}
                    </div>

                </div>
                {/* <button class='target'>
                    This answer
                    <span>OK</span>
                </button> */}
            </div>
        )
    }
}


export default Choices;