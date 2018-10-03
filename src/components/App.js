import React from 'react';
import Search from './Search';
import Countries from './Countries';
import City from './City';
import '../styles/components/app.scss';

// https://en.wikipedia.org/wiki/Lists_of_cities_by_country

class App extends React.Component {

  constructor(){
    super();

    this.receiveSearchInput = this.receiveSearchInput.bind(this);
    this.receiveSearchSubmit = this.receiveSearchSubmit.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
    this.receiveCity = this.receiveCity.bind(this);

    this.state = {
      apikey: 'b4574621f5145340d9c19e14e47c51c674c170b7b564908de5347e95916c8d08',
      baseURL: 'https://api.unsplash.com/search/collections/',
      searchQuery: '',
      results: [],
      error: ''
    }
  }

  fetchLocations (city) {
    const currentCity = city || this.state.searchQuery;
    const url = `${this.state.baseURL}?query=${currentCity}&per_page=30&client_id=${this.state.apikey}`;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(body => {
      this.setState({
        results: body.results,
        resultsTotal: body.total,
        resultsTotalPages: body.total_pages
      }, () => {
        // console.log(this.state.resultsTotalPages)
        // console.log(this.state.results)
      });
    });
  }

  receiveCity (city){
    this.fetchLocations (city)
  }

  receiveSearchSubmit (){
    this.fetchLocations ()
  }

  receiveSearchInput (text){
    this.setState({ searchQuery: text })
  }

  render(){
    return (
      <div className="app">
        <div>
          { this.state.results === "hi" && <Search 
              receiveSearchInput={this.receiveSearchInput}
              receiveSearchSubmit={this.receiveSearchSubmit} 
              receiveCountry={this.receiveCountry} 
              searchQuery={this.state.searchQuery}
              resultsTotalPages={this.state.resultsTotalPages}
            />
          }
        </div>
        <div>
          { 
            this.state.results && <Countries receiveCity={this.receiveCity} />
          }
        </div>
        <div className="city__photos">
          { 
            this.state.results && <City searchQuery={this.state.searchQuery} results={this.state.results}/>
          }
        </div>
      </div>
    )
  }
}

export default App;
