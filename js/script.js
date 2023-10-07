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

window.addEventListener('load', floatElements);

const customCursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
  customCursor.style.left = `${e.clientX-40}px`;
  customCursor.style.top = `${e.clientY-40}px`;
});

document.addEventListener('mousedown', (e) => {
  customCursor.style.backgroundImage = `url("images/hand2.png")`;
})
document.addEventListener('mouseup', () => {
  customCursor.style.backgroundImage = `url("images/hand1.png")`;
});