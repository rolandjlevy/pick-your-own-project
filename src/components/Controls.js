import React from 'react';
import '../styles/components/controls.scss';

function Controls ({ controlCurrentPhoto, lives  }) {

    function handleControls (direction, event) {
        event.preventDefault();
        controlCurrentPhoto(direction);
    }

    function getLives() {
        const num = lives;
        const percentage = num === 10 ? 100 : (num * 10);
        return percentage + "%";
    }
        
    return (
        <div id="controls" className="controls__container">
            <div className="controls__buttons">
                <a href="#" onClick={event => handleControls(-1, event)}>
                    <i className="fas fa-angle-double-left fa-inverse"></i>
                </a> 
                <a href="#" onClick={event => handleControls(1, event)}>
                    <i className="fas fa-angle-double-right fa-inverse"></i>
                </a>
            </div>

            <div className="score__tries__container">
                    <div style={{width: getLives()}} className="score__tries__bar score__tries__text">
                    {lives}&nbsp;{lives === 1 ? `life` : `lives`}</div>
                </div>
        </div>
    )
}

export default Controls;