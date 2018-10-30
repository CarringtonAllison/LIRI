# LIRI

how it works (https://drive.google.com/file/d/1wuxj00EUqLWfHhviOnp_ComGuHj-lbz0/view)

 LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`

* This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue and location
     * Date of the Event 

2. `node liri.js spotify-this-song '<song name here>'`

* This will search the Spotify API for an artist and render the following information about each event to the terminal: 

     * Artist(s)
     * The song's name and the album that the song is from
     * A preview link of the song from Spotify


3. `node liri.js movie-this '<movie name here>'`

* This will search the OMDB API for a movie and render the following information about each event to the terminal:   

     * Title of the movie.
     * Year the movie came out.
     * IMDB Rating of the movie.
     * Rotten Tomatoes Rating of the movie.
     * Country where the movie was produced
     * Language of the movie.
     * Plot of the movie.
     * Actors in the movie.


4. `node liri.js do-what-it-says`
    * Runs the random.txt file attached to the directory for all searches
