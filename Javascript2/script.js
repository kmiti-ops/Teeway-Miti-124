// Khetiwe Miti – 10-01-2025
/* Adapted from https://javascript30.com */
/* Whack a MoLE */
/* New Information: 
NEW Start button, countdown timer, and localStorage high score.
CHANGED pop-up timing to be slower (easier): 800–1500ms.
CHANGED larger hole sizing supported
Prevent clicks after time is up; disable Start during play.
*/

/*Changed Mole to Owl*/
const holes = document.querySelectorAll('.hole');        
const scoreBoard = document.querySelector('.score');     
const owls = document.querySelectorAll('.owl');          

/* Added new controls for timer/high score */
const startBtn = document.getElementById('startBtn');
const timeLeftEl = document.getElementById('timeLeft');
const highScoreEl = document.getElementById('highScore');

/*Added a new timer count down*/
let lastHole;
let timeUp = false;
let score = 0;
let countdownId = null; 

/* changed the time that the game runs in seconds*/
const GAME_LENGTH = 15;     
const POP_MIN_MS  = 800;    
const POP_MAX_MS  = 1500;  

/* Added saved high score. changes with ech high score achieved*/ 
const savedHigh = Number(localStorage.getItem('owlHighScore') || 0);
if (highScoreEl) highScoreEl.textContent = savedHigh;


function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/* Allows a random hole that is not the same as last time for the owl to pop up */
function randomHole(list) {
  const idx = Math.floor(Math.random() * list.length);
  const hole = list[idx];
  if (hole === lastHole) return randomHole(list); // CHANGED: avoid repeats
  lastHole = hole;
  return hole;
}

/* raise an owl for a random duration, then repeat */
function peep() {
  const time = randomTime(POP_MIN_MS, POP_MAX_MS);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

/* Start a new round */
function startGame() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  if (timeLeftEl) timeLeftEl.textContent = String(GAME_LENGTH);
  if (startBtn) startBtn.disabled = true; // NEW: prevent spamming Start
  peep();
  runCountdown(GAME_LENGTH);
}


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

function updateHighScore() {
  const currentHigh = Number(localStorage.getItem('owlHighScore') || 0);
  if (score > currentHigh) {
    localStorage.setItem('owlHighScore', String(score));
    if (highScoreEl) highScoreEl.textContent = score;
  }
}

function bonk(e) {
  if (!e.isTrusted) return; // ignore scripted clicks (original anti-cheat)
  if (timeUp) return;       // NEW: ignore clicks after time expires
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;

}

owls.forEach(owl => owl.addEventListener('click', bonk)); // CHANGED: .owl
if (startBtn) startBtn.addEventListener('click', startGame);

