import React from 'react';
import '../styles/components/score.scss';

class Score extends React.Component {
    constructor () {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderScore = this.renderScore.bind(this);

        this.state = {
            input: ""
        }
    }

    handleSubmit (event) {
        event.preventDefault();
        this.state.input.length && this.props.addFavourites(this.state.input);
    }

    handleChange (event) {
        this.state.input =  event.target.value;
    }

    renderScore() {
        const won = this.props.choice == this.props.currentCity ? 1 : 0;
        const result = won ? 
            `Correct answer! with ${this.props.lives} ${this.props.lives === 1 ? `life` : `lives`} left you scored ${this.props.lives * 10} out of 100 points. Please add your name to the top scores.`
            : `Wrong answer, you scored 0 points`;
    
        return <div className="score fadein">
                    <div className="score__header">
                        Your score
                    </div>
                    <div className="score__body">
                        <div>
                            {result}
                        </div>
                        { won ? 
                            <form onSubmit={this.handleSubmit}>
                                <input 
                                    onChange={this.handleChange}
                                    className="score__body__input" 
                                    placeholder="Enter your name" 
                                    autoComplete="off" 
                                    id="name"
                                />
                                <button 
                                    className="score__body__submit"
                                    type="submit">
                                    Submit
                                </button>
                            </form> : null
                        }
                    </div>
                </div>
    }

    render () {
        return (
            this.renderScore()
        )
    }
}

export default Score;