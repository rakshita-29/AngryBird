const mycanvas = document.getElementById("canvas");


const selectSound = new Audio("./sounds/select.mp3");
const dragSound = new Audio("../sounds/strech.mp3");
const releaseSound = new Audio("../sounds/release.mp3");

let birdSelected = false;

mycanvas.addEventListener("mousedown", () => {
  birdSelected = true;
  playSound(selectSound);
});

mycanvas.addEventListener("mousemove", () => {
  if (birdSelected) {
    playSound(dragSound);
  }
});

mycanvas.addEventListener("mouseup", () => {
  if (birdSelected) {
    birdSelected = false;
    playSound(releaseSound);
  }
});

function playSound(sound) {
  sound.currentTime = 0; 
  sound.play();
}
