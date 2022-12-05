import {EnemieCat,Jumper,Creeper,Eater,Pooper,Poo} from './enemieCatClasses.js'
import {Catnip,PowerDrink,PowerUp} from './itemClasses.js'


export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "/images/background game.png";

let intervalId;
export let frame = 0;
export let score = 0;
export const enemieCatArray = [];
export const itemArray = [];
const enemieCatClasses = [/* Jumper, Creeper, Pooper, */Eater];


// functions

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  player.draw();
  updateEnemieCat();
  updateScore();
  itemUpdater();
  // findNearestItem(350)
  // console.log(findNearestItem(177))
}

export function findNearestItem(xValue){
let smallestNumber = 700
let correspondingNumber = 0
let newArr = [smallestNumber,correspondingNumber]
if(itemArray.length>0){
  for(let i = 0; i<itemArray.length;i++){
    if(Math.abs(itemArray[i].x -xValue) < smallestNumber){
      smallestNumber = itemArray[i].x
      correspondingNumber = itemArray[i].y
      newArr = [smallestNumber,correspondingNumber]
    }
    
  }
  return newArr
}

// console.log(newArr)


// //  console.log(itemArray)
//   let xArr = []
//   // let yArr = []
//   let nearestX
//   // let nearestY
//   for(let i=0;i<itemArray.length;i++){
//     xArr.push(itemArray[i].x)
    
//   }
//   if(xArr.length > 0){
//     nearestX = xArr.reduce((prev, curr) => Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev);

//   }
  // for(let i=0;i<itemArray.length;i++){
  //   yArr.push(itemArray[i].y)
    
  // }
  // if(yArr.length > 0){
  //   nearestY = yArr.reduce((prev, curr) => Math.abs(curr - y) < Math.abs(prev - y) ? curr : prev);

  // }

//  return [nearestX]
}


export function upTickScore(){
  score += 50
} 

function startGame() {
  document.querySelector("#intro").style.display = "none";
  document.querySelector("#canvas").style.display = "flex";

  drawBackground();
  player.draw();
  intervalId = setInterval(updateGame, 20);
}


function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function updateScore() {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 450, 40);
}

function checkGameOver() {
 
  stop();

  const points = Math.floor(frames / 10);
  setTimeout(() => {
    document.querySelector("#endScreen").style.display = "flex";
    document.querySelector("#canvas").style.display = "none";
    document.querySelector("#endScreen span").textContent = score;
  }, 1200);
  // }
}



function itemUpdater() {
  if (frame % 180 === 0) {
    const randomX = Math.floor(Math.random() * 600);
    const randomY = Math.floor(Math.random() * 600);

    itemArray.push(new Catnip(randomX, randomY));
  }
  if (frame % 180 === 0) {
    const randomX = Math.floor(Math.random() * 600);
    const randomY = Math.floor(Math.random() * 600);

    itemArray.push(new PowerDrink(randomX, randomY));
  }

  for (let i = 0; i < itemArray.length; i++) {
    itemArray[i].draw();
    itemArray[i].checkIfCollected();
    if (itemArray[i].checkIfCollected()) {
      itemArray.splice([i], 1);
    }
  }
}

function updateEnemieCat() {
  for (let i = 0; i < enemieCatArray.length; i++) {
    enemieCatArray[i].draw();

    if (enemieCatArray[i].isCat) {
      enemieCatArray[i].move();
    }
    if (enemieCatArray[i].isPooper) {
      enemieCatArray[i].poop();
    }
    if (enemieCatArray[i].checkIfCollision()) {
      if (player.powerUp === "powerDrink") {
        enemieCatArray.splice([i], 1);
      } else {
        checkGameOver();
      }
    }
  }


  frame += 1;
  if (frame % 360 === 0) {
    const randomX = Math.floor(Math.random() * 600);
    const randomY = Math.floor(Math.random() * 600);
    const randomClass = Math.floor(Math.random() * enemieCatClasses.length);

    enemieCatArray.push(new enemieCatClasses[randomClass](randomX, randomY));
  }
}

function stop() {
  clearInterval(intervalId);
}

// classes

class CatCharacter {
  constructor() {
    this.x = 220;
    this.y = canvas.height - 70;
    this.width = 42;
    this.height = 50;
    this.powerUp = "";

    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "/images/mainCatCharacter.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  changeImage(src, width, height, powerUp) {
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = src;
    this.width = width;
    this.height = height;
    
      this.powerUp = powerUp;
    
  }
  moveLeft() {
    if (this.x > 0) {
      this.x -= 15;
    }
  }
  moveRight() {
    if (this.x < 670) {
      this.x += 15;
    }
  }
  moveUp() {
    if (this.y > 0) {
      this.y -= 15;
    }
  }
  moveDown() {
    if (this.y < 650) {
      this.y += 15;
    }
  }
  left() {
    return this.x - this.height / 3;
  }
  right() {
    return this.x + this.height / 3;
  }
  top() {
    return this.y - this.height / 3;
  }
  bottom() {
    return this.y + this.height /1.3 ;
  }
}

export const player = new CatCharacter();


// event listener / player controler

document.getElementById("startBtn").addEventListener("click", () => {
  startGame();
});

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 38:
      player.moveUp();
      break;
    case 40:
      player.moveDown();
      break;
    case 37:
      player.moveLeft();
      break;
    case 39:
      player.moveRight();
      break;
  }
});

// document.getElementById("startBtn").addEventListener("mouseover", () => {
//   document.getElementById("intro").style.backgroundColor = "red";
// });
// document.getElementById("startBtn").addEventListener("mouseout", () => {
//   document.getElementById("intro").style.backgroundColor = "transparent";
// });
document
  .getElementById("restartBtn")
  .addEventListener("click", () => location.reload());


let rotation = 0
let rotationRel = rotation % 360
let rounds = 0
const interValStart = setInterval(()=>{

  if(rotationRel<=360){
  rotation += 2
    
    document.getElementById("introImage").style.WebkitTransitionDuration='0.1ms';
  document.getElementById("introImage").style.webkitTransform = `rotate(${rotation}deg)`
  document.getElementById("introImage").animate({
    width: '700px',
    height: "700px", 
     }, 50000 );
  }
  if(rotation % 360 === 0){
    rounds++
  }
  if(rounds === 1) {
    clearInterval(interValStart)
  }
 
 
},10)
