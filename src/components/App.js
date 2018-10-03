import React from 'react';
import Search from './Search';
import City from './City';
import '../styles/components/app.scss';

// Zomato documentation: https://developers.zomato.com/documentation

class App extends React.Component {

  constructor(){
    super();

    this.receiveSearchInput = this.receiveSearchInput.bind(this);
    this.receiveSearchSubmit = this.receiveSearchSubmit.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);

    this.state = {
      apikey: '1afcc55ff3633f509165b59aedb2ef71',
      baseURL: 'https://developers.zomato.com/api/v2.1/',
      searchQuery: '',
      results: [],
      error: ''
    }
  }

  /*
  To search for 'Italian' restaurants in 'Manhattan, New York City', set cuisines = 55, entity_id = 94741 and entity_type = zone
To search for 'cafes' in 'Manhattan, New York City', set establishment_type = 1, entity_type = zone and entity_id = 94741
Get list of all restaurants in 'Trending this Week' collection in 'New York City' by using entity_id = 280, entity_type = city and collection_id = 1

  */

  fetchLocations () {
    const resultsCount = 20;
    const url = `${this.state.baseURL}search?entity_id=280&q=${this.state.searchQuery}&order=asc&count=${resultsCount}&apikey=${this.state.apikey}`;
    fetch(url)
    .then(response => response.json())
    .then(body => {
      this.setState({
        results: body.restaurants
      }, () => console.log(this.state.results));
    });
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
        <Search 
          receiveSearchInput={this.receiveSearchInput}
          receiveSearchSubmit={this.receiveSearchSubmit} 
          searchQuery={this.state.searchQuery}
          />
        { this.state.results && <City results={this.state.results}/>
        }
      </div>
    )
  }
}

export default App;
