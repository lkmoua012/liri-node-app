require("dotenv").config();

var fs = require("fs");
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
    dowhatitsays();
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

    var params = {screen_name: 'Resrer012', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        for (i = 0; i < 20; i++) {

            console.log("\nDate Created: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text + "\n");

        }

    });

};

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

        }

    });

};

function dowhatitsays() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        };

        var childArray = [];
        var slice1 = 0;
        var slice2 = 2;
        var masterArray = data.split(",");

        for (i = 0; i < masterArray.length / 2; i ++) {

            childArray[i] = masterArray.slice(slice1, slice2);
            slice1+=2;
            slice2+=2;

        };

        var rng = Math.floor(Math.random() * childArray.length);
        var chosendataArray = childArray[rng];

        switch(chosendataArray[0]) {

            case "spotify-this-song":
            console.log("\nRunning spotify-this-song... for " + chosendataArray[1] + "\n");
            spotifythissong(chosendataArray[1]);
            break;

            case "movie-this":
            console.log("\nRunning movie-this... for " + chosendataArray[1] + "\n");
            movieName = chosendataArray[1];
            moviethis();
            break;

        };

    })

};

/*

do-what-it-says
    Read the text inside random.txt and call one of the commands.
    This should run "spotify-this-song."

*/