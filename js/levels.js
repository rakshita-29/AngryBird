function showLevel1(){
    document.querySelector(".level_container").style.display = 'none';
    console.log("hey");
    document.getElementById("backbutton").style.display = 'none';
    document.getElementById("sound_btn").style.display = 'none';
    document.getElementById("canvas").style.display = 'block';
    document.body.style.background = 'none';
}


document.getElementById("lvl1-button").addEventListener("click",showLevel1)