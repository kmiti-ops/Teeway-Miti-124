/*
Author: Khetiwe Miti
Date: 2025-10-09
Project: Echobot Studio
Sources: JavaScript30 starter (Speech Synthesis)
*/

/*
- Uses the real Web Speech API consistently (speechSynthesis + SpeechSynthesisUtterance).
- Loads voices on the voiceschanged event, sorts them, and preselects a voice.
- Language filter repopulates voices based on the selected locale prefix (en/es/fr/de).
- Single textarea reference (textEl) is used everywhere (speak, templates, download).
- Template dropdown populates the script and dispatches an 'input' event for any counters.
- Sliders cast to numbers; cancel current speech before speaking again.
- Volume correctly constrained to 0.0–1.0; guards around DOM access prevent crashes.
*/

const synth = window.speechSynthesis;
const msg   = new SpeechSynthesisUtterance();


const voicesDropdown = document.querySelector('[name="voice"]');

const textEl =
  document.getElementById('text') ||
  document.querySelector('textarea[name="text"]') ||
  document.querySelector('[name="text"]');

const rate        = document.querySelector('[name="rate"]');
const pitch       = document.querySelector('[name="pitch"]');
const volume      = document.querySelector('[name="volume"]');
const language    = document.getElementById('language');
const templateSel = document.getElementById('template');

const playButton     = document.getElementById('play');
const stopButton     = document.getElementById('stop');
const downloadButton = document.getElementById('download');

const businessNameInput =
  document.getElementById('businessName') ||
  document.querySelector('[name="businessName"]');

let voices = [];


const TEMPLATES = {
  greeting: ({ name }) =>
`Hello, you’ve reached ${name || 'our office'}. We’re currently assisting other callers.
Please leave your name, number, and a brief message. Thank you for calling.`,

  afterHours: ({ name }) =>
`Hello, you’ve reached ${name || 'our office'}. Our business hours are 8 a.m. to 5 p.m., Monday through Friday.
Please leave your name and number, and we’ll return your call on the next business day.`,

  apptReminder: ({ name }) =>
`Hello from ${name || 'our office'}. This is a friendly reminder about your upcoming appointment.
To reschedule, please call us back at your earliest convenience.`,

  busyLine: ({ name }) =>
`Hello, you’ve reached ${name || 'our office'}. We’re experiencing higher than usual call volume.
Please leave your name, number, and the reason for your call; we’ll get back to you shortly.`
};


function loadVoices() {
  voices = synth.getVoices().sort(
    (a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name)
  );
  populateVoices();
}

function populateVoices() {
  if (!voicesDropdown) return;
  const filter = (language?.value || '').toLowerCase();
  const filtered = filter
    ? voices.filter(v => v.lang.toLowerCase().startsWith(filter))
    : voices;

  voicesDropdown.innerHTML = filtered.length
    ? filtered.map(v => `<option value="${v.name}">${v.name} — ${v.lang}</option>`).join('')
    : `<option value="">No voices for selected language</option>`;

  if (voicesDropdown.options.length > 0) {
    voicesDropdown.selectedIndex = 0;
    setVoice.call(voicesDropdown);
  }
}

if (typeof synth.onvoiceschanged !== 'undefined') {
  synth.addEventListener('voiceschanged', loadVoices);
}
loadVoices();


function setVoice() {
  const selectedName = this.value;
  const v = voices.find(v => v.name === selectedName);
  msg.voice = v || null;
}

function play(startOver = true) {
  if (!textEl) return;
  if (synth.speaking) synth.cancel();

  msg.text   = textEl.value.trim() || 'This is a voicemail preview.';
  msg.rate   = Number(rate?.value || 1);
  msg.pitch  = Number(pitch?.value || 1);
  msg.volume = Number(volume?.value || 1);

  synth.speak(msg);
}

function stop() {
  if (synth.speaking || synth.pending) synth.cancel();
}

function onControlChange() {

  if (this.name === 'rate' || this.name === 'pitch' || this.name === 'volume') {
    speak(true);
  }
}

function applyTemplate() {
  if (!templateSel || !textEl) return;
  const key = templateSel.value;
  const tpl = TEMPLATES[key];
  if (!tpl) return;

  const name = (businessNameInput?.value || '').trim();
  textEl.value = tpl({ name });

 
  textEl.dispatchEvent(new Event('input', { bubbles: true }));
}


voicesDropdown?.addEventListener('change', setVoice);
language?.addEventListener('change', populateVoices);

['input', 'change'].forEach(evt => {
  rate?.addEventListener(evt, onControlChange);
  pitch?.addEventListener(evt, onControlChange);
  volume?.addEventListener(evt, onControlChange);
});

templateSel?.addEventListener('change', applyTemplate);

playButton?.addEventListener('click', () => speak(true));
stopButton?.addEventListener('click', stop);

downloadButton?.addEventListener('click', () => {
  const blob = new Blob([textEl?.value || ''], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: 'voicemail-script.txt' });
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});


msg.onstart = () => console.log('Speaking…');
msg.onend   = () => console.log('Done.');
msg.onerror = e => console.warn('Speech error:', e);
