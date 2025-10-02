/*
Author: Khetiwe Miti
Date: 2025-10-01
Project: Whack-an-Owl
Sources: JavaScript30 starter (Whack-a-Mole)

Summary of Improvements (JS):
- CHANGED “mole” → “owl” selectors.
- NEW Start button, countdown timer, and localStorage high score.
- CHANGED pop-up timing to be slower (easier): 800–1500ms.
- CHANGED larger hole sizing supported (CSS).
- NEW small UX touch: prevent clicks after time is up; disable Start during play.
- A11y: aria-live score (handled in HTML) and clean state resets.
*/

// ----- DOM refs -----
const holes = document.querySelectorAll('.hole');        // original selector kept
const scoreBoard = document.querySelector('.score');     // original
const owls = document.querySelectorAll('.owl');          // CHANGED: .mole → .owl

// NEW: controls for timer/high score
const startBtn = document.getElementById('startBtn');
const timeLeftEl = document.getElementById('timeLeft');
const highScoreEl = document.getElementById('highScore');

// ----- Game state -----
let lastHole;
let timeUp = false;
let score = 0;
let countdownId = null;  // NEW timer handle

// ----- Tunables -----
const GAME_LENGTH = 15;     // seconds per round (NEW)
const POP_MIN_MS  = 800;    // CHANGED: slower min time (was ~350)
const POP_MAX_MS  = 1500;   // CHANGED: slower max time (was ~1000)

// Load & render saved high score (NEW)
const savedHigh = Number(localStorage.getItem('owlHighScore') || 0);
if (highScoreEl) highScoreEl.textContent = savedHigh;

// Utility: random integer in range [min, max]
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Pick a random hole that is not the same as last time
function randomHole(list) {
  const idx = Math.floor(Math.random() * list.length);
  const hole = list[idx];
  if (hole === lastHole) return randomHole(list); // CHANGED: avoid repeats
  lastHole = hole;
  return hole;
}

// Core loop: raise an owl for a random duration, then repeat
function peep() {
  const time = randomTime(POP_MIN_MS, POP_MAX_MS); // CHANGED: slower range
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

// Start a round: reset state, disable Start, kick off loops
function startGame() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  if (timeLeftEl) timeLeftEl.textContent = String(GAME_LENGTH);
  if (startBtn) startBtn.disabled = true; // NEW: prevent spamming Start
  peep();
  runCountdown(GAME_LENGTH);
}

// Countdown display and end-of-round handling
function runCountdown(secs) {
  clearInterval(countdownId);
  let remaining = secs;
  countdownId = setInterval(() => {
    remaining--;
    if (timeLeftEl) timeLeftEl.textContent = String(remaining);
    if (remaining <= 0) {
      clearInterval(countdownId);
      timeUp = true;
      if (startBtn) startBtn.disabled = false;
      updateHighScore();
    }
  }, 1000);
}

// Save high score to localStorage if beaten (NEW)
function updateHighScore() {
  const currentHigh = Number(localStorage.getItem('owlHighScore') || 0);
  if (score > currentHigh) {
    localStorage.setItem('owlHighScore', String(score));
    if (highScoreEl) highScoreEl.textContent = score;
  }
}

// Player bonks an owl
function bonk(e) {
  if (!e.isTrusted) return; // ignore scripted clicks (original anti-cheat)
  if (timeUp) return;       // NEW: ignore clicks after time expires
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;

  // If you later add a “hit” cursor image, you can flash it here:
  // document.body.classList.add('hit');
  // setTimeout(() => document.body.classList.remove('hit'), 120);
}

// ----- Events -----
owls.forEach(owl => owl.addEventListener('click', bonk)); // CHANGED: .owl
if (startBtn) startBtn.addEventListener('click', startGame);
