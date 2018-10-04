import React from 'react';
import Search from './Search';
import Countries from './Countries';
import Cities from './Cities';
import '../styles/components/app.scss';

// https://en.wikipedia.org/wiki/Lists_of_cities_by_country

class App extends React.Component {

  constructor(){
    super();

    this.fetchLocations = this.fetchLocations.bind(this);
    this.receiveLocation = this.receiveLocation.bind(this);

    this.state = {
      apikey: 'b4574621f5145340d9c19e14e47c51c674c170b7b564908de5347e95916c8d08',
      baseURL: 'https://api.unsplash.com/search/collections/',
      results: [],
      error: ''
    }
  }

  fetchLocations () {
    const url = `${this.state.baseURL}?query=${this.state.currentCity}&per_page=30&client_id=${this.state.apikey}`;
    fetch(url)
    .then(response => response.json())
    .then(body => {
      this.setState({
        cityUrl: url,
        results: body.results,
        resultsTotal: body.total,
        resultsTotalPages: body.total_pages
      }, () => {
        // console.log(this.state.resultsTotalPages)
        // console.log(this.state.cityUrl)
      });
    });
  }

  receiveLocation (city, country){
    this.setState({
      currentCity: city,
      currentCountry: country
    }, () => this.fetchLocations ())
  }

  render(){
    return (
      <div className="app">
        <div>
          { this.state.results === "hi" && 
            <Search 
              receiveCountry={this.receiveCountry} 
              resultsTotalPages={this.state.resultsTotalPages}
            />
          }
        </div>
        <div>
          { 
            this.state.results && 
            <Countries receiveLocation={this.receiveLocation} />
          }
        </div>
        <div>
        {
          this.state.results && this.state.currentCity && 
          <div>
            <div>{this.state.currentCity} {this.state.currentCountry}</div>
            <div><a href={this.state.cityUrl} target="_blank">link to JSON</a></div>
          </div>
        }
        </div>
        <div>

          { 
            this.state.results && this.state.currentCity &&
            <Cities 
              cityUrl={this.state.cityUrl} 
              currentCity={this.state.currentCity} 
              results={this.state.results}
            />
          }
        </div>
      </div>
    )
  }
}

export default App;
