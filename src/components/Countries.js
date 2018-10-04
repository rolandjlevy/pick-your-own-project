import React from 'react';

class Cities extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            europe: {
                UK: ["London", "Brighton", "Manchester", "Birmingham", "Liverpool", "Glasgow", "Edinburgh"],
                France:["Paris", "Marseille", "Bordeaux", "Lyon", "Montpellier"],
                Spain: ["Madrid", "Barcelona", "Seville", "Granada"],
                Italy: ["Rome", "Venice", "Milan", "Florence", "Naples"],
                Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"]
                // Turkey: [], Greece: [], Poland: []
            }
        }
    }

    handleClick (event) {
        const country = event.target.text;
        const cities = [...this.state.europe[country]];
        const rand = Math.floor(Math.random() * cities.length);
        const city = cities.length ? cities.splice(rand, 1) : null;
        if (city) {
            this.setState({
                europe: Object.assign({}, this.state.europe, {[country]: cities})
            }, () => {
               // console.log(this.state.europe);
            })
        }
        this.props.receiveLocation(city, country);
    }

    render () {

        return (
            <div>
                <ul className="countries">
                    {
                        Object.keys(this.state.europe).map(country => {
                            return <li key={country}><a href="#" onClick={this.handleClick}>{country}</a></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Cities;