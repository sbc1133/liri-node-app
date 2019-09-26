
const fs = require('fs');
const util = require("util");
const writeFile = util.promisify(fs.appendFile);
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

var queryCommand = process.argv[2];
var queryArg = process.argv[3];

function searchSpotify(q) {
    spotify.search({ type: 'track', query: q })

        .then(function (response) {
            var artist = response.tracks.items[0].album.artists[0].name;
            console.log("track Name : ", response.tracks.items[0].name)
            fs.appendFileSync("log.txt", "\t" + "track Name : " + response.tracks.items[0].name + "\n")
            console.log("Artist name : ", response.tracks.items[0].album.artists[0].name);
            fs.appendFileSync("log.txt", "\t" + "Artist name : "+response.tracks.items[0].album.artists[0].name + "\n");
            console.log("Preview link: ", String(response.tracks.items[0].album.artists[0].external_urls.spotify));
            console.log("Album Name : ", response.tracks.items[0].album.name)
            fs.appendFileSync("log.txt", "\t" + "Album Name : "+response.tracks.items[0].album.name + "\n");
            fs.appendFileSync("log.txt", "\t" +"Preview link: "+response.tracks.items[0].album.artists[0].external_urls.spotify + "\n");
            
        }).catch(function (err) {
            console.log(err);
        });
}

/*
function searchConcert(artist_band_name) {
 pending api key 
}
*/

function searchMovie(movie_name) {
    // We then run the request with axios module on a URL with a JSON
    axios.get("http://www.omdbapi.com/?t=" + movie_name + "&apikey=trilogy").then(
        function (response) {
            // Then we print out the imdbRating
            console.log("*******************************");

            console.log("Title : " + response.data.Title);
            fs.appendFileSync("log.txt", "\t" + "Title : " + response.data.Title + "\n");
            console.log("Year: " + response.data.Year);
            fs.appendFileSync("log.txt", "\t" + "Year: " + response.data.Year + "\n");
            console.log("Movie rating : " + response.data.imdbRating);
            fs.appendFileSync("log.txt", "\t" + "Movie rating : " + response.data.imdbRating + "\n");
            console.log("Country : " + response.data.Country);
            fs.appendFileSync("log.txt", "\t" + "Country : " + response.data.Country + "\n");
            console.log("Language : " + response.data.Language);
            fs.appendFileSync("log.txt", "\t" + "Language : " + response.data.Language + "\n");
            console.log("Plot : " + response.data.Plot);
            fs.appendFileSync("log.txt", "\t" + "Plot : " + response.data.Plot + "\n");
            console.log("Actors : " + response.data.Actors);
            fs.appendFileSync("log.txt", "\t" + "Actors : " + response.data.Actors + "\n");
            console.log("*******************************");
        }
    );
}


if (queryCommand === 'spotify-this-song') {
    fs.appendFileSync("log.txt", queryCommand + "\t" + queryArg + "\n")
    if (queryArg === undefined) {
        fs.appendFileSync("log.txt", "\t\t" + " command argument missing, default value will be used");

        var randomContent = fs.readFileSync("random.txt", "utf8", function (error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
        })
        var query = randomContent.split(",")[1];
        searchSpotify(query)
    } else {
        searchSpotify(queryArg)
    }
} else if (queryCommand === 'movie-this') {
    fs.appendFileSync("log.txt", queryCommand + "\t" + queryArg + "\n")
    if (queryArg === undefined) {
        fs.appendFileSync("log.txt", "\t\t" + " command argument missing, default value will be used"+"\n")
        searchMovie("Mr. Nobody")
    } else {
        searchMovie(queryArg)
    }
}


