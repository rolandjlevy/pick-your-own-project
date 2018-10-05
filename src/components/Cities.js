import React from 'react';

class Cities extends React.Component {
    constructor() {
        super();
    }

    render () {
        
        return (

            <div className="city__photos">
                <ul className="city__photos__list">
                    <li>
                        {/* href={this.props.image.cover_photo.links.html */}
                        <a title={this.props.currentCity} href={this.props.cityUrl} target="_blank">
                            <div className="city__photos__list-img fade" style={{backgroundImage: `url(${this.props.image.cover_photo.urls.regular})`}} >
                            </div>
                        </a>
                        
                    </li>
                </ul>
            </div>
        )
    }
}

export default Cities;