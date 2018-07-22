var dotenv = require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// var client = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var search = process.argv[3];

switch (command) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      spotifyThisSong();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }

function myTweets() {
    // `my-tweets` This will show your last 20 tweets and when they were created at in your terminal/bash window.
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error) {
            console.log('Error occurred: ' + error);
        }
        for (var prop in tweets) {
            console.log(`\nTweet: ${tweets[prop].text}\nCreated on: ${tweets[prop].created_at}`);  // The favorites.
        }
      });
}
function spotifyThisSong() {
    // `spotify-this-song` then '<song name here>'
    if (search == null) {
        spotify
        .request('https://api.spotify.com/v1/search?q=artist:ace+of+base&type=track')
        .then(function(data) {
            console.log(`Track name: ${data.tracks.items[0].name}\nArtist(s): ${data.tracks.items[0].artists[0].name}\nAlbum: ${data.tracks.items[0].album.name}\nPreview: ${data.tracks.items[0].preview_url}`) 
        })
        .catch(function(err) {
        console.error('Error occurred: ' + err); 
  });
    }
    else {
        spotify
        .search({ type: 'track', query: search })
        .then(function(response) {
            console.log(`Track name: ${response.tracks.items[0].name}\nArtist(s): ${response.tracks.items[0].artists[0].name}\nAlbum: ${response.tracks.items[0].album.name}\nPreview: ${response.tracks.items[0].preview_url}`)
            // console.log(JSON.stringify(response, null, 2));
        })
        .catch(function(err) {
            console.log(err);
        });
    }
}
function movieThis() {
    // if ... `movie-this` then something 
    if (search == null) {
        search = 'Mr. Nobody'
    }
    request(`http://www.omdbapi.com/?apikey=trilogy&t=${search}&tomatoes=True`, function (error, response, body) {
        if (error) {
            console.log('Error occurred: ' + error); // Print the error if one occurred
        }
        var ratings = JSON.parse(body).Ratings;
        var rottenTomatoes = '';
        for (var i = 0; i < ratings.length; i++) {
            if (ratings[i].Source == "Rotten Tomatoes") {
                rottenTomatoes = ratings[i].Value;
            }
        }
        console.log(`Title: ${JSON.parse(body).Title}\nRelease year: ${JSON.parse(body).Year}\nIMDB Rating: ${JSON.parse(body).imdbRating}\nRotten Tomatoes Rating: ${rottenTomatoes}\nCountry: ${JSON.parse(body).Country}\nLanguage: ${JSON.parse(body).Language}\nPlot: ${JSON.parse(body).Plot}\nCast: ${JSON.parse(body).Actors}\n`);
    })
}
function doWhatItSays() {
    // if ... `do-what-it-says` then something
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log('Error occurred: ' + error);
        }
        
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        
        command = dataArr[0];
        search = dataArr[1];
        switch (command) {
            case "my-tweets":
              myTweets();
              break;
            
            case "spotify-this-song":
              spotifyThisSong();
              break;
            
            case "movie-this":
              movieThis();
              break;
            
            case "do-what-it-says":
              doWhatItSays();
              break;
            }
      });
}

