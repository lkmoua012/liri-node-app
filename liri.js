require("dotenv").config();

//var client = new Twitter(keys.twitter);

var request = require("request");
var nodeArgs = process.argv;
var command = process.argv[2];
var movieName = "";
var song_name = "";

switch(command) {

    case "my-tweets":
    // mytweets();
    mytweets();
    break;

    case "spotify-this-song":
    spotifythissong(song_name);
    break;

    case "movie-this":
    moviethis();
    break;

    case "do-what-it-says":
    // dowhatitsays();
    break;

    default:
    console.log("Please enter a command. my-tweets spotify-this-song movie-this do-what-it-says");

};

function mytweets() {

    var Twitter = require('twitter');
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      });

    var params = {screen_name: 'resrer012'};

    console.log(params);

        client.get('statuses/user_timeline'), params, function(error, tweets, response) {
            
            if (!error) {
                console.log(tweets);
                console.log(response);
            };
        };



};

//function spotifythissong(song_name) {
function spotifythissong(song_name) {

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            song_name = song_name + "+" + nodeArgs[i];

        }

        else {

            song_name += nodeArgs[i];

        }
    };

    if (song_name === "") {

        song_name = "The Sign";
        console.log("Please enter a song after the command. For example, 'spotify-this-song The Sign'.\n");

    };

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

spotify
  .search({ type: 'track', query: song_name, limit: '1' })
  .then(function(response) {
    //console.log(response.tracks.items);

    // Artist Name
    console.log("Artist: " + response.tracks.items[0].album.artists[0].name);

    // Album Name
    console.log("Album: " + response.tracks.items[0].album.name);

    // Song Name
    console.log("Song Title: "+ response.tracks.items[0].name);

    // Preview Link
    console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);

  })
  .catch(function(err) {
    console.log(err);
  });

};

function moviethis() {

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        }

        else {

            movieName += nodeArgs[i];

        }
    };

    if (movieName === "") {

        movieName = "Mr. Nobody";
        console.log("Please enter a movie after the command. For example, 'movie-this Mr. Nobody'.\n");

    };

    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryURL, function(error, response, body){

        if (!error && response.statusCode === 200) {

            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log(response);

        }

    });

};

/* Liri.js should take in the following commands.

my-tweets
    This shows my last 20 tweets and when they were created in my terminal.

spotify-this-song
    This will list an artist, the song name, a preview link, and the album it's from.
    If none is provided, then default will be "The Sign" by Ace of Base.

do-what-it-says
    Read the text inside random.txt and call one of the commands.
    This should run "spotify-this-song."

*/