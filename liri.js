require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require("moment");

var fs = require("fs");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

//console.log(process.argv);

let command = process.argv[2];
let userInput = process.argv[3];

function concertThis() {
  //let artist = userInput;
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
let artistName = function(artist) {
  return artist.name;
};

function spotifyThis() {
  let songTitle = userInput;
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
      for (let i = 0; i < info.length; i++) {
        console.log("Artist(s): " + info[i].artists.map(artistName));
        fs.appendFileSync(
          "log.txt",
          "Artist(s): " + info[i].artists.map(artistName)
        );

        console.log("Song name: " + info[i].name);
        fs.appendFileSync("log.txt", "Song name: " + info[i].name);

        //console.log("Preview song: " + info[i].preview_url);
      }
    }
  );
}
spotifyThis();

function movieThis() {}

function doWhatItSays() {}
