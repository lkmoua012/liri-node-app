require("dotenv").config();

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

var request = require("request");
var nodeArgs = process.argv;
var command = process.argv[2];
var movieName = "";

switch(command) {

    case "my-tweets":
    // mytweets();
    console.log("This should run mytweets()");
    break;

    case "spotify-this-song":
    // spotifythissong();
    break;

    case "movie-this":
    moviethis();
    break;

    case "do-what-it-says":
    // dowhatitsays();
    break;

    default:
    console.log("Please enter a command. my-tweets spotify-this-song movie-this do-what-it-says")

};

function spotifythissong(song_name) {

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

/* Liri.js should take in the following commands.

my-tweets
    This shows my last 20 tweets and when they were created in my terminal.

spotify-this-song
    This will list an artist, the song name, a preview link, and the album it's from.
    If none is provided, then default will be "The Sign" by Ace of Base.

movie-this
    This outputs...
    Title
    Year
    IMDB Rating
    RT Rating
    Country of Origin
    Language
    Plot
    Actors

    If none is provided, it will output Mr. Nobody.

do-what-it-says
    Read the text inside random.txt and call one of the commands.
    This should run "spotify-this-song."

*/