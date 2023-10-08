const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ground = canvas.height - 20
const slingShotHeight = 180;
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
const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
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
        if (shootTheBird) {
            if (this.position.y > ground - 50) {
                // Delete this class
                const index = birds.indexOf(this);
                if (index !== -1) {
                    birds.splice(index, 1);
                }
                console.log(birds);
                isSlingShotActive = false;
            }
        }
        this.draw();
    }

    shoot() {
        // console.log("Shooting");
        if (shootTheBird) {

            const Vx = power * Math.cos(degreeToRadian(angleShoot));
            const Vy = power * Math.sin(degreeToRadian(angleShoot));
            const g = 9.8;
            const t = (Date.now() - currentTimeStart) / 100; // Convert to one-tenth seconds
            // console.log(power);
            this.position.x = Vx * t + 170;
            this.position.y = canvas.height - (Vy * t - 0.5 * g * t * t) - (slingShotHeight);
            // console.log(this.position.x)
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

function degreeToRadian(degree) {
    return degree * (Math.PI / 180);
}
const backgroundImage = new Image();
backgroundImage.src = "images/gamebg.png";

var birds = [];
var tnts = [];
var pigs = [];
const slingShotVar = new slingShot()

function playAgain() {
    canvas.style.display = "block";
    document.querySelector(".ending_container").style.display = "none";
    document.body.style.background = "none";
    birds = [];
    tnts = [];
    pigs = [];
    isGameOver = false;
    isSlingShotActive = false;
    star1.style.color = "rgb(156, 151, 151)";
    star2.style.color = "rgb(156, 151, 151)";
    star3.style.color = "rgb(156, 151, 151)";
    init();
}

function gameover() {
    canvas.style.display = "none";
    document.querySelector(".ending_container").style.display = "block";
    document.body.style.background = 'url("./images/gameover_bg.jpg")';
    document.body.style.backgroundSize = 'cover';

    const gold = "rgb(255,215,0)";
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

function main() {
    if (isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("Enddddd");

        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


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
                // Bird and pig collided, remove the pig
                pigs.splice(j, 1);
            }
        }

    }

    if (birds.length == 0 || pigs.length == 0) {
        setTimeout(function () {
            gameover();
            isGameOver = true;
        }, 2000);
    }

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
    requestAnimationFrame(main);
}

function init() {
    const Bird1 = new Bird("images/birds/red.png", 60, 50, 300);
    const Bird2 = new Bird("images/birds/red.png", 60, 50, 370);
    const Bird3 = new Bird("images/birds/red.png", 60, 50, 440);
    birds.push(Bird1, Bird2, Bird3);
    const tnt1 = new tnt("images/tnt.png", 100, 100, 1350);
    const tnt2 = new tnt("images/tnt.png", 100, 100, 1250);
    const tnt3 = new tnt("images/tnt.png", 100, 100, 1050);
    tnts.push(tnt1, tnt2, tnt3);
    const pig1 = new pig("images/badpig.png", 80, 80, 1050, canvas.height - 120);
    const pig2 = new pig("images/badpig.png", 80, 80, 1160, canvas.height - 20);
    const pig3 = new pig("images/badpig.png", 80, 80, 1360, canvas.height - 120);
    pigs.push(pig1, pig2, pig3);


    main();
};
backgroundImage.onload = init();

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
        }
    }
}
function handleMouseMove(event) {
    if (birdToShoot != null) {

        if (event.x > 175) {
            return;
        }//console.log(event.y)
        if (event.y > 610 && event.y < 780) {

            birdToShoot.position.y = event.y;
        }
        birdToShoot.position.x = Math.max(80, event.x);

    }
}
function handleMouseUp(event) {
    if (birdToShoot != null) {
        // Caculate Angle to shoot
        const dx = birdToShoot.position.x - 170;
        const dy = birdToShoot.position.y - (ground - slingShotHeight);
        const angle = Math.atan2(dy, dx);
        // console.log(birdToShoot.position.x, birdToShoot.position.y);
        const angleDegrees = (angle * 180) / Math.PI;
        power = Math.sqrt(dx ** 2 + dy ** 2);
        angleShoot = 180 - angleDegrees
        currentTimeStart = Date.now();
        console.log(`Angle of shooting: ${angleShoot} degrees`);
        flying_bird = birdToShoot;
        shootTheBird = true;
        flying_bird.shoot()
        birdToShoot = null;
        // birdToShoot = null;
    }
}


canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("click", handleClick);