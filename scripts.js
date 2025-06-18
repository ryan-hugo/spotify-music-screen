const song_name = document.getElementById("music-name");
const band_name = document.getElementById("band-name");
const playlist_name = document.getElementById("playlist-name");
const play = document.getElementById("play");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");

const progressBar_container = document.getElementById("progressBar-container");

const bodyElement = document.body;
let index = 0;

const audio = document.getElementById("audio");
const imgCover = document.getElementById("img");

const likeIcon = document.getElementById("like");

const previousButton = document.getElementById("back");
const nextButton = document.getElementById("advance");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");

const left_right_confusion = {
  song_name: "Left Right Confusion",
  band_name: "Yorushika",
  file: "left-right-confusion",
  background: "linear-gradient(to right,rgb(188, 192, 221),rgb(51, 22, 65))",
  isLiked: false,
};

const chinokate = {
  song_name: "Chinokate",
  band_name: "Yorushika",
  file: "Chinokate",
  background: "linear-gradient(to right,rgb(245, 210, 150),rgb(68, 50, 13))",
  isLiked: false,
};

const howl_at_the_moon = {
  song_name: "Howl at the Moon",
  band_name: "Yorushika",
  file: "howl-at-the-moon",
  background: "linear-gradient(to right,rgb(240, 240, 167),rgb(34, 21, 66))",
  isLiked: false,
};

const playlist = [left_right_confusion, chinokate, howl_at_the_moon];

let isPlaying = false;

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
  likeIcon.classList.toggle("bi-heart-fill", playlist[index].isLiked);
  likeIcon.classList.toggle("bi-heart", !playlist[index].isLiked);
  audio.src = `songs/${playlist[index].file}.mp3`;
  imgCover.src = `images/${playlist[index].file}.JPG`;
}

function nextSong() {
  if (index === 2) {
    index = 0;
  } else {
    index += 1;
  }
  audio.currentTime = 0;
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
  // console.log(currentTime, duration)
  currentTimeElement.innerText = formatTime(currentTime);
  durationElement.innerText = formatTime(duration);
  if (currentTime >= duration) {
    nextSong();
  }
}

function updateProgressBar(event) {
  const progressBar = event.target; //
  const progressBarWidth = progressBar.clientWidth; // Get the width of the progress bar
  const clickX = event.offsetX; // Get the X coordinate of the click relative to the progress bar
  const duration = audio.duration; // Get the total duration of the audio
  const newTime = (clickX / progressBarWidth) * duration; // Calculate the new time based on the click position
  audio.currentTime = newTime; // Set the audio's current time to the new time
}

let isShuffled = false;

function shufflePlaylist() {
  if (!isShuffled) {
    playlist.sort(() => Math.random() - 0.5); // Shuffle the playlist randomly
    shuffleButton.classList.add("button-active"); // Add active class to the shuffle button
    isShuffled = true; // Set the shuffle state to true
  } else {
    playlist.sort((a, b) => a.song_name.localeCompare(b.song_name)); // Sort back to original order
    shuffleButton.classList.remove("button-active"); // Remove active class from the shuffle button
    isShuffled = false; // Set the shuffle state to false
  }
  index = 0; // Reset index after shuffling
}

function likeOrDislike() {

  likeIcon.classList.toggle("bi-heart-fill", !playlist[index].isLiked);
  likeIcon.classList.toggle("bi-heart", playlist[index].isLiked);
  if (playlist[index].isLiked) {
    playlist[index].isLiked = false;
    likeIcon.style.color = ""; // Reset color to default
    likeIcon.classList.remove("bi-heart-fill");
    likeIcon.classList.add("bi-heart");
  } else {
    playlist[index].isLiked = true;
    likeIcon.classList.remove("bi-heart");
    likeIcon.classList.add("bi-heart-fill");
  }
}

function repeatSong() {
  repeatButton.classList.toggle("button-active"); // Toggle the active state of the repeat button
    if (repeatButton.classList.contains("button-active")) {
      audio.loop = true; // Enable looping
      if (isPlaying) {
        if (audio.ended) {
          audio.currentTime = 0; // Reset the song to the beginning
          playSong(); // Play the song if it was paused
        }
      }
      else {
        audio.loop = false; // Disable looping if the song is paused
      }
    }
    else {
        audio.loop = false; // Disable looping
    }

}

loadSong();

play.addEventListener("click", checkPlayButton);
nextButton.addEventListener("click", nextSong);
previousButton.addEventListener("click", previousSong);
audio.addEventListener("timeupdate", updateSongBar);
progressBar_container.addEventListener("click", updateProgressBar);
shuffleButton.addEventListener("click", shufflePlaylist);
likeIcon.addEventListener("click", likeOrDislike);
repeatButton.addEventListener("click", repeatSong);
