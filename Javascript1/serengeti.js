// Khetiwe Miti – 2025-09-17
/* Adapted from https://javascript30.com */
/* JavaScript Drum Kit */
/* New Information:
   Expanded use of the event object 
   Arrow functions
   keyup, keydown, transitioned events
   back-ticks, grave accent (template literals)
   play() method
*/

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing'); 
}

function playByKeyCode(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key   = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio || !key) return;

 
  audio.currentTime = 0;

 
  const p = audio.play();
  if (p && p.catch) p.catch(() => {});

  
  key.classList.add('playing');
}


function playSound(e) {
  const code = e.keyCode || e.which; 
  playByKeyCode(code);
}

/* lets me click a key with the mouse */
function handleClick(e) {
  const btn  = e.currentTarget;     
  const code = btn.getAttribute('data-key'); 
  playByKeyCode(code);
}

/* makes Space or Enter also play sounds */
function handleKeyActivate(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick.call(this, e);
  }
}

/* added touch so it works on phones */
function handleTouch(e) {
  e.preventDefault(); 
  const code = e.currentTarget.getAttribute('data-key');
  playByKeyCode(code);
}

/* Add-on: connected clicks, taps, and keyboard so everything works */
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));


keys.forEach(key => {
  key.addEventListener('click', handleClick);
  key.addEventListener('touchstart', handleTouch, { passive: false });
  
  if (!key.hasAttribute('tabindex')) key.setAttribute('tabindex', '0');
  key.addEventListener('keydown', handleKeyActivate);
});
window.addEventListener('keydown', playSound);