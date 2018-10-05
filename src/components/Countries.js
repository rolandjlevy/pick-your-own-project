import React from 'react';

class Cities extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            europe: {
                USA: ["Chicago", "New York", "Washington", "Boston", "Dallas", "Houston", "Philadelphia", "Texas", "Atlanta", "Phoenix", "Detroit", "Miami"],
                Russia: ["Moscow"],
                Turkey: ["Istanbul"],
                China: ["Beijing", "Shanghai", "Chengdu", "Guangzhou"],
                Poland: ["Warsaw"]
                // Spain: ["Madrid", "Barcelona", "Seville", "Valencia", "Granada", "Malaga"],
                // Italy: ["Rome", "Venice", "Milan", "Florence", "Naples", "Pisa"],
                // France:["Paris", "Marseille", "Bordeaux", "Toulouse", "Lyon", "Montpellier"],
                // Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"], 
                // UK: ["London", "Manchester", "Brighton", "Cornwall", "Edinburgh", "Liverpool", "Bristol"]
            },
            europeFullArrays: {
                USA: ["Chicago", "New York", "Washington", "Boston", "Dallas", "Houston", "Philadelphia", "Texas", "Atlanta", "Phoenix", "Detroit", "Miami"],
                Russia: ["Moscow", "St Petersburg", "Kazan", "Yekaterinburg", "Novosibirsk", "Sochi"],
                Turkey: ["Istanbul", "Antalya", "Izmir", "Ankara", "Bodrum"],
                China: ["Beijing", "Shanghai", "Chengdu", "Guangzhou"],
                Poland: ["Kraków", "Warsaw", "Wrocław", "Gdańsk", "Poznań"]
            }
        }
    }
    
    getClass(country) {
        return (country === this.state.country) ? "country__button-selected" : "country__button-none"
    }

    handleClick (country, event) {
        const cities = [...this.state.europe[country]];
        const rand = Math.floor(Math.random() * cities.length);
        const city = cities.length ? cities.splice(rand, 1)[0] : null;
        if (city) {
            this.setState({  
                europe: Object.assign({}, this.state.europe, {[country]: cities}),
                country: country
            })
        }
        const europeFullArrays = this.state.europeFullArrays[country];
        this.props.receiveLocation(city, country, europeFullArrays);
    }

    render () {

        return (
            <div>
                <ul className="countries">
                    {
                    Object.keys(this.state.europe).map(country => {
                        return <li href="#" 
                            className={this.getClass(country)} 
                            key={country} 
                            onClick={(event) => this.handleClick(country, event)}>
                            {country}
                        </li>
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default Cities;