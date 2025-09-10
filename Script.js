const audio = document.getElementById('audio');
const trackArt = document.getElementById('track-art');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

let isPlaying = false;
let trackIndex = 0;

const musicList = [
    {
        name: "Billie Jean",
        artist: "Michael Jackson",
        image: "Covers/Billie Jean.jpg",
        path: "Songs/Billie Jean.mp3"
    },
    {
        name: "Moriró Da Re",
        artist: "Måneskin",
        image: "Covers/Moriró Da Re.jpg",
        path: "Songs/Moriró Da Re.mp3"
    },
    {
        name: "You Rock My World",
        artist: "Michael Jackson",
        image: "Covers/You Rock My World.jpg",
        path: "Songs/You Rock My World.mp3"
    }
];

function loadTrack(trackIndex) {
    audio.src = musicList[trackIndex].path;
    trackArt.src = musicList[trackIndex].image;
    trackName.textContent = musicList[trackIndex].name;
    trackArtist.textContent = musicList[trackIndex].artist;
    audio.load();
}

function playTrack() {
    audio.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % musicList.length;
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + musicList.length) % musicList.length;
    loadTrack(trackIndex);
    playTrack();
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update time display
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (duration) {
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        totalDurationEl.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack);

// Initial load
loadTrack(trackIndex);