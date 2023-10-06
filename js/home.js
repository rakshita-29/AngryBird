// Function to toggle audio playback
var audio = new Audio('../sounds/theme_song.mp3');
var isPlaying = false;

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    
    isPlaying = !isPlaying;
}
document.getElementById('sound_btn').addEventListener('click', toggleAudio);

//click sound for button
var clickSound = new Audio('../sounds/click-sound.wav');

var buttons = document.querySelectorAll('.btn');

buttons.forEach(function (button) {
    button.addEventListener('click', function () {

        clickSound.currentTime = 0; 
        clickSound.play();

    });
});