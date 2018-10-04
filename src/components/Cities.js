import React from 'react';

class Cities extends React.Component {
    constructor() {
        super();
    }

    render () {
        
        return (

            <div className="city__photos">
                <ul className="city__photos__list">
                {
                    this.props.results.map(item => {
                        return <li key={item.id}>
                            <div className="city__photos__list-img" style={{backgroundImage: `url(${item.cover_photo.urls.regular})`}} >
                                <a href={item.cover_photo.links.html}>{item.title}</a>
                            </div>
                        </li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default Cities;