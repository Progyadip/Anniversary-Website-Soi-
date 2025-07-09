let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const bgMusic = document.getElementById("bg-music");
const loveVideo = document.getElementById("love-video");
let videoStarted = false;
const videoSlideIndex = 4; // update if your video slide is different

// === AUDIO CONTROL FUNCTIONS ===
function fadeOutAudio(audio, duration = 1000) {
  let fadeStep = 0.05;
  let interval = setInterval(() => {
    if (audio.volume > fadeStep) {
      audio.volume -= fadeStep;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(interval);
    }
  }, duration * fadeStep);
}

function fadeInAudio(audio, duration = 1000) {
  // 🚫 Prevent fade-in if on the video slide
  if (currentSlide === videoSlideIndex) return;

  if (audio.paused) {
    audio.volume = 0;
    audio.play().catch(() => {});
  }

  let fadeStep = 0.05;
  let interval = setInterval(() => {
    if (audio.volume < 1 - fadeStep) {
      audio.volume += fadeStep;
    } else {
      audio.volume = 1;
      clearInterval(interval);
    }
  }, duration * fadeStep);
}

// === SLIDE CHANGE HANDLER ===
function handleVideoSlide() {
  const loveVideo = document.getElementById("love-video");

  if (currentSlide === videoSlideIndex) {
    if (!videoStarted) {
      // STOP background music
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic.volume = 0;

      // Unmute and restart video
      loveVideo.pause(); // ensure fresh
      loveVideo.currentTime = 0;
      loveVideo.muted = false;
      loveVideo.play().catch((err) => {
        console.warn("Video playback blocked:", err);
      });

      videoStarted = true;
    }
  } else if (videoStarted) {
    // Leaving video slide
    loveVideo.pause();
    loveVideo.currentTime = 0;
    loveVideo.muted = true;

    fadeInAudio(bgMusic, 800);
    videoStarted = false;
  }
}


// === NAVIGATION FUNCTIONS ===
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    slides[currentSlide].classList.remove("active");
    currentSlide++;
    slides[currentSlide].classList.add("active");
    handleVideoSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    slides[currentSlide].classList.remove("active");
    currentSlide--;
    slides[currentSlide].classList.add("active");
    handleVideoSlide();
  }
}

// === IMAGE SLIDER ===
const images = [
  "assets/images/photo1.jpg",
  "assets/images/photo2.jpg",
  "assets/images/photo3.jpg",
  "assets/images/photo4.jpg",
  "assets/images/photo5.jpg",
  "assets/images/photo6.jpg",
  "assets/images/photo7.jpg",
  "assets/images/photo3.jpg",
  "assets/images/photo8.jpg",
  "assets/images/photo9.jpg",
  "assets/images/photo10.jpg"
];
let imgIndex = 0;
setInterval(() => {
  if (currentSlide === 5) {
    imgIndex = (imgIndex + 1) % images.length;
    document.getElementById("slider-image").src = images[imgIndex];
  }
}, 3000);

// === FALLING HEARTS ===
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 2 + "s";
  heart.style.fontSize = Math.random() * 10 + 15 + "px";
  document.querySelector(".falling-hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// === AUTO SLIDE ON FIRST TAP ===
window.addEventListener("click", () => {
  // 🚫 Don’t play bgMusic if user is on video slide
  if (bgMusic.paused && currentSlide !== videoSlideIndex) {
    fadeInAudio(bgMusic, 1000);
  }

  // Intro slides auto-play
  if (currentSlide === 0) {
    setTimeout(() => nextSlide(), 3000);
    setTimeout(() => nextSlide(), 7000);
    setTimeout(() => nextSlide(), 12000);
  }
});
