import React from 'react';

class City extends React.Component {
    constructor() {
        super();
    }

    render () {

        return (
            <div className="search__city">
                <ul>
                {this.props.results.map(item => {
                    const description = `${item.restaurant.name}, ${item.restaurant.location.city}`
                    return <li key={item.restaurant.id}>
                        <div>
                            <img src={item.restaurant.thumb} />
                        </div>
                        <div>
                            <a href="#">{description}</a>
                        </div>
                        </li>
                })}
                </ul>
            </div>
        )
    }
}

export default City;