// Function to add Animation to Landing Page Objects
function floatElements() {
  const elements = document.querySelectorAll('.floating-element');
  elements.forEach((element, index) => {
    const yOffset = 10;
    const speed = 2500;

    setInterval(() => {
      element.style.transition = 'transform 1.5s ease-in-out';
      element.style.transform = `translateY(${yOffset}px)`;
      setTimeout(() => {
        element.style.transition = 'transform 1.5s ease-in-out';
        element.style.transform = 'translateY(0)';
      }, speed / 2);
    }, speed);
  });
}

// Moving Hand Along With Position Of Mouse
document.addEventListener('mousemove', (e) => {
  customCursor.style.left = `${e.clientX - 40}px`;
  customCursor.style.top = `${e.clientY - 40}px`;
});

// Changing Hand Icon on Click
document.addEventListener('mousedown', (e) => {
  customCursor.style.backgroundImage = `url("images/hand2.png")`;
})
document.addEventListener('mouseup', () => {
  customCursor.style.backgroundImage = `url("images/hand1.png")`;
});

// Function To Display Level Selection Page
function init_levels() {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".level_container").style.display = "block";
  document.body.style.background = "url('images/lvl_page_bg.jpg')";
  document.body.style.backgroundSize = 'cover';
  document.getElementById("backbutton").style.display = 'block';
  page++;
}

// Function To Return To Home Page
function backButton() {
  if (page == 1) {
    document.querySelector(".level_container").style.display = "none";
    document.querySelector(".container").style.display = "block";
    document.getElementById("backbutton").style.display = 'none';
    document.body.style.background = "url('images/bg.jpg')";
    page = 0;
  }
}

// Current Page Counter
var page = 0;
const customCursor = document.getElementById('custom-cursor');
window.addEventListener('load', floatElements);
document.getElementById("backbutton").addEventListener("click",backButton);
document.getElementById("start_btn").addEventListener("click", init_levels)
