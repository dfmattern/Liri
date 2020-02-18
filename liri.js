require("dotenv").config();

let keys = require("./keys.js");

let spotify = new Spotify(keys.spotify);

let axios = require("axios");

let moment = require("moment");

let fs = require("fs");

let Spotify = require('node-spotify-api');



//console.log(process.argv);

function concertThis(){
axios
.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
.then(function(response){
    console.log("Venue name:", + response.data);
    //console.log("Venue location:", + response.data);
    
    
})

};
concertThis();

function spotifyThis(){

}

function movieThis(){

}

function dwis (){
    fs.readFile('random.txt', "utf8", function(error,data){
        let txt = data.split(',');

        spotifyThis(txt[1]);
    })
}

