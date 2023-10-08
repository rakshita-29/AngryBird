var audio = new Audio('sounds/theme_song.mp3');
var isPlaying = false;

const volume_toggele_btn = document.getElementById("volume-span")
function toggleAudio() {
    if (isPlaying) {
        volume_toggele_btn.innerHTML = "volume_off";

        audio.pause();
    } else {
        volume_toggele_btn.innerHTML = "volume_up";
        audio.play();
    }

    isPlaying = !isPlaying;
}
document.getElementById('sound_btn').addEventListener('click', toggleAudio);

// Click Sound For Button
var clickSound = new Audio('sounds/click-sound.wav');

var buttons = document.querySelectorAll('.btn');

buttons.forEach(function (button) {
    button.addEventListener('click', function () {

        clickSound.currentTime = 0;
        clickSound.play();

    });
});