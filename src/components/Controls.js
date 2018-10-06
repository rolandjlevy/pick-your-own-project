import React from 'react';
import '../styles/components/controls.scss';

class Controls extends React.Component {
    constructor() {
        super();
        this.handleControls = this.handleControls.bind(this);
        this.getLives = this.getLives.bind(this);
    } 

    handleControls (direction, event) {
        event.preventDefault();
        this.props.controlCurrentPhoto(direction);
    }

    getLives() {
        // console.log("getLives: " + this.props.lives);
        const num = this.props.lives;
        const percentage = num === 10 ? 100 : (num * 10);
        return percentage + "%";
    }

    render () {
        
        return (
            <div className="controls__container">
                <div className="controls__buttons">
                    <a href="#" onClick={event => this.handleControls(-1, event)}>
                        <i className="fas fa-angle-double-left fa-inverse"></i>
                    </a> 
                    <a href="#" onClick={event => this.handleControls(1, event)}>
                        <i className="fas fa-angle-double-right fa-inverse"></i>
                    </a>
                </div>

                <div className="scrore__tries__container">
                    <div style={{width: this.getLives()}} className="scrore__tries__bar scrore__tries__text">
                    {this.props.lives} 
                    &nbsp;{this.props.lives === 1 ? `life` : `lives`}</div>
                </div>
            </div>
        )
    }
}

export default Controls;