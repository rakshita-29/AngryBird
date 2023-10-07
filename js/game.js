canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImage = new Image();
backgroundImage.src = "images/lvl_bg.jpg";
backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    
};
function init(){
    document.querySelector(".container").style.display = "none";
    canvas.style.display = "block";
}
document.querySelector(".btn").addEventListener("click",init)