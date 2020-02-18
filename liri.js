require("dotenv").config();

let keys = require("./keys.js");

let spotify = new Spotify(keys.spotify);

let axios = require("axios");

let moment = require("moment");

let 

//console.log(process.argv);

fucntion concertThis(){


};

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

