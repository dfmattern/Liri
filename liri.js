require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

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

