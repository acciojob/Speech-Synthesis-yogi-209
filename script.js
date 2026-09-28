const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;
function populateVoices() {
  voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    voicesDropdown.innerHTML = '<option value="">No voices available</option>';
    return;
  }
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}
function toggle(startOver = true) {
  speechSynthesis.cancel(); 
  if (startOver && msg.text.trim() !== '') {
    speechSynthesis.speak(msg);
  }
}
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); 
}
function setOption() {
  msg[this.name] = this.value;
  toggle();
}
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));