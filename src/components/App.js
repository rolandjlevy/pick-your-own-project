import React from 'react';
import Countries from './Countries';
import Cities from './Cities';
import Controls from './Controls';
import Choices from './Choices';
import '../styles/components/app.scss';

class App extends React.Component {

  constructor(){
    super();  
    
    this.apikey = 'b4574621f5145340d9c19e14e47c51c674c170b7b564908de5347e95916c8d08';
    this.baseURL = 'https://api.unsplash.com/search/collections/';
    this.keepArray = ["tower", "summer", "explore", "holiday", "street", "village", "town", "urban", "rural", "desert", "mountain", "view", "river", "stream", "field", "beach", "sea", "sunset", "landmark", "architecture", "city", "building", "cathedral", "bridge"];  
    this.ignoreArray = ["wood", "wall", "texture", "glass", "metal"]; // const ignoreArray = ["leaf", "fashion", "table", "coffee", "fish", "computer", "office", "food", "guitar", "music", "sport", "background", "door", "wood", "wallpaper", "wall", "texture", "glass", "metal"];
  
    this.fetchLocations = this.fetchLocations.bind(this);
    this.receiveLocation = this.receiveLocation.bind(this);
    this.controlCurrentPhoto = this.controlCurrentPhoto.bind(this);
    this.cleanCityPhotos = this.cleanCityPhotos.bind(this);
    this.randomiseChoices = this.randomiseChoices.bind(this);
    this.receiveChoice = this.receiveChoice.bind(this);

    this.state = {
      results: [],
      currentPhoto: 0,
      error: ''
    } 
  }

  /* fetch from Unsplash API based on currentCity
  /////////////////////////////////////////////*/

  fetchLocations () {
    const url = `${this.baseURL}?query=${this.state.currentCity}&page=1&per_page=30&client_id=${this.apikey}`;
    fetch(url)
    .then(response => response.json())
    .then(body => {
      this.setState({
        currentPhoto: 0,
        cityUrl: url,
        lives: 10,
        choice: null,
        choices: this.randomiseChoices (),
        results: this.cleanCityPhotos(body.results),
        resultsTotal: body.total,
        resultsTotalPages: body.total_pages,
      });
    });
    this.keepArray.push(this.state.currentCity.toLowerCase());
  }

  /* control photos from <Controls>
  /////////////////////////////////////////////*/

  controlCurrentPhoto (direction) {
      const maxNum = 10;
      let num = this.state.currentPhoto + direction;
      num = num > maxNum-1 ? maxNum-1 : (num < 0 ? 0 : num);
      let lives = this.state.lives;
      lives -= direction === 1 ? 1 : 0;
      this.setState({ 
        currentPhoto: num,
        lives: lives
      })
  }

  /* remove /clean irrelevant photos after fetch
  /////////////////////////////////////////////*/

  cleanCityPhotos (results) {
    const obj = {};
    return results.reduce((acc, item, index, array) => {
        if ( item.cover_photo && (this.keepRelevantImage (item, array.length))) {
            const imgURL = item.cover_photo.urls.regular;
            if (!obj[imgURL]) {
                obj[imgURL] = true;
                acc.push(item);
            }
        }
        return acc;
    }, []);
  }

  keepRelevantImage (image, arrayLength) {
    const imageIsRelevant = image.tags.filter(n => this.keepArray.indexOf(n.title) >= 0).length > 0;
    const imageNotRelevant = image.tags.filter(n => this.ignoreArray.indexOf(n.title) >= 0).length > 0;
    return (arrayLength < 20) ? true : imageIsRelevant && !imageNotRelevant || image.tags == [];
  }

  /* get city and country from <Countries>
  /////////////////////////////////////////////*/

  receiveLocation (city, country, europeFullArrays){
    this.setState({
      currentCity: city,
      currentCountry: country,
      europeFullArrays: europeFullArrays
    }, () => {
      this.fetchLocations ();
    })
  }

  /* randomise choices
  /////////////////////////////////////////////*/

  randomiseChoices () {
    const choicesArray = [...this.state.europeFullArrays];
    const currentCityPos = choicesArray.indexOf(this.state.currentCity);
    choicesArray.splice(currentCityPos, 1);
    let count = 1, choices = [this.state.currentCity];
    while (count++ < 4) {
        const rand = Math.floor(Math.random() * choicesArray.length);
        choices.push(choicesArray.splice(rand, 1)[0]);
    }
    choices.sort((a,b) => Math.floor(Math.random() * choices.length));
    return choices;
  }

  /* set user's choice from <Choices>
  /////////////////////////////////////////////*/

  receiveChoice(choice) {
    this.setState({ choice: choice })
  }

  /* render <Countries> <Cities> <Controls> <Choices>
  /////////////////////////////////////////////*/

  render(){

    const cities =  
      (this.state.results.length && this.state.currentCity) ?
      <Cities 
        results={this.state.results} 
        currentPhoto={this.state.currentPhoto} 
        image={this.state.results[this.state.currentPhoto]}
        currentCity={this.state.currentCity}
        cityUrl={this.state.cityUrl}
      /> : null;

    return (
      <div className="app">
          <div className="intro-message">Choose a country and try to guess the city...</div>
          { 
            this.state.results && 
              <Countries receiveLocation={this.receiveLocation} />
          }
          {cities}
          {
            this.state.results && this.state.currentCity &&
            <Controls 
              controlCurrentPhoto={this.controlCurrentPhoto} 
              currentPhoto={this.state.currentPhoto} 
            />
          }
          {
            this.state.results && this.state.currentCity && this.state.choices &&
            <Choices 
              receiveChoice={this.receiveChoice} 
              choice={this.state.choice} 
              lives={this.state.lives} 
              choices={this.state.choices} 
              currentCity={this.state.currentCity}
            />
          }

      </div>
    )
  }
}

export default App;
