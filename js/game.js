const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Bird {
    constructor(imagePath, width, height, x) {
        this.position = {
            x: x,
            y: 550,
        };
        this.originalY = this.position.y;
        this.velocityY = -Math.random() * 5;
        this.image = new Image();
        this.image.src = imagePath;
        this.image.onload = () => {
            this.width = width;
            this.height = height;
            this.draw();
        };
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.position.y += this.velocityY;
        
        this.velocityY += 0.1; // Adjust the gravity strength as needed
        
        if (this.position.y >= this.originalY) {
            this.position.y = this.originalY;
            this.velocityY = -Math.random() * 5;
        }
        
        this.draw(); // Redraw the bird
    }
}

const backgroundImage = new Image();
backgroundImage.src = "images/lvl_bg.jpg";

function drawSlingshot() {
    var ss = new Image();
    ss.src = "images/slingshot.png";
    ss.onload = function () {
        console.log(ss);
        ctx.drawImage(ss, 150, 490, 70, 130);
    };
}

const birds = [];

function main() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    for (const bird of birds) {
        bird.update();
    }
    requestAnimationFrame(main);
}

backgroundImage.onload = function () {
    drawSlingshot();
    const Bird1 = new Bird("images/birds/red.png", 60, 50, 250);
    const Bird2 = new Bird("images/birds/red.png", 60, 50, 320);
    const Bird3 = new Bird("images/birds/red.png", 60, 50, 390);
    birds.push(Bird1, Bird2, Bird3);

    main(); // Start the animation loop
};
