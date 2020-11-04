const msg = new SpeechSynthesisUtterance()
let voices = []
const voicesDropdown = document.querySelector('[name="voice"]')
const options = document.querySelectorAll('[type="range"], [name="text"]')
const speakButton = document.querySelector('#speak')
const stopButton = document.querySelector('#stop')

msg.text = document.querySelector('[name="text"]').value

//functions
function populateVoices(){
    voices = this.getVoices()
    const voiceOptions = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('')
        voicesDropdown.innerHTML = voiceOptions
}


function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value)
    toogle()
}

function toogle(startOver = true) {
    speechSynthesis.cancel()
    speechSynthesis.speak(msg)
    if(startOver) {
        speechSynthesis.speak(msg)
    }
}

function setOption(){
    msg[this.name] = this.value
    toogle()

}
//event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)
options.forEach(option => option.addEventListener('change', setOption))
speakButton.addEventListener('click', toogle)
stopButton.addEventListener('click', () => toogle(false))
