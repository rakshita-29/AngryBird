// Initializing Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initializing Ground For Reference
const ground = canvas.height - 20
const slingShotHeight = 180;

// Other Properties
var isSlingShotActive = false;
let selectedBird = null;
let isDragging = false;
let birdToShoot = null;
let launchPosition = null;
let shootStartTime = null;
let power = null;
let angleShoot = null;
let currentTimeStart = null;
let shootTheBird = false;
let flying_bird = null;
let isGameOver = false;

// Winning Starts
const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
const gold = "rgb(255,215,0)";

// Instances
var birds = [];
var tnts = [];
var pigs = [];

// Game Sounds
const selectSound = new Audio("sounds/select.mp3");
const dragSound = new Audio("sounds/strech.mp3");
const releaseSound = new Audio("sounds/release.mp3");
const endingSound = new Audio("sounds/ending.mp3");
const pigDestroy = new Audio("sounds/pig_destroy.mp3");

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

        // If Bird is not on SlingShot
        if (this.not_used) {
            this.position.y += this.velocityY;
            this.velocityY += 0.2;

            if (this.position.y >= this.originalY) {
                this.position.y = this.originalY;
                this.velocityY = -Math.random() * 8;
            }
        }

        // Handling Edges

        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x > canvas.width) {
            this.position.x = canvas.height - 10;
        }

        if (this.position.t < 0) {
            this.position.x = 10;
        }

        if (this.position.y > canvas.height) {
            this.position.y = canvas.height - 80;
        }

        // If Bird is Shooted And Touched The Ground
        if (shootTheBird) {
            if (this.position.y > ground - 50) {
                const index = birds.indexOf(this);

                if (index !== -1) {
                    birds.splice(index, 1);
                }
                isSlingShotActive = false;
            }
        }
        this.draw();
    }

    shoot() {
        if (shootTheBird) {

            // Projectile Motion Using Newton's Equation
            const Vx = power * Math.cos(degreeToRadian(angleShoot));
            const Vy = power * Math.sin(degreeToRadian(angleShoot));
            const g = 9.8;
            const t = (Date.now() - currentTimeStart) / 100;
            this.position.x = Vx * t + 170;
            this.position.y = canvas.height - (Vy * t - 0.5 * g * t * t) - (slingShotHeight);
            this.draw();
        }
    }
}

