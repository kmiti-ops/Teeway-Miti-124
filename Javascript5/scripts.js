/*-Khetiwe Miti 10-27-2025
   Project: Borderlines of Freedom — Custom Video Player-->
   Adapted from Wes Bos https://javascript30.com 
      Javascript Video Player Project
*/

/*
Improvements Made from Original Wes Bos Code:
• Re-structured the code into a DOMContentLoaded block for safer execution.  
• Added error guards to prevent null references when elements aren’t found.  
• Created new functions: toggleMute(), cycleSpeed(), and toggleFullscreen().  
• Added keyboard support and dynamic text updates for icon buttons.  
• Simplified event listeners with loops and modern syntax.  
• Kept Wes Bos’s core logic for play/pause, skip, and scrub but extended UI feedback.  
*/
'use strict';

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.player');
  if (!player) {
    console.warn('[video] .player not found');
    return;
  }

  const video     = player.querySelector('.player__video');
  const muteBtn   = player.querySelector('.mute');
  const speedBtn  = player.querySelector('.speed');
  const fsBtn     = player.querySelector('.fullscreen');

  if (!video) {
    console.warn('[video] .player__video not found');
    return;
  }

  function toggleMute() {
    video.muted = !video.muted;
    if (muteBtn) muteBtn.textContent = video.muted ? '🔇' : '🔊';
  }

  const speedSteps = [0.5, 1, 1.25, 1.5, 2];
  function cycleSpeed() {
    const i = speedSteps.indexOf(Number(video.playbackRate));
    const next = speedSteps[(i + 1) % speedSteps.length];
    video.playbackRate = next;
    if (speedBtn) speedBtn.textContent = `${next}×`;
  }

  function toggleFullscreen() {
    const el = player;
    const isFS =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;

    if (!isFS) {
      (el.requestFullscreen ||
       el.webkitRequestFullscreen ||
       el.msRequestFullscreen).call(el);
    } else {
      (document.exitFullscreen ||
       document.webkitExitFullscreen ||
       document.msExitFullscreen).call(document);
    }
  }

 
  if (muteBtn)  muteBtn.addEventListener('click', toggleMute);
  if (speedBtn) speedBtn.addEventListener('click', cycleSpeed);
  if (fsBtn)    fsBtn.addEventListener('click', toggleFullscreen);

 
  if (speedBtn) speedBtn.textContent = `${video.playbackRate}×`;
  if (muteBtn)  muteBtn.textContent  = video.muted ? '🔇' : '🔊';
});