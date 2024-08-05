"use strict";

const playPuase = document.querySelector('.play__puase');
const icon = document.querySelector('.ic_p');
const allTime = document.querySelector('.all__time');
const showSeek = document.querySelector('.show__seek');
const title = document.querySelector('.title');
const singer = document.querySelector('.singer');
const now = document.querySelector('.now'); // اضافه کردن انتخابگر برای کلاس now

let currentMusic = 1;

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const bgImage = document.querySelector('.lable__image');

let url = '../music/lost-in-city-lights-145038.mp3';
let audioElement = new Audio(url);
let sec = 0;
let intervalId;

audioElement.addEventListener('loadedmetadata', () => {
  const durationInSeconds = audioElement.duration;
  
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  
  allTime.textContent = `${minutes}:${seconds}`;
  if (audioElement.paused) {
    showSeek.style.width = (sec * 100) / durationInSeconds + '%';
  }
});

const stopSeekBar = () => {
  clearInterval(intervalId);
};

const updateSrs = (newUrl) => {
  url = newUrl;
  audioElement = new Audio(newUrl);
  audioElement.play();
  playPuase.classList.remove('play');
  playPuase.classList.add('puase');
  icon.src = '../images/icons8-pause-64.png';
  audioElement.addEventListener('loadedmetadata', () => {
    const durationInSeconds = audioElement.duration;
    
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    
    allTime.textContent = `${minutes}:${seconds}`;
    sec = 0;
    showSeek.style.width = (sec * 100) / durationInSeconds + '%';
    startSeekBar();
  });
};

const startSeekBar = () => {
  intervalId = setInterval(() => {
    sec++;
    const durationInSeconds = audioElement.duration;
    if(sec <= durationInSeconds) {
      showSeek.style.width = (sec * 100) / durationInSeconds + '%';
      
      // محاسبه دقیقه و ثانیه جاری
      const currentMinutes = Math.floor(sec / 60);
      const currentSeconds = Math.floor(sec % 60);
      
      // نمایش دقیقه و ثانیه جاری در کلاس now
      now.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    } else {
      icon.src = '../images/icons8-play-64.png';
      showSeek.style.width = 0;
      now.textContent = '00:00'; // وقتی آهنگ تمام شد
    }
  }, 1000);
};

next.addEventListener('click', () => {
  audioElement.pause();
  stopSeekBar();
  sec = 0;
  if (currentMusic !== 2) {
    url = '../music/forest-lullaby-110624.mp3';
    currentMusic++;
    bgImage.style.backgroundImage = `url('../images/cover-${currentMusic}.png')`;
    title.textContent = 'Forest Lullaby'
    singer.textContent = 'Lesfm'
  } else if (currentMusic === 2) {
    currentMusic = 1;
    url = '../music/lost-in-city-lights-145038.mp3';
    bgImage.style.backgroundImage = `url('../images/cover-${currentMusic}.png')`;
    title.textContent = 'lose in the city light'
    singer.textContent = 'Cosmo sheldrak'
  }
  updateSrs(url);
});

prev.addEventListener('click', () => {
  audioElement.pause();
  stopSeekBar();
  sec = 0;
  if (currentMusic !== 1) {
    url = '../music/lost-in-city-lights-145038.mp3';
    currentMusic--;
    bgImage.style.backgroundImage = `url('../images/cover-${currentMusic}.png')`;
    title.textContent = 'lose in the city light'
    singer.textContent = 'Cosmo sheldrak'
  } else if (currentMusic === 1) {
    currentMusic = 2;
    url = '../music/forest-lullaby-110624.mp3';
    bgImage.style.backgroundImage = `url('../images/cover-${currentMusic}.png')`;
    title.textContent = 'Forest Lullaby'
    singer.textContent = 'Lesfm'
  }
  updateSrs(url);
});

playPuase.addEventListener('click', () => {
  if (playPuase.classList.contains('play')) {
    audioElement.play();
    playPuase.classList.remove('play');
    playPuase.classList.add('puase');
    icon.src = '../images/icons8-pause-64.png';
    startSeekBar();
  } else if (playPuase.classList.contains('puase')) {
    icon.src = '../images/icons8-play-64.png';
    audioElement.pause();
    playPuase.classList.remove('puase');
    playPuase.classList.add('play');
    stopSeekBar();
  }
});
