const song_name = document.getElementById("music-name");
const band_name = document.getElementById("band-name");
const playlist_name = document.getElementById("playlist-name");
const play = document.getElementById("play");

const bodyElement = document.body;
let index = 0;

const audio = document.getElementById("audio");
const imgCover = document.getElementById("img");

const previousButton = document.getElementById("back");
const nextButton = document.getElementById("advance");

const left_right_confusion = {
  song_name: "Left Right Confusion",
  band_name: "Yorushika",
  file: "left-right-confusion",
  background: "linear-gradient(to right,rgb(159, 168, 246),rgb(29, 19, 112))",
};

const chinokate = {
  song_name: "Chinokate",
  band_name: "Yorushika",
  file: "Chinokate",
  background: "linear-gradient(to right,rgb(245, 200, 123),rgb(143, 99, 10))",

};S
const howl_at_the_moon = {
  song_name: "Howl at the Moon",
  band_name: "Yorushika",
  file: "howl-at-the-moon",
  background: "linear-gradient(to right,rgb(37, 22, 81),rgb(69, 68, 4))",

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
  bodyElement.style.background = playlist[index].background;
  audio.src = `songs/${playlist[index].file}.mp3`;
  imgCover.src = `images/${playlist[index].file}.JPG`;
}

function nextSong() {
  if (index === 2) {
    index = 0;
  } else {
    index += 1;
  }
  audio.currentTime = 0; // Reset the song to the beginning
  loadSong();
  playSong();
}
function previousSong() {
  if (index === 0) {
    index = playlist.length - 1;
  } else {
    index -= 1;
  }
  audio.currentTime = 0;
  loadSong();
  playSong();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const time = `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  if (isNaN(seconds)) {
    return "0:00"; 
  }
  return time;
}

function updateSongBar() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  const songBar = document.getElementById("current-progress");
  songBar.style.width = `${progress}%`;
  const currentTimeElement = document.getElementById("current-time");
  const durationElement = document.getElementById("duration"); 
  console.log(currentTime, duration);
  currentTimeElement.innerText = formatTime(currentTime);
  durationElement.innerText = formatTime(duration);
}

loadSong()

play.addEventListener("click", checkPlayButton);
nextButton.addEventListener("click", nextSong);
previousButton.addEventListener("click", previousSong);
audio.addEventListener("timeupdate", updateSongBar);

