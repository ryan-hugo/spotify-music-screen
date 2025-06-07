const song_name = document.getElementById("music-name");
const band_name = document.getElementById("band-name");
const playlist_name = document.getElementById("playlist-name");
const play = document.getElementById("play");

const audio = document.getElementById("audio");

song_name.innerText = "Chinokate";
band_name.innerText = "Yorushika";

let isPlaying = false;

// audio.pause();   

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    audio.play()
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    audio.pause()
        isPlaying = false;
}


function checkPlayButton(){
   if(isPlaying == true ){
    return pauseSong()
   }
   return playSong()
}
play.addEventListener('click', checkPlayButton);