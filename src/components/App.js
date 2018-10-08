import React from 'react';
import Countries from './Countries';
import Cities from './Cities';
import Controls from './Controls';
import Choices from './Choices';
import Score from './Score';
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
        this.addFavourites = this.addFavourites.bind(this);
        this.displayFavourites = this.displayFavourites.bind(this);

        this.state = {
            results: [],
            currentPhoto: 0,
            lives: 10,
            error: '',
            favourites: []
        }

        // localStorage.clear();
    }

    componentDidMount(){
        const favourites = window.localStorage.getItem('favourites');
        const favouritesArray = favourites ? JSON.parse(favourites) : [];
        this.setState({
            favourites: favouritesArray
        });
    }

    displayFavourites () {
        return [...this.state.favourites].sort( (a, b) => b.score - a.score);
    }

    addFavourites(name) {
        const date = new Date();
        const addZero = n => n < 10 ? `0${n}` : n;
        const formattedDate = `${addZero(date.getDay())}-${addZero(date.getMonth())}-${date.getFullYear()}`;
        const score = {name, score: this.state.lives * 10, date: formattedDate};
        this.setState({
            favourites: this.state.favourites.concat(score)
        }, () => {
            window.localStorage.setItem('favourites', JSON.stringify(this.state.favourites));
            console.log(this.displayFavourites());
        });
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
                prevPhoto: 0,
                choice: null,
                choiceSubmitted: null,
                choices: this.randomiseChoices (),
                results: this.cleanCityPhotos(body.results)
            });
        });
        this.keepArray.push(this.state.currentCity.toLowerCase());
    }

    /* control photos from <Controls>
    /////////////////////////////////////////////*/

    controlCurrentPhoto (direction) {
        if (!this.state.choiceSubmitted) {
            const maxNum = 10;
            let num = this.state.currentPhoto + direction;
            num = num > maxNum-1 ? maxNum-1 : (num < 0 ? 0 : num);
            this.setState({ currentPhoto: num });
            if (direction === 1 && num > this.state.prevPhoto) {
                let lives = this.state.lives;
                lives--;
                this.setState({ lives: lives, prevPhoto: num })
            }
        }
    }

    /* remove / clean irrelevant photos after fetch
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

    /* set user's choice from <Choices> and display final score
    /////////////////////////////////////////////*/

    receiveChoice(choice) {
        (!this.state.choiceSubmitted) &&
        this.setState({
            choice: choice,
            choiceSubmitted: true
        })
    }

    /* render <Countries> <Cities> <Controls> <Choices> and score
    //////////////////////////////////////////////////////////////*/

    render(){

        const countries = 
        (this.state.results) ?
        <Countries 
            receiveLocation={this.receiveLocation} 
        /> : null;

        const cities =  
        (this.state.results.length && this.state.currentCity) ?
        <Cities 
            results={this.state.results} 
            currentPhoto={this.state.currentPhoto} 
            image={this.state.results[this.state.currentPhoto]}
            currentCity={this.state.currentCity}
            cityUrl={this.state.cityUrl}
        /> : null;

        const controls = 
        (this.state.results && this.state.currentCity) ?
        <Controls 
            controlCurrentPhoto={this.controlCurrentPhoto} 
            currentPhoto={this.state.currentPhoto} 
            lives={this.state.lives} 
        /> : null;

        const choices = 
        (this.state.results && this.state.currentCity && this.state.choices) ?
        <Choices 
            receiveChoice={this.receiveChoice} 
            choice={this.state.choice} 
            choices={this.state.choices} 
            currentCity={this.state.currentCity}
        /> : null;  

        const score = 
        (this.state.choiceSubmitted) ?
        <Score 
            // {...this.state}
            choice={this.state.choice} 
            currentCity={this.state.currentCity}
            lives={this.state.lives}
            receiveScore={this.receiveScore}
            addFavourites={this.addFavourites}
        /> : null;

        return (
            <div className="app">

            <div className="intro-message">
                Choose a country and guess the city
            </div>

                { countries }
                { cities }
                { controls }
                { choices }
                { score }

            </div>
        )
    }
}

export default App;
