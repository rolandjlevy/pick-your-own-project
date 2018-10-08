import React from 'react';
import '../styles/components/choices.scss';

class Choices extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.getChoice = this.getChoice.bind(this);
        this.createButton = this.createButton.bind(this);
    }

    handleClick(choice, event) {
      this.props.receiveChoice(choice);
      window.location.href = "#controls";
    }

    getChoice(n) {
        if (this.props.choice) {
            if (this.props.choices[n] === this.props.currentCity) { 
                return "choices__col-button-correct" 
            } else { 
                return (this.props.choices[n] === this.props.choice) ? "choices__col-button-wrong" : "choices__col-button-static";
            }
        } else {
            return "choices__col-button-static"
        }
    }

    createButton (choice, number) {
        return <div
            onClick={event => this.handleClick(this.props.choices[number], event)} 
            className={this.getChoice(number)}>
            {choice}: {this.props.choices[number]} 
        </div>
    }

    render () {

        return (
            <div className="choices">

                <div className="choices__header">
                    Which city is it?
                </div>

                <div className="choices__body">

                    <div className="choices__col">
                        {this.createButton("A", 0)}
                        {this.createButton("C", 1)}
                    </div>
                    
                    <div className="choices__col">
                        {this.createButton("B", 2)}
                        {this.createButton("D", 3)}
                    </div>

                </div>
                
            </div>
        )
    }
}


export default Choices;