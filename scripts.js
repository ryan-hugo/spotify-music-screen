const song_name = document.getElementById("music-name");
const band_name = document.getElementById("band-name");
const playlist_name = document.getElementById("playlist-name");
const play = document.getElementById("play");
let index = 0;

const audio = document.getElementById("audio");
const imgCover = document.getElementById("img");

const previousButton = document.getElementById("back");
const nextButton = document.getElementById("advance");

const left_right_confusion = {
  song_name: "Left Right Confusion",
  band_name: "Yorushika",
  file: "left-right-confusion",
};
const chinokate = {
  song_name: "Chinokate",
  band_name: "Yorushika",
  file: "Chinokate",
};
const howl_at_the_moon = {
  song_name: "Howl at the Moon",
  band_name: "Yorushika",
  file: "howl-at-the-moon",
};

const playlist = [left_right_confusion, chinokate, howl_at_the_moon];

let isPlaying = false;

// audio.pause();


function playSong() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  audio.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  audio.pause();
  isPlaying = false;
}

function checkPlayButton() {
  if (isPlaying == true) {
    return pauseSong();
  }
  return playSong();
}

function loadSong() {
  song_name.innerText = playlist[index].song_name;
  band_name.innerText = playlist[index].band_name;
  audio.src = `songs/${playlist[index].file}.mp3`;
  imgCover.src = `images/${playlist[index].file}.JPG`;
}

function nextSong() {
  if (index === 2) {
    index = 0;
  } else {
    index += 1;
  }
  loadSong();
  playSong();
}
function previousSong() {
  if (index === 0) {
    index = playlist.length - 1;
  } else {
    index -= 1;
  }
  loadSong();
  playSong();
}

loadSong()

play.addEventListener("click", checkPlayButton);
nextButton.addEventListener("click", nextSong);
previousButton.addEventListener("click", previousSong);
