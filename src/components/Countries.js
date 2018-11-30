import React from 'react';
import '../styles/components/countries.scss';

class Cities extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            europe: {
                UK: ["London", "Manchester", "Brighton", "Cornwall", "Edinburgh", "Liverpool", "Bristol"],
                Spain: ["Madrid", "Barcelona", "Seville", "Valencia", "Granada", "Malaga"],
                Italy: ["Rome", "Venice", "Milan", "Florence", "Naples"],
                France:["Paris", "Marseille", "Lyon"],
                Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
                USA: ["Chicago", "New York", "Washington", "Boston", "Dallas", "Houston", "Philadelphia", "Texas", "Atlanta", "Phoenix", "Detroit", "Miami"],
                Russia: ["Moscow"],
                China: ["Beijing", "Shanghai", "Chengdu", "Guangzhou"],
                Turkey: ["Istanbul"],
                Poland: ["Warsaw"]
            },
            europeFullArrays: {
                UK: ["London", "Manchester", "Brighton", "Cornwall", "Edinburgh", "Liverpool", "Bristol"],
                Spain: ["Madrid", "Barcelona", "Seville", "Valencia", "Granada", "Malaga"],
                Italy: ["Rome", "Venice", "Milan", "Florence", "Naples", "Pisa"],
                France:["Paris", "Marseille", "Bordeaux", "Toulouse", "Lyon", "Montpellier"],
                Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
                USA: ["Chicago", "New York", "Washington", "Boston", "Dallas", "Houston", "Philadelphia", "Texas", "Atlanta", "Phoenix", "Detroit", "Miami"],
                Russia: ["Moscow", "St Petersburg", "Kazan", "Yekaterinburg", "Novosibirsk", "Sochi"],
                China: ["Beijing", "Shanghai", "Chengdu", "Guangzhou", "Hangzhou", "Shenzhen"],
                Turkey: ["Istanbul", "Antalya", "Izmir", "Ankara", "Bodrum", "Konya", "Bursa"],
                Poland: ["Kraków", "Warsaw", "Wrocław", "Gdańsk", "Poznań", "Łódź"],
            }
        }
    }
    
    getClass(country) {
        return (country === this.state.country) ? "country__button-selected" : "country__button-none"
    }

    handleClick (country, event) {
        event.preventDefault();
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
                    { Object.keys(this.state.europe).map(country => {
                        return <li href="#" 
                            className={this.getClass(country)} 
                            key={country} 
                            onClick={(event) => this.handleClick(country, event)}>
                            {country}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Cities;