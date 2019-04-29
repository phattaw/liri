// # LIRI Bot

// ### Overview

// In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. 

//  * [Axios](https://www.npmjs.com/package/axios)
const axios = require('axios');
// * [Moment](https://www.npmjs.com/package/moment)
const moment = require('moment');
require("dotenv").config();
let keys = require('./keys.js');
let Spotify = require('node-spotify-api');

var spotifyAPI = new Spotify(keys.spotify);


// Client ID a65cc243f4994dd39fdec156c1ee18a0
// Client Secret 7049413dd8fb433ebe0cd33591f9af3c 

// 1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

// * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

// 3. To retrieve the data that will power this app, you'll need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

//    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   
// ## Submission Guide

// Create and use a standard GitHub repository. As this is a CLI App, 
// it cannot be deployed to GitHub pages or Heroku. 
// This time you'll need to include screenshots, a GIF, and/or a video 
// showing us that you have the app working with no bugs. You can include 
// these screenshots/GIFs or a link to a video in a `README.md` file.

// * Include screenshots (or a GIF/Video) of the typical user flow of your application. Make sure to include the use of Spotify, Bands in Town, and OMDB.

// * Include any other screenshots you deem necessary to help someone who has never been introduced to your application understand the purpose and function of it. This is how you will communicate to potential employers/other developers in the future what you built and why, and to show how it works.

// * Because screenshots (and well-written READMEs) are extremely important in the context of GitHub, this will be part of the grading.

// If you haven't written a markdown file yet, [click here for a rundown](https://guides.github.com/features/mastering-markdown/), or just take a look at the raw file of these instructions.

// * In addition to logging the data to your terminal/bash window, output the 
// * data to a .txt file called `log.txt`.
// * Make sure you append each command you run to the `log.txt` file. 
function logInfo() {

}

liriApp();

function liriApp() {
  if(process.argv.length > 2) {
    let userRequest = process.argv.slice(3).join(" ");
    switch(process.argv[2]) {
      case 'concert-this':
        concertThis(userRequest);
      break;
      case 'spotify-this-song':
        spotifyThisSong(userRequest);
      break;
      case 'movie-this':
        movieThis(userRequest);
      break;
      case 'do-what-it-says':
        doWhatItSays(userRequest);
      break;
    }
  }
}

// * This will search the Bands in Town Artist Events API 
// (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) 
// for an artist and render the following information about each event to the terminal:
// * Name of the venue
// * Venue location
// * Date of the Event (use moment to format this as "MM/DD/YYYY")
function concertThis(userRequest) {
  axios.get("https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=48b6de3b-e02d-4387-a128-c2bebd8cfce6").then(
    function(response) {
      for(let i = 0; i < response.data.length; ++i) {
        console.log(response.data[i].venue.name);
        console.log(response.data[i].venue.city);
        console.log(response.data[i].venue.country);
        let date = moment(response.data[i].datetime).format('MM/DD/YYYY');
        console.log(date);
      }

  });

}

// 2. `node liri.js spotify-this-song '<song name here>'`
//   * This will show the following information about the song in your terminal/bash window
//     * Artist(s)
//     * The song's name
//     * A preview link of the song from Spotify
//     * The album that the song is from
//   * If no song is provided then your program will default to "The Sign" by Ace of Base.
//   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
//   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
//   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
//   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).
function spotifyThisSong(userRequest) {
  console.log('spotifyThisSong');

  let songName = "The Sign";
  if(userRequest && userRequest.length > 0) {
    songName = userRequest;
  }

    spotifyAPI.search({ type: 'track', query: songName }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("Artist: " + data.tracks.items[0].artists[0].name); 
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Spotify URL: " + data.tracks.items[0].external_urls.spotify)
      console.log("Album: " + data.tracks.items[0].album.name); 
  });
}

// 3. `node liri.js movie-this '<movie name here>'`
//   * This will output the following information to your terminal/bash window:
//     ```
//       * Title of the movie.
//       * Year the movie came out.
//       * IMDB Rating of the movie.
//       * Rotten Tomatoes Rating of the movie.
//       * Country where the movie was produced.
//       * Language of the movie.
//       * Plot of the movie.
//       * Actors in the movie.
//     ```

//   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//     * It's on Netflix!
//   * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
function movieThis(userRequest) {
  axios.get(`http://www.omdbapi.com/?t=${userRequest}&y=&plot=short&apikey=trilogy`).then(
    function(response) {
      console.log("Title: " + response.data.title);
      console.log("Year: " + response.data.year)
      console.log("The movie's rating is: " + response.data.imdbRating);

      let rottenTomatoRatingIndex = 0;

      for(let i = 0; i < response.data.Ratings.length; i++) {
        if(response.data.Ratings[i].Source == "Rotten Tomatoes") {
          rottenTomatoRatingIndex = i;
          break;
        }
      }

      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[rottenTomatoRatingIndex].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    });

}

// 4. `node liri.js do-what-it-says`
//   * Using the `fs` Node package, LIRI will take the text inside of random.txt 
//    and then use it to call one of LIRI's commands.
//     * It should run `spotify-this-song` for "I Want it That Way," as follows the text 
//     in `random.txt`.
//     * Edit the text in random.txt to test out the feature for movie-this and concert-this.
function doWhatItSays(userRequest) {

}


