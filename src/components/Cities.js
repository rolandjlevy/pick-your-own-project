import React from 'react';
import '../styles/components/cities.scss';

function Cities (props) {
    return (
        <div className="city__photos">
            <ul className="city__photos__list">
                <li>
                    <a title={props.currentCity} href={props.cityUrl} target="_blank">
                        <div 
                            className="city__photos__list-img fade" 
                            style={{backgroundImage: `url(${props.image.cover_photo.urls.regular})`}} >
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Cities;