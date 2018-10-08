import React from 'react';
import '../styles/components/cities.scss';

    function Cities ({ currentCity, cityUrl, image }) {
    return (
        <div className="city__photos">
            {/* <div className="city__photos__loader"><img src="../../../assets/loading.gif"></img></div> */}
            <ul className="city__photos__list">
                <li>
                    <a title={currentCity} href={cityUrl} target="_blank">
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