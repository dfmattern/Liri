require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require("moment");

var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

//console.log(process.argv);

var command = process.argv[2];
var userInput = process.argv[3];



//Bands in Town-concert this
function concertThis() {
  var artist = userInput;
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log("=========Concert Info for: " + artist + " =========");

      for (let i = 0; i < response.data.length; i++) {
        let name = response.data[i].venue.name;
        console.log("Venue name: " + response.data[i].venue.name);
        fs.appendFileSync(
          "log.txt",
          "Venue name: " + response.data[i].venue.name
        );

        let city = response.data[i].venue.city;
        console.log("Venue location: " + response.data[i].venue.city);
        fs.appendFileSync(
          "log.txt",
          "Venue location: " + response.data[i].venue.city
        );

        let date = moment(response.data[i].datetime).format("MM/DD/YYYY");
        console.log("Event date:" + date);
        fs.appendFileSync("log.txt", "Event date: " + date);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
//concertThis();

function mySwitch(command){

  switch(command){

case "concert-this":
  concertThis();
  break;

  case "spotify-this-song":
    spotifyThis();
    break;

    case "movie-this":
      movieThis();
      break

      case "do-what-it-says":
        doWhatItSays();
        break;

  }


var artistName = function(artist) {
  return artist.name;
};


//Spotify-spotify-this-song
function spotifyThis() {
  var songTitle = userInput;
  if (songTitle === undefined) {
    songTitle = "I Want It That Way";
  }

  spotify.search(
    {
      type: "track",
      query: songTitle
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      //console.log(data.tracks.items);
      info = data.tracks.items;
      for (var i = 0; i < info.length; i++) {
        console.log("Artist(s): " + info[i].artists.map(artistName));
        fs.appendFileSync(
          "log.txt",
          "Artist(s): " + info[i].artists.map(artistName)
        );

        console.log("Song name: " + info[i].name);
        fs.appendFileSync("log.txt", "Song name: " + info[i].name);

        console.log("Artist(s): " + info[i].album.artists[i].name);
        fs.appendFileSync(
          "log.txt",
          "Artist(s): " + info[i].album.artists[i].name
        );

        console.log("Preview song: " + info[i].preview_url);
        fs.appendFileSync("log.txt", +info[i].preview_url);

        console.log("Album name: ", +info[i].album.name);
        fs.appendFileSync("log.txt", +info[i].album.name);
      }
    }
  );
}
//spotifyThis();

//OMDB-movie-this
function movieThis() {
  let movieName = userInput;
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName)
    .then(function(data) {
      if (!movieName) {
        console.log("Mr.Nobody");
        console.log("-------------------");
        console.log(
          "If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/"
        );
        console.log("-------------------");
        console.log("It's on Netflix!!!");
      }

      let movieInfo = `
    Movie Title: ${data.data.Title}
    Year Released: ${data.data.Year}
    IMDB Rating: ${data.data.imdbRating}
    Rotten Tomatoes Rating: ${data.data.Ratings[0].Value}
    Produced in: ${data.data.Country}
    Language: ${data.data.Language}
    Plot: \n${data.data.Plot}
    Actors: \n${data.data.Actors} `;

      console.log(movieInfo);
      fs.appendFileSync("log.txt", movieInfo, "utf8");
    })
    .catch(function(error){
      console.log("There was an error" + error);
      
    })
}
//movieThis();

//Read File-do-what-it-says
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (!error);
    console.log(data.toString());
    var cmds = data.toString().split(',');
  });
}
//doWhatItSays();
}

mySwitch(command);