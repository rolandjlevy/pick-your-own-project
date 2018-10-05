import React from 'react';

class Choices extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            choice: null
        }
    }

    // componentDidMount () {
    // }

    handleClick(choice, event) {
        // console.log(choice);
        // console.log(this.props.currentCity);
        this.setState({
            choice: choice
        })
    }

    render () {

        return (
            <div className="choices">
               
               <div className="choices__header">
                    Which city is this?
                </div>
                <div className="choices__body">
                    <div className="choices__col1">
                        <div 
                            onClick={event => this.handleClick(this.props.answers[0], event)} 
                            className="choices__col1-button">
                            A: {this.props.answers[0]} {this.state.choice && (this.props.answers[0] === this.props.currentCity ? "CORRECT!" : (this.state.choice === this.props.answers[0] ? "x" : null)) }
                        </div>
                        <div 
                            onClick={event => this.handleClick(this.props.answers[1], event)} 
                            className="choices__col1-button">
                            C: {this.props.answers[1]} {this.state.choice && (this.props.answers[1] === this.props.currentCity ? "CORRECT!" : (this.state.choice === this.props.answers[1] ? "x" : null)) }
                        </div>
                    </div>
                    <div className="choices__col2">
                        <div 
                            onClick={event => this.handleClick(this.props.answers[2], event)} 
                            className="choices__col2-button">
                            B: {this.props.answers[2]} {this.state.choice && (this.props.answers[2] === this.props.currentCity ? "CORRECT!" : (this.state.choice === this.props.answers[2] ? "x" : null)) }
                        </div>
                        <div 
                            onClick={event => this.handleClick(this.props.answers[3], event)} 
                            className="choices__col2-button">
                            D: {this.props.answers[3]} {this.state.choice && (this.props.answers[3] === this.props.currentCity ? "CORRECT!" : (this.state.choice === this.props.answers[3] ? "x" : null)) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Choices;