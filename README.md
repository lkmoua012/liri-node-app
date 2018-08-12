# liri-node-app

This is the Liri Node App, taking user input, returning appropriate information based on the command, and logging the results into a log.txt file. Note that using this application **requires the user to provide their own dotenv file containing keys for the Twiiter API and Spotify API.**

There are currently four commands implemented in this build of LIRI.

1. my-tweets
2. spotify-this-song
3. movie-this
4. do-what-it-says

## **my-tweet**

This command pulls the last 20 tweets and their dates published from the specified username.

> node liri.js my-tweet *username*

If none is specified, it will display a message and provide an example.

## **spotify-this-song**

This command pulls information from Spotify when the user provides a track song. If none is provided, it will display a message and provide an example.

* Artist
* Album
* Song Title
* Preview Link

> node liri.js spotify-this-song *song title*

## **movie-this**

This command pulls information from OMDB when the user provides a film title. If none is provided, it will display a message and provide an example.

* Movie Title
* Release Year
* IMDB Rating
* Rotten Tomatoes Rating
* Country
* Language
* Plot
* Actors

> node liri.js movie-this *movie title*

## **do-what-it-says**

This command reads information from the random.txt file, randomly chooses the defined parameters, and runs a command according to the arguments specified. To add a new parameter, open the random.txt file and add them accordingly.

> *command,search term*

>node liri.js do-what-it-says