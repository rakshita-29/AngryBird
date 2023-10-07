const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ground = canvas.height - 20
const slingShotHeight = 180;
var isSlingShotActive = false;
let selectedBird = null;
let isDragging = false;

class Bird {
    constructor(imagePath, width, height, x) {
        this.position = {
            x: x,
            y: ground - height,
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
        this.not_used = true;
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if (this.not_used) {
            this.position.y += this.velocityY;

            this.velocityY += 0.2;

            if (this.position.y >= this.originalY) {
                this.position.y = this.originalY;

                this.velocityY = -Math.random() * 8;

            }
        }
        this.draw();
    }
}

const backgroundImage = new Image();
backgroundImage.src = "images/lvl_bg.jpg";

class slingShot {
    constructor() {
        this.image = new Image();
        this.image.src = "images/slingshot.png";
        this.width = 100;
        this.height = 180;
        this.position = {
            x:150,
            y:ground-this.height,
        }
        this.image.onload = () => {
            this.draw();
        };
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        // this.position = {
        //     x:150,
        //     y:ground-this.height,
        // }
        this.draw();
    }
}


const birds = [];
const slingShotVar = new slingShot()
function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const bird of birds) {
        bird.update();
    }
    slingShotVar.draw();
    requestAnimationFrame(main);
}
function handleClick(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

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
            bird.not_used = false;
            isSlingShotActive = true;
            selectedBird = bird;
            isDragging = true;
        }
    }
}


backgroundImage.onload = function () {
    const Bird1 = new Bird("images/birds/red.png", 60, 50, 300);
    const Bird2 = new Bird("images/birds/red.png", 60, 50, 370);
    const Bird3 = new Bird("images/birds/red.png", 60, 50, 440);
    birds.push(Bird1, Bird2, Bird3);

    main();
};




canvas.addEventListener("click", handleClick);