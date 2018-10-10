# 'which city?' quiz game app

![Screenshot](./assets/react-cinema-screenshot-mobile.png) 
![Screenshot](./assets/react-cinema-screenshot-ipad.png) 

## Objective > what does it do?
**which city?** is a simple quiz game app. Choose a country and try to guess which city it is. It is designed for mobile view and offers a user-friendly experience.

## Functionality > How does it work?
+ The game begins with the user selecting a country 
+ A city of the selected country is chosen randomly
+ The app fetches 10 relevant photos for that city from the [Unsplash photos](http://www.unsplash.com) API
+ Filtering functions ensure that the photos are relevant to the city
+ The app then uses React and SCSS to display the photos 
+ The user then tries to guess the city by going through the photos
+ For each photo that is seen one life is lost
+ When the user finally makes a choice the result and score are displayed
+ If the answer is correct the user can enter their name into the top scores table using localStorage

> [View 'what city?' repo on Github](https://github.com/rolandjlevy/pick-your-own-project/)

## Technology used
+ Unsplash API
+ React
+ Classnames
+ Flex-box
+ SCSS

## Stages of development
+  Set up API and read the **Unsplash API** documentation 
+  Created functionality for the initial search query
+  Created smart pagination, with scrolling to see all results
+  Retrieved the data for selected movie 
+ Used React to display the poster image, year, IMDB rating, director, description etc...
+ Used SCSS to style the UI

## Features
- Use prop-types and stateless components where appropriate.
- Try to use Sass to create a separate stylesheet for each component.
+ Responsive search preview - results are updated each time a letter  is entered and shown below the search box
+ Smart pagination allows users to quickly navigate all pages of the search results

> + if the search input is more or less than 3 letters
> + if the search input has returned a valid result or not
> + How many results and pages of results have been found

## Problems and errors to be fixed
+ Implement the ipad and desktop view for better responsiveness

## Desired features with more time
+ Run some unit testing

+ Allow users to mark movies as favourites and use localStorage to save the favourites into a sortable list
+ Added a featured movies section
+ Include infinate scrolling with the initial results
+ Use the [Youtube API](https://developers.google.com/youtube/v3/) to load a trailer into the detailed results area





