//initialize dotenv
require("dotenv").config();
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const bandsintown = require("bandsintown")("codingbootcamp");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

var spotify = new Spotify(keys.spotify);
const action = process.argv[2];
const input = process.argv.slice(3).join(" ");

// switch case statement setting what the user is looking for 
switch (action) {
    case 'concert-this':
        console.log("The next 5 concerts for " + input + " will be at...");
        logWhatItSays();
        searchBandsInTown();
        break;
    case 'spotify-this-song':
        console.log("Searching for... ", input);
        logWhatItSays();
        searchSpotify();
        break;
    case 'movie-this':
        console.log("Searching for..." + input);
        searchMovies();
        logWhatItSays();
        break;
    case 'do-what-it-says':
        console.log("Reading the Random.txt file!");
        doWhatItSays();
        break;
    default:
        console.log("no idea what you are asking for")
};


//Bands in town API
function searchBandsInTown() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(queryUrl)
        .then(function (data) {
            for (var i = 0; i < 5; i++) {
                var date = moment(data.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a');
                console.log("- The " + data.data[i].venue.name + " out in " + data.data[i].venue.city + "," + data.data[i].venue.region + " on " + date);
            }
        }).catch(err => console.log(err))
};

//Spotify API
function searchSpotify() {
    spotify
        .search({ type: 'track', query: input, limit: 1 })
        .then(function (response) {
            console.log("- " + response.tracks.items[0].album.artists[0].name + " made this song!");
            console.log("- The official name is '" + response.tracks.items[0].name + "' and it is off the album " + response.tracks.items[0].album.name + "!");
            console.log("- Click on this link to go check it out on spotify --- " + response.tracks.items[0].album.artists[0].external_urls.spotify);
        }).catch(err => console.log(err));
};

//OMDB Movies API
function searchMovies() {
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&apikey=trilogy&";
    axios.get(queryUrl)
        .then(function (response) {
            console.log("- The movie '" + response.data.Title + "' came out in " + response.data.Year);
            console.log("- Plot: " + response.data.Plot);
            console.log("- Actors: " + response.data.Actors);
            console.log("- IMDB rates it " + response.data.Ratings[0].Value + ", while Rotten Tomatoes gives it a " + response.data.Ratings[1].Value);
            console.log("- Country & Language: " + response.data.Country + "/" + response.data.Language);
        }).catch(err => console.log(err));
};

//Reading the random.txt files and running the code thru the APIs again
function doWhatItSays() {
    fs.readFile("random.txt", "UTF-8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        for (var i = 0; i < dataArr.length; i++) {

            //spotify
            if (dataArr[i] === "spotify-this-song") {
                spotify
                    .search({ type: 'track', query: dataArr[i + 1], limit: 1 })
                    .then(function (response) {
                        (console.log("SPOTIFY SEARCH"))
                        console.log("- " + response.tracks.items[0].album.artists[0].name + " made this song!");
                        console.log("- The official name is '" + response.tracks.items[0].name + "' and it is off the album " + response.tracks.items[0].album.name + "!");
                        console.log("- Click on this link to go check it out on spotify --- " + response.tracks.items[0].album.artists[0].external_urls.spotify);
                    }).catch(err => console.log(err));
            }

            //bandsintown
            if (dataArr[i] === "concert-this") {
                var queryUrl = "https://rest.bandsintown.com/artists/" + dataArr[i + 1] + "/events?app_id=codingbootcamp";
                axios.get(queryUrl)
                    .then(function (data) {
                        console.log("UPCOMING CONCERTS")
                        for (var i = 0; i < 5; i++) {
                            var date = moment(data.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a');
                            console.log("- The " + data.data[i].venue.name + " out in " + data.data[i].venue.city + "," + data.data[i].venue.region + " on " + date);
                        }
                    }).catch(err => console.log(err))
            }

            //OMDB Movies
            if (dataArr[i] === "movie-this") {
                var queryUrl = "http://www.omdbapi.com/?t=" + dataArr[i + 1] + "&apikey=trilogy&";
                axios.get(queryUrl)
                    .then(function (response) {
                        console.log("MOVIE SEARCH")
                        console.log("- The movie '" + response.data.Title + "' came out in " + response.data.Year);
                        console.log("- Plot: " + response.data.Plot);
                        console.log("- Actors: " + response.data.Actors);
                        console.log("- IMDB rates it " + response.data.Ratings[0].Value + ", while Rotten Tomatoes gives it a " + response.data.Ratings[1].Value);
                        console.log("- Country & Language: " + response.data.Country + "/" + response.data.Language);
                    }).catch(err => console.log(err));
            }
        }
    });
};

//saves all the user searches into the log.txt file
function logWhatItSays() {
    fs.appendFile("log.txt", process.argv.slice(2).join(",") + ",", function (err) {
        if (err) {
            return console.log(err);
        }
    });
};