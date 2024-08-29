// font-family: "Varela Round", sans-serif;

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let coverImg = document.getElementById("coverImg");
let playingGif = document.getElementById("playingGif");
const currentSong = document.getElementById("songHeading");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const currSong = document.getElementById("currSong");
const songItemPlay = Array.from(
  document.getElementsByClassName("songItemPlay")
);

coverImg.style.backgroundImage = "url('man-listen-music-.jpg')";
let songs = [
  {
    songName: "Taaron ka chamakana",
    filepath: "2Taaron ka.mp3",
    coverpath: "2Taaron Ka Chamakta.jpeg",
  },
  {
    songName: "Deewana Kahate",
    filepath: "3Deewana Kehte.mp3",
    coverpath: "3Deewana Kehte Hain.jpeg",
  },
  {
    songName: "Dil Mein Ho Tum",
    filepath: "4Dil Mein Ho Tum.mp3",
    coverpath: "4Dil Mein Ho Tum.jpeg",
  },
  {
    songName: "Mujhko Bada",
    filepath: "5Mujhko Bada.mp3",
    coverpath: "5Mujhko Bada Sataya Gya Female.jpeg",
  },
  {
    songName: "Nadaaniya",
    filepath: "6Nadaaniya.mp3",
    coverpath: "6Nadaaniyan.jpeg",
  },
  {
    songName: "Roya Re",
    filepath: "7Roya.mp3",
    coverpath: "7Roya Re.jpeg",
  },
];

function getAudioDuration(filePath, callback) {
  const audio = new Audio(filePath);

  audio.addEventListener("loadedmetadata", function () {
    const duration = audio.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    callback({
      durationInSeconds: duration,
      durationFormatted: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
    });
  });
}

songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  getAudioDuration(songs[i].filepath, function (result) {
    element.getElementsByClassName("songTime")[0].innerText =
      result.durationFormatted;
  });
});

const handlePlay = () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playingGif.src = "song playing gif.gif";
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    makeAllPause();
    playingGif.src = "gif playing.png";
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
};

function getCurrentSong() {
  let currSong = 0;
  songs.forEach((song, i) => {
    if (song["songName"].localeCompare(currentSong.innerText) === 0) {
      currSong = i;
    }
  });
  return currSong;
}

//Handle play/pause click
masterPlay.addEventListener("click", handlePlay);
next.addEventListener("click", () => {
  let i = getCurrentSong();
  let playable = (i + 1) % 6;
  audioElement.src = songs[playable].filepath;
  coverImg.style.backgroundImage = `url('${songs[playable].coverpath}')`;
  currentSong.innerText = songs[playable].songName;
  currSong.innerText = songs[playable].songName;
  songItemPlay.forEach((e, index) => {
    if (index === i) {
      makeAllPause();
      e.classList.remove("fa-play-circle");
      e.classList.add("fa-pause-circle");
    }
  });
  handlePlay();
  play = true;
});
prev.addEventListener("click", () => {
  let i = getCurrentSong();
  let playable = (i + 5) % 6;
  audioElement.src = songs[playable].filepath;
  coverImg.style.backgroundImage = `url('${songs[playable].coverpath}')`;
  currentSong.innerText = songs[playable].songName;
  currSong.innerText = songs[playable].songName;
  songItemPlay.forEach((e, index) => {
    if (index === playable) {
      makeAllPause();
      e.classList.remove("fa-play-circle");
      e.classList.add("fa-pause-circle");
    }
  });
  handlePlay();
  play = true;
});

// listen to Events
audioElement.addEventListener("timeupdate", () => {
  // update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPause = () => {
  songItemPlay.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
    audioElement.pause();
  });
};

let play = false;
songItemPlay.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    if (!play) {
      makeAllPause();
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = songs[i].filepath;
      playingGif.src = "song playing gif.gif";
      coverImg.style.backgroundImage = `url('${songs[i].coverpath}')`;
      currentSong.innerText = songs[i].songName;
      currSong.innerText = songs[i].songName;
      audioElement.currentTime = 0;
      handlePlay();
      play = true;
    } else {
      e.target.classList.remove("fa-pause-circle");
      e.target.classList.add("fa-play-circle");
      playingGif.src = "gif playing.png";
      handlePlay();
      play = false;
    }
  });
});
