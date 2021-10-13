
//Getting html Element

const canvasEl = document.getElementById('canvas');
const ctx = canvasEl.getContext('2d');

const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

const inputEl = document.getElementById('size');



const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

const saveEl = document.getElementById('save');





// Varies variables

let size = 5;
let x = undefined;
let y = undefined;
let isPressed = false;
let color = 'black';

//Initialize Size to 5
inputEl.value = 5;


// Adding event listeners

canvasEl.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;   
});

canvasEl.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvasEl.addEventListener('mousemove', (e) => {
  
    if(isPressed){
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);

        x = x2;
        y = y2;    
       
    }
});


colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});


clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
});

increaseBtn.addEventListener('click', () => {
    size += 5;
    if(size > 50){
       size = 50
    }
    updateSize();
});

decreaseBtn.addEventListener('click', () => {
   size -= 5;
    if(size < 5){
       size = 5;
    }
    updateSize();
});


saveEl.addEventListener('click', () => {
    saveDrawing();
});




//The main functions

function drawCircle(x, y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2){
   ctx.beginPath();
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2, y2);
   ctx.lineWidth = size * 2;
   ctx.strokeStyle = color;
   ctx.stroke();
}

function updateSize(){
    inputEl.value = size;
}

function saveDrawing(){
    const image = canvasEl.toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
    window.location.href = image;
    
}