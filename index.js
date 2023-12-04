let headingE1 = document.getElementById("headingElement");
let buttonB1 = document.getElementById("changeBtn");

let glow = document.getElementById("Onbulb");
let cat = document.getElementById("Cat");
let headingE3 = document.getElementById("headingElement")
let isimageChange = false;

function onChangeheading(){
    headingE1.textContent = "4.0 Technology";
    headingE1.style.color = "blue";
}

function onchangeDim(){
    if(isimageChange===false){
        glow.src = "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/bulb-go-off-img.png";
        cat.src = "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/cat-eyes-img.png";
        headingE3.textContent = "Switch OFF";
        isimageChange = true;
    }
    else{
        headingE3.textContent = "Switch ON";
    }
}

buttonB1.addEventListener(click,onChangeheading);