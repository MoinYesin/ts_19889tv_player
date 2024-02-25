let isPlaying = false;
let currentSongIndex = 0;
const audioElement = document.getElementById('myAudio');
const seekBar = document.querySelector('.seek-bar');
const coverArtElement = document.getElementById('coverArt');
const songQueue = [
  { src: "01 Welcome To New York.mp3", cover: '1989TV.webp', title: "Welcome To New York (Taylor's Version)" },
  { src: "02 Blank Space.mp3", cover: '1989TV.webp', title: "Blank Space (Taylor's Version)" },
  { src: "03 Style.mp3", cover: '1989TV.webp', title: "Style (Taylor's Version)" },
  { src: "04 Out Of The Woods.mp3", cover: '1989TV.webp', title: "Out Of The Woods (Taylor's Version)" },
  { src: "05 All You Had To Do Was Stay.mp3", cover: '1989TV.webp', title: "All You Had To Do Was Stay (Taylor's Version)" },
  { src: "06 Shake It Off.mp3", cover: '1989TV.webp', title: "Shake It Off (Taylor's Version)" },
  { src: "07 I Wish You Would.mp3", cover: '1989TV.webp', title: "I Wish You Would (Taylor's Version)" },
  { src: "08 Bad Blood.mp3", cover: '1989TV.webp', title: "Bad Blood (Taylor's Version)" },
  { src: "09 Wildest Dreams.mp3", cover: '1989TV.webp', title: "Wildest Dreams (Taylor's Version)" },
  { src: "10 How You Get The Girl.mp3", cover: '1989TV.webp', title: "How You Get The Girl (Taylor's Version)" },
  { src: "11 This Love.mp3", cover: '1989TV.webp', title: "This Love (Taylor's Version)" },
  { src: "12 I Know Places.mp3", cover: '1989TV.webp', title: "I Know Places (Taylor's Version)" },
  { src: "13 Clean.mp3", cover: '1989TV.webp', title: "Clean (Taylor's Version)" },
  { src: "14 Wonderland.mp3", cover: '1989TV.webp', title: "Wonderland (Taylor's Version)" },
  { src: "15 You Are In Love.mp3", cover: '1989TV.webp', title: "You Are In Love (Taylor's Version)" },
  { src: "16 New Romantics.mp3", cover: '1989TV.webp', title: "New Romantics (Taylor's Version)" },
  { src: "17 Slut - Taylors Version From The Vault.mp3", cover: '1989TV.webp', title: '"Slut!" (Taylors Version) (From The Vault)' },
  { src: "18 Say Dont Go.mp3", cover: '1989TV.webp', title: "Say Dont Go (Taylor's Version) (From The Vault)" },
  { src: "19 Now That We Dont Talk.mp3", cover: '1989TV.webp', title: "Now That We Dont Talk (Taylor's Version) (From The Vault)" },
  { src: "20 Suburban Legends.mp3", cover: '1989TV.webp', title: "Suburban Legends (Taylor's Version) (From The Vault)" },
  { src: "21 Is It Over Now.mp3", cover: '1989TV.webp', title: "Is It Over Now (Taylor's Version) (From The Vault)" },
  { src: "22 Sweeter Than Fiction.mp3", cover: '1989TV.webp', title: "Sweeter Than Fiction (Taylor's Version) (From The Vault)" },

];

function togglePlayPause() {
  const playPauseButton = document.querySelector('.play-pause');
  isPlaying = !isPlaying;

  if (isPlaying) {
    playPauseButton.textContent = 'Pause';
    playCurrentSong();
  } else{
    playPauseButton.textContent = 'Play';
    audioElement.pause();
  }
}

audioElement.addEventListener('ended', playNext);

let isShuffleMode = false;
let shuffledQueue = [];

function toggleShuffleMode() {
  isShuffleMode = !isShuffleMode;

  if (isShuffleMode) {
    shuffledQueue = shuffleArray([...songQueue]);
    document.querySelector('.shuffle').textContent = 'Shuffle: On';
  } else {
    shuffledQueue = [];
    document.querySelector('.shuffle').textContent = 'Shuffle: Off';
  }

  updateQueue();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function playNext() {
  if (isShuffleMode) {
    if (shuffledQueue.length === 0) {
      shuffledQueue = shuffleArray([...songQueue]);
    }
    currentSongIndex = songQueue.indexOf(shuffledQueue.shift());
  } else {
    currentSongIndex = (currentSongIndex + 1) % songQueue.length;
  }

  // Update play/pause button text based on playback state
  const playPauseButton = document.querySelector('.play-pause');

  // Check if the audio is paused, update button text accordingly
  if (audioElement.paused) {
    playPauseButton.textContent = 'Play';
  } else {
    playPauseButton.textContent = 'Pause';
  }

  playCurrentSong();
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songQueue.length) % songQueue.length;
  playCurrentSong();
}

const currentSongTitleElement = document.getElementById('currentSongTitle');

function playCurrentSong() {
  const currentSong = songQueue[currentSongIndex];
  audioElement.src = currentSong.src;
  coverArtElement.src = currentSong.cover;
  currentSongTitleElement.textContent = currentSong.title; // Display the title
  audioElement.play();
  updateQueue();
}

function updateQueue() {
  const songQueueElement = document.getElementById('songQueue');
  songQueueElement.innerHTML = '';

  const displayQueue = isShuffleMode ? shuffledQueue : songQueue;

  displayQueue.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.title}`;
    if (isShuffleMode && currentSongIndex === songQueue.indexOf(song)) {
      listItem.classList.add('current-song-shuffle');
    } else if (!isShuffleMode && currentSongIndex === index) {
      listItem.classList.add('current-song');
    }
    songQueueElement.appendChild(listItem);
  });
}


function handleQueueItemClick(event) {
  console.log('Queue item clicked!');
  // ... (rest of the function)
}



// ... (rest of the code)



// ... (rest of the code)


function updateSeekBar(value) {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = (value / 100) * duration;

  audioElement.currentTime = currentTime;
  currentTimeElement.textContent = formatTime(currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audioElement.addEventListener('timeupdate', () => {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = audioElement.currentTime;



  seekBar.value = (currentTime / duration) * 100;
  currentTimeElement.textContent = formatTime(currentTime);
});

// ... (previous JavaScript code)

const totalTimeElement = document.querySelector('.total-time');

audioElement.addEventListener('loadedmetadata', updateTotalTime);

function updateTotalTime() {
  const totalMinutes = Math.floor(audioElement.duration / 60);
  const totalSeconds = Math.floor(audioElement.duration % 60);
  totalTimeElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}

// ... (rest of the JavaScript code)


// Optional: Auto-play the first song on page load
window.addEventListener('load', () => {
  playCurrentSong();
});

