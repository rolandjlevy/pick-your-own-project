import React from 'react';
import Countries from './Countries';
import Cities from './Cities';
import Controls from './Controls';
import '../styles/components/app.scss';

// https://en.wikipedia.org/wiki/Lists_of_cities_by_country

class App extends React.Component {

  constructor(){
    super();

    this.fetchLocations = this.fetchLocations.bind(this);
    this.receiveLocation = this.receiveLocation.bind(this);
    this.controlCurrentPhoto = this.controlCurrentPhoto.bind(this);
    this.cleanCityPhotos = this.cleanCityPhotos.bind(this);
    
    this.apikey = 'b4574621f5145340d9c19e14e47c51c674c170b7b564908de5347e95916c8d08';
    this.baseURL = 'https://api.unsplash.com/search/collections/';
    this.keepArray = ["tower", "summer", "explore", "holiday", "street", "village", "town", "urban", "rural", "desert", "mountain", "view", "river", "stream", "field", "beach", "sea", "sunset", "landmark", "architecture", "city", "building", "cathedral"];  
    this.ignoreArray = ["wood", "wall", "texture", "glass", "metal"]; // const ignoreArray = ["leaf", "fashion", "table", "coffee", "fish", "computer", "office", "food", "guitar", "music", "sport", "background", "door", "wood", "wallpaper", "wall", "texture", "glass", "metal"];
  
    this.state = {
      results: [],
      currentPhoto: 1,
      error: ''
    } 
  }

  fetchLocations () {
    const url = `${this.baseURL}?query=${this.state.currentCity}&page=1&per_page=30&client_id=${this.apikey}`;
    fetch(url)
    .then(response => response.json())
    .then(body => {
      this.setState({
        cityUrl: url,
        results: this.cleanCityPhotos(body.results),
        resultsTotal: body.total,
        resultsTotalPages: body.total_pages
      });
    });
  }

  keepRelevantImage (image) {
    const imageIsRelevant = image.tags.filter(n => this.keepArray.indexOf(n.title) >= 0).length > 0;
    const imageNotRelevant = image.tags.filter(n => this.ignoreArray.indexOf(n.title) >= 0).length > 0;
    return imageIsRelevant && !imageNotRelevant || image.tags == [];
  }

  controlCurrentPhoto (direction) {
    this.setState({
      currentPhoto: this.state.currentPhoto + parseInt(direction)
    }, () => this.fetchLocations ())
  }

  cleanCityPhotos (results) {
    const obj = {};
    return results.reduce((acc, item) => {
        if (item.cover_photo && this.keepRelevantImage (item)) {
            const imgURL = item.cover_photo.urls.regular;
            if (!obj[imgURL]) {
                obj[imgURL] = true;
                acc.push(item);
            }
        }
        return acc;
    }, []);
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
          { 
            this.state.results && <Countries receiveLocation={this.receiveLocation} />
          }
        </div>

        <div>
        {
          this.state.results && this.state.currentCity && 
          <div>
            <div>{this.state.currentCity}, {this.state.currentCountry}</div>
            <div>{this.state.resultsTotalPages} of {this.state.resultsTotal}</div>
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

        <div>
          {
            this.state.results && this.state.currentCity &&
            <Controls 
              currentPhoto={this.state.currentPhoto} 
              controlCurrentPhoto={this.controlCurrentPhoto} 
            />
          }
        </div>

      </div>
    )
  }
}

export default App;
