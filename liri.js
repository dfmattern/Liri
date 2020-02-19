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
  let artist = userInput;
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

function spotifyThis() {
  let songTitle = userInput;
  if (!songTitle){
      songTitle = "I Want It That Way";
  }
  
  
}
spotifyThis();

function movieThis() {}

function dwis() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    let txt = data.split(",");

    spotifyThis(txt[1]);
  });
}
