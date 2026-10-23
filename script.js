const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const audio = card.querySelector('audio');

        if (audio.paused) {
            document.querySelectorAll('audio').forEach(song => {
                song.pause();
                song.currentTime = 0;
            });

            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });
});

const card = document.querySelectorAll(".card");

cards.forEach(card => {
    const btn = card.querySelector(".play-btn");

    card.addEventListener("mouseenter", () => {
        btn.animate(
            [
                { transform: "translateY(30px)", opacity: 0 },
                { transform: "translateY(0)", opacity: 1 }
            ],
            {
                duration: 300,
                fill: "forwards"
            }
        );
    });
});
const playlist = document.querySelector(".SpotifyPlaylist");

playlist.scrollBy({
    top: 200,
    behavior: "smooth"
});

const sidePlaylists = document.querySelectorAll(".playlist-item");

sidePlaylists.forEach(playlist => {
    const btn = document.createElement("img");

    btn.src = "assets/play.svg";
    btn.classList.add("side-play-btn");
    btn.alt = "Play";

    playlist.appendChild(btn);
});


sidePlaylists.forEach((playlist, index) => {
    const btn = playlist.querySelector(".side-play-btn");

    btn.addEventListener("click", event => {
        event.stopPropagation();

        const matchedCard = cards[index % cards.length];

        if (matchedCard) {
            matchedCard.click();
        }
    });
});

const sidebar = document.querySelector(".left");
const hamburger = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close");

hamburger.addEventListener("click", () => {
    sidebar.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.add("hide");
});
const bottomPlayBtn = document.querySelector(".playback .play-btn");
const playlistAudios = document.querySelectorAll(".card audio");

bottomPlayBtn.addEventListener("click", () => {
    let currentAudio = [...playlistAudios].find(audio => !audio.paused);

    if (currentAudio) {
        currentAudio.pause();
        bottomPlayBtn.src = "assets/play2.svg";
        bottomPlayBtn.alt = "Play Button";
    } else {
        const randomIndex = Math.floor(Math.random() * playlistAudios.length);
        currentAudio = playlistAudios[randomIndex];

        currentAudio.play();
        bottomPlayBtn.src = "assets/pause.svg";
        bottomPlayBtn.alt = "Pause Button";
    }
});
const songs = [...document.querySelectorAll(".card audio")];
songs.forEach(song => {
    song.addEventListener("play", () => {
        bottomPlayBtn.src = "assets/pause.svg";
        bottomPlayBtn.alt = "Pause Button";
    });

    song.addEventListener("pause", () => {
        bottomPlayBtn.src = "assets/play2.svg";
        bottomPlayBtn.alt = "Play Button";
    });
});
const previousBtn = document.querySelector(".previous-btn");
const nextBtn = document.querySelector(".next-btn");

let currentSongIndex = -1;

function playSong(index) {
    if (songs.length === 0) return;

    currentSongIndex = (index + songs.length) % songs.length;

    songs.forEach(song => {
        song.pause();
        song.currentTime = 0;
    });

    songs[currentSongIndex].play();
}

nextBtn.addEventListener("click", () => {
    playSong(currentSongIndex + 1);
});

previousBtn.addEventListener("click", () => {
    playSong(currentSongIndex - 1);
});

const seekBar = document.querySelector("#seek-bar");
const currentTimeText = document.querySelector("#current-time");
const durationText = document.querySelector("#duration");

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function updateSeekBar(song) {
    if (!song || !Number.isFinite(song.duration)) return;

    seekBar.value = (song.currentTime / song.duration) * 100;
    currentTimeText.textContent = formatTime(song.currentTime);
    durationText.textContent = formatTime(song.duration);
}

songs.forEach((song, index) => {
    song.addEventListener("loadedmetadata", () => {
        if (index === currentSongIndex) updateSeekBar(song);
    });

    song.addEventListener("timeupdate", () => {
        if (index === currentSongIndex) updateSeekBar(song);
    });
});

seekBar.addEventListener("input", () => {
    const song = songs[currentSongIndex];

    if (song && Number.isFinite(song.duration)) {
        song.currentTime = (seekBar.value / 100) * song.duration;
    }
});
const song = songs[currentSongIndex];

seekBar.value = song && song.duration
    ? (song.currentTime / song.duration) * 100
    : 0;

seekBar.style.setProperty("--progress", `${seekBar.value}%`);

if (song) {
    currentTimeText.textContent = formatTime(song.currentTime);
    durationText.textContent = formatTime(song.duration);
}

sidebar.classList.add("hide");

document.querySelector(".playback").getBoundingClientRect()