class slingShot {
    constructor() {
        this.image = new Image();
        this.image.src = "images/slingshot.png";

        this.width = 100;
        this.height = 180;

        this.position = {
            x: 150,
            y: ground - this.height,
        }
        this.image.onload = () => {
            this.draw();
        };
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
}
class tnt {
    constructor(imagePath, width, height, x) {
        this.position = {
            x: x,
            y: ground - height,
        };

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
        this.draw();

    }
}

class pig {
    constructor(imagePath, width, height, x, y) {
        this.position = {
            x: x,
            y: y - height,
        };

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
        this.draw();
    }
}

// Converting Angles
function degreeToRadian(degree) {
    return degree * (Math.PI / 180);
}

// Function To Play Sounds
function playSound(sound) {
    sound.currentTime = 0; 
    sound.play();
  }

// Function To Handle Replay
function playAgain() {

    // Re-Showing Canvas And Hiding End-Game Screen
    canvas.style.display = "block";
    document.querySelector(".ending_container").style.display = "none";
    document.body.style.background = "none";

    // Setting Initial Values To All Variables
    birds = [];
    tnts = [];
    pigs = [];
    isGameOver = false;
    isSlingShotActive = false;

    // Changing Stars Color Back To Grey
    star1.style.color = "rgb(156, 151, 151)";
    star2.style.color = "rgb(156, 151, 151)";
    star3.style.color = "rgb(156, 151, 151)";

    // ReInitailizing Game
    init();
}

// Function To Handle End-Game
function gameover() {

    // Removing Canvas And Displaying End-Game Page
    canvas.style.display = "none";
    document.querySelector(".ending_container").style.display = "block";
    document.body.style.background = 'url("./images/gameover_bg.jpg")';
    document.body.style.backgroundSize = 'cover';

    // Changing Stars Color To Golden
    switch (pigs.length) {
        case 0:
            star1.style.color = gold;
            star2.style.color = gold;
            star3.style.color = gold;
            break;
        case 1:
            star1.style.color = gold;
            star2.style.color = gold;
            break;
        case 2:
            star1.style.color = gold;
            break;
    }


    document.getElementById("playagain").addEventListener("click", playAgain);
}



// Function To Load Birds On Slingshot
function handleClick(event) {

    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
    // Detect Clicked On Bird
    for (const bird of birds) {
        if (
            mouseX >= bird.position.x &&
            mouseX <= bird.position.x + bird.width &&
            mouseY >= bird.position.y &&
            mouseY <= bird.position.y + bird.height &&
            !isSlingShotActive
        ) {
            // Moving Bird To SlingShot Shooting Area
            bird.position.x = 170;
            bird.position.y = ground - slingShotHeight;
            bird.not_used = false;
            isSlingShotActive = true;
            selectedBird = bird;
            isDragging = true;

            // Playing Selection Sound
            playSound(selectSound);
        }
    }
}

// Function To Drag Birds
function handleMouseDown(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (selectedBird != null) {
        if (
            mouseX >= selectedBird.position.x &&
            mouseX <= selectedBird.position.x + selectedBird.width &&
            mouseY >= selectedBird.position.y &&
            mouseY <= selectedBird.position.y + selectedBird.height
        ) {
            birdToShoot = selectedBird;

            // Playing Dragging Sounds 
            playSound(dragSound);
        }
    }
}

// Function To Strech Birds
function handleMouseMove(event) {
    if (birdToShoot != null) {
        // Adding X-Offset
        if (event.x > 175) {
            return;
        }

        // Adding Y-Offset
        if (event.y > 610 && event.y < 780) {

            birdToShoot.position.y = event.y;
        }
        birdToShoot.position.x = Math.max(80, event.x);

    }
}

// Function To Release Birds
function handleMouseUp(event) {
    if (birdToShoot != null) {

        // Calculating X2-X1
        const dx = birdToShoot.position.x - 170;
        
        // Calculating Y2-Y1
        const dy = birdToShoot.position.y - (ground - slingShotHeight);

        // Converting To Degree
        const angle = Math.atan2(dy, dx);
        const angleDegrees = (angle * 180) / Math.PI;

        // Calculating Power With Distance Formula
        power = Math.sqrt(dx ** 2 + dy ** 2);
        angleShoot = 180 - angleDegrees

        // Starting Time To Use It In Netwon's Law
        currentTimeStart = Date.now();

        flying_bird = birdToShoot;
        shootTheBird = true;
        flying_bird.shoot()
        birdToShoot = null;


        // Playing Shooting Sound
        playSound(releaseSound);
    }
}

function main() {

    // Exiting Loop When Birds/Pigs Are 0
    if (isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Checking When Birds Hits The Pigs
    for (let i = birds.length - 1; i >= 0; i--) {
        const bird = birds[i];

        for (let j = pigs.length - 1; j >= 0; j--) {
            const pig = pigs[j];

            if (
                bird.position.x + bird.width > pig.position.x &&
                bird.position.x < pig.position.x + pig.width &&
                bird.position.y + bird.height > pig.position.y &&
                bird.position.y < pig.position.y + pig.height
            ) {
                // Removing Pig If Hit By Bird
                pigs.splice(j, 1);

                // Plaing Destroy Sound
                playSound(pigDestroy);
            }
        }

    }

    // Game-Over Logic
    if (birds.length == 0 || pigs.length == 0) {

        // Playing Ending Sound
        playSound(endingSound);
        
        setTimeout(function () {
            gameover();
            isGameOver = true;

        }, 2000);
    }

    // Shooting Bird When It Is Loaded From SlingShot
    if (flying_bird != null) {
        flying_bird.shoot();
    }
    for (const tnt of tnts) {
        tnt.update();
    }
    for (const pig of pigs) {
        pig.update();
    }
    for (const bird of birds) {
        bird.update();
    }
    slingShotVar.draw()

    // Recursive Animation
    requestAnimationFrame(main);
}

// Initialization Of Game
function init() {

    // Generating Birds
    const Bird1 = new Bird("images/birds/red.png", 60, 50, 300);
    const Bird2 = new Bird("images/birds/red.png", 60, 50, 370);
    const Bird3 = new Bird("images/birds/red.png", 60, 50, 440);
    birds.push(Bird1, Bird2, Bird3);

    // Generating Boxes
    const tnt1 = new tnt("images/tnt.png", 100, 100, 1350);
    const tnt2 = new tnt("images/tnt.png", 100, 100, 1250);
    const tnt3 = new tnt("images/tnt.png", 100, 100, 1050);
    tnts.push(tnt1, tnt2, tnt3);

    // Generating Pigs
    const pig1 = new pig("images/badpig.png", 80, 80, 1050, canvas.height - 120);
    const pig2 = new pig("images/badpig.png", 80, 80, 1160, canvas.height - 20);
    const pig3 = new pig("images/badpig.png", 80, 80, 1360, canvas.height - 120);
    pigs.push(pig1, pig2, pig3);


    main();
};

// Pre-Init Code
const backgroundImage = new Image();
backgroundImage.src = "images/gamebg.png";
const slingShotVar = new slingShot()
backgroundImage.onload = init();
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("click", handleClick);