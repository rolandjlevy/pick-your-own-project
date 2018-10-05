import React from 'react';

class Controls extends React.Component {
    constructor() {
        super();
        this.handleControls = this.handleControls.bind(this);
        this.getLives = this.getLives.bind(this);
    } 

    handleControls (direction, event) {
        this.props.controlCurrentPhoto(direction);
    }

    getLives() {
        const num = this.props.currentPhoto;
        const percentage = num === 10 ? 100 : 100 - (num * 10);
        return percentage + "%";
    }

    render () {
        
        return (
            <div className="controls__container">
                {/* <div className="controls__buttons">
                    <a href="#" id="-1" onClick={this.handleControls}>&lt;</a>{this.props.currentPhoto + 1}<a href="#" id="1" onClick={this.handleControls}>&gt;</a>
                </div> */}

                <div className="controls__buttons">
                    <a href="#" onClick={event => this.handleControls(-1, event)}>
                        <i className="fas fa-angle-double-left fa-inverse"></i>
                    </a> 
                    {/* <div className="controls__currentphoto">{this.props.currentPhoto + 1}</div> */}

                    <a href="#" onClick={event => this.handleControls(1, event)}>
                        <i className="fas fa-angle-double-right fa-inverse"></i>
                    </a>
                </div>

                <div className="scrore__tries__container">
                    <div style={{width: this.getLives()}} className="scrore__tries__bar scrore__tries__text">
                    {10 - this.props.currentPhoto} 
                    &nbsp;{this.props.currentPhoto + 1 === 10 ? `life` : `lives`}</div>
                </div>
            </div>
        )
    }
}

export default Controls;