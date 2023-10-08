const mycanvas = document.getElementById("canvas");

let birdSelected = null;
let birdShoot = null;
const selectSound = new Audio("./sounds/select.mp3");
const dragSound = new Audio("../sounds/strech.mp3");
const releaseSound = new Audio("../sounds/release.mp3");

mycanvas.addEventListener("mousedown", (e) => {
  const mouseX = e.clientX - mycanvas.getBoundingClientRect().left;
  const mouseY = e.clientY - mycanvas.getBoundingClientRect().top;
  if (birdSelected != null) {
    if (
      mouseX >= birdSelected.position.x &&
      mouseX <= birdSelected.position.x + birdSelected.width &&
      mouseY >= birdSelected.position.y &&
      mouseY <= birdSelected.position.y + birdSelected.height
    ) {
      birdShoot = birdSelected;
      playSound(selectSound);
    }
  }
});

mycanvas.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX - mycanvas.getBoundingClientRect().left;
  const mouseY = e.clientY - mycanvas.getBoundingClientRect().top;

  if (birdSelected === null) {
    for (const bird of birds) {
      if (
        mouseX >= bird.position.x &&
        mouseX <= bird.position.x + bird.width &&
        mouseY >= bird.position.y &&
        mouseY <= bird.position.y + bird.height &&
        !isSlingShotActive
      ) {
        bird.position.x = 170;
        bird.position.y = ground - slingShotHeight;
        birdSelected = bird;
        playSound(dragSound);
      }
    }
  }
});

mycanvas.addEventListener("mouseup", (e) => {
  if (birdShoot != null) {

    playSound(releaseSound);
  }
  birdSelected = null;
});

function playSound(sound) {
  sound.currentTime = 0; 
  sound.play();
}
