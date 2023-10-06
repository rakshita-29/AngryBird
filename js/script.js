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
      }, speed );
    });
  }

 
  window.addEventListener('load', floatElements);