import { EnemieCat, Jumper, Creeper, Eater, Pooper, Poo } from "./EnemyCat.js";
import { Catnip, PowerDrink, PowerUp } from "./Item.js";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const backgroundImage = new Image();
backgroundImage.src = "./images/background game.png";

let intervalId;
export let score = 0;
export const enemieCatArray = [];
export const catNipArray = [];
export const itemArray = [];
const enemieCatClasses = [Jumper, Creeper, Pooper, Eater];
export const catSoundItem = new Audio("./sounds/catSoundItem.mp3");
export const catFightSound = new Audio("./sounds/catFight.wav");
const backGroundMusic = new Audio("./sounds/soundtrack.mp3");
backGroundMusic.volume = 0.07;
backGroundMusic.loop = true;

/* game functions */

export let frame = 0;


export function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  player.draw();
  updateEnemieCat();
  updateScore();
  itemUpdater();
  catNitUpdater();
}
export function findNearestItem(xValue) {
    let smallestNumber = 700;
    let correspondingNumber = 0;
    let newArr = [smallestNumber, correspondingNumber];
    if (catNipArray.length > 0) {
      for (let i = 0; i < catNipArray.length; i++) {
        if (Math.abs(catNipArray[i].x - xValue) < smallestNumber) {
          smallestNumber = catNipArray[i].x;
          correspondingNumber = catNipArray[i].y;
          newArr = [smallestNumber, correspondingNumber];
        }
      }
      return newArr;
    }
  }
  
  export function upTickScore() {
    score += 50;
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
    }, 2500);
    // }
  }
  
  function catNitUpdater() {
    if (frame % 180 === 0) {
      const randomX = Math.floor(Math.random() * 600);
      const randomY = Math.floor(Math.random() * 600);
  
      catNipArray.push(new Catnip(randomX, randomY));
    }
  
    for (let i = 0; i < catNipArray.length; i++) {
      catNipArray[i].draw();
      catNipArray[i].checkIfCollected();
      catNipArray[i].checkIfCollectedByEnemie();
      if (catNipArray[i].isCollected) {
        catNipArray.splice([i], 1);
      }
    }
  }
  
  function itemUpdater() {
    if (frame % 1800 === 0) {
      const randomX = Math.floor(Math.random() * 600);
      const randomY = Math.floor(Math.random() * 600);
  
      itemArray.push(new PowerDrink(randomX, randomY));
    }
  
    for (let i = 0; i < itemArray.length; i++) {
      itemArray[i].draw();
      itemArray[i].checkIfCollected();
      if (itemArray[i].isCollected) {
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
          score += 100;
          enemieCatArray.splice([i], 1);
        } else {
          checkGameOver();
        }
      }
    }
  
    frame += 1;
    if (frame % 360 === 0) {
      spawnEnemieCat();
  
    }
  }
  
  function spawnEnemieCat() {
    const randomX = Math.floor(Math.random() * 600);
    const randomY = Math.floor(Math.random() * 600);
    const randomClass = Math.floor(Math.random() * enemieCatClasses.length);
    if (
      Math.abs(randomX - player.x) > 100 &&
      Math.abs(randomY - player.y) > 100
    ) {
      enemieCatArray.push(new enemieCatClasses[randomClass](randomX, randomY));
    } else {
      spawnEnemieCat();
    }
  }
  
  
  
  function stop() {
    clearInterval(intervalId);
  }

  export {stop,spawnEnemieCat,updateEnemieCat,itemUpdater,catNitUpdater,checkGameOver,updateScore,drawBackground,startGame}



/* main Character class */

class CatCharacter {
  constructor() {
    this.x = 350;
    this.y = 350;
    this.width = 42;
    this.height = 50;
    this.powerUp = "";

    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "./images/mainCatCharacter.png";
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
    return this.y + this.height / 1.3;
  }
}

export const player = new CatCharacter();

// event listener / player controler // animations

document.getElementById("startBtn").addEventListener("click", () => {
  setTimeout(() => {
    startGame();
    backGroundMusic.play();
  }, 2000);

  document.getElementById("startBtn").style.display = "none";
  document.getElementById("headline").style.display = "none";
  animateIntroStart();
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

document
  .getElementById("restartBtn")
  .addEventListener("click", () => location.reload());

let rotation = 0;
let rotationRel = rotation % 360;
let rounds = 0;
const interValStart = setInterval(() => {
  if (rotationRel <= 360) {
    rotation += 2;

    document.getElementById("introImage").style.WebkitTransitionDuration =
      "0.1ms";
    document.getElementById(
      "introImage"
    ).style.webkitTransform = `rotate(${rotation}deg)`;
    document.getElementById("introImage").animate(
      {
        width: "700px",
        height: "700px",
      },
      50000
    );
  }
  if (rotation % 360 === 0) {
    rounds++;
  }
  if (rounds === 1) {
    clearInterval(interValStart);
  }
}, 10);

function animateIntroStart() {
  let rotation = 0;
  let rotationRel = rotation % 360;
  let rounds = 0;
  const interValStart = setInterval(() => {
    if (rotationRel <= 360) {
      rotation += 2;

      document.getElementById("introImage").style.WebkitTransitionDuration =
        "0.1ms";
      document.getElementById(
        "introImage"
      ).style.webkitTransform = `rotate(${rotation}deg)`;
      document.getElementById("introImage").animate(
        {
          width: "2500px",
          height: "2500px",
        },
        30000
      );
    }
    if (rotation % 360 === 0) {
      rounds++;
    }
    if (rounds === 1) {
      clearInterval(interValStart);
    }
  }, 10);
}


export function animationPowerUp() {
  let one = document.getElementById("animationPowerUpImgOne");
  let two = document.getElementById("animationPowerUpImgTwo");
  let three = document.getElementById("animationPowerUpImgThree");
  let four = document.getElementById("animationPowerUpImgFour");
  one.style.display = "flex";
  setTimeout(() => {
    two.style.display = "block";
  }, 700);
  setTimeout(() => {
    one.style.display = "none";
  }, 700);
  setTimeout(() => {
    two.style.display = "none";
  }, 1400);
  setTimeout(() => {
    three.style.display = "block";
  }, 1400);
  setTimeout(() => {
    three.style.display = "none";
  }, 2100);
  setTimeout(() => {
    three.style.display = "block";
  }, 1400);
  setTimeout(() => {
    three.style.display = "none";
  }, 2100);
  setTimeout(() => {
    four.style.display = "block";
  }, 2100);
  setTimeout(() => {
    four.style.display = "none";
  }, 2800);

}


