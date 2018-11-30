import React from 'react';
import '../styles/components/cities.scss';
import '../styles/components/loader.scss';

function Cities ({ currentCity, cityUrl, image }) {
    return (
        <div className="city__photos fadein">
            <ul className="city__photos__list">
                <li>
                    <a title={currentCity}>
                        <div 
                            className="city__photos__list-img fade" 
                            style={{backgroundImage: `url(${image.cover_photo.urls.regular})`}} >
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Cities;