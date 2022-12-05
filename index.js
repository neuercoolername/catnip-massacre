const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "/images/background game.png";

let intervalId;
let frame = 0;
let score = 0;
const enemieCatArray = [];
// const turdArray = [];
let obstaclesArray = [];
const itemArray = [];

const enemieCatData = [
  "images/enemieCat01.png",
  "images/enemieCat02.png",
  "images/enemieCat03.png",
  "images/enemieCat04.png",
];

// functions

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  player.draw();
  updateEnemieCat();
  updateScore();
  // checkGameOver();
  // updateObstaclesArray()
  itemUpdater();
}

function startGame() {
  document.querySelector("#intro").style.display = "none";
  document.querySelector("#canvas").style.display = "flex";

  drawBackground();
  player.draw();
  intervalId = setInterval(updateGame, 20);
}

// function updateObstaclesArray () {obstaclesArray = enemieCatArray.concat(turdArray)}

function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  // document.querySelector('#game-board').style = 'width: 100vw; display: flex; justify-content: center;';
}

function updateScore() {
  // score = Math.floor(frame / 10); // 1 sec -->12
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

  for (i = 0; i < itemArray.length; i++) {
    itemArray[i].draw();
    itemArray[i].checkIfCollected();
    if (itemArray[i].checkIfCollected()) {
      itemArray.splice([i], 1);
    }
  }
}

function updateEnemieCat() {
  for (i = 0; i < enemieCatArray.length; i++) {
    enemieCatArray[i].draw();

    if (enemieCatArray[i].isCat) {
      enemieCatArray[i].move();
    }
    if (enemieCatArray[i].isPooper) {
      enemieCatArray[i].poop();
    }
    if (enemieCatArray[i].checkIfCollision()) {
      console.log("found collision");
      if (player.powerUp === "powerDrink") {
        enemieCatArray.splice([i], 1);
      } else {
        checkGameOver();
      }
    }
  }

  // for (i = 0; i < turdArray.length; i++) {
  //   turdArray[i].draw();
  // }

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
    return this.x - 10;
  }
  right() {
    return this.x + 10;
  }
  top() {
    return this.y - 10;
  }
  bottom() {
    return this.y + 10;
  }
}

player = new CatCharacter();

class EnemieCat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isCat = true;
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 50, 50);
    }
  }
  left() {
    return this.x - 10;
  }
  right() {
    return this.x + 10;
  }
  top() {
    return this.y - 10;
  }
  bottom() {
    return this.y + 10;
  }
  checkIfCollision() {
    if (
      !(
        player.bottom() < this.top() ||
        player.top() > this.bottom() ||
        player.right() < this.left() ||
        player.left() > this.right()
      )
    ) {
      return true;
    }
  }
}

class Jumper extends EnemieCat {
  constructor(x, y) {
    super(x, y);
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "/images/enemieCat01.png";
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 53, 50);
    }
  }
  move() {
    let randomDirection = Math.floor(Math.random() * 4);
    switch (randomDirection) {
      case 0:
        this.y += 5;

        break;
      case 1:
        this.y -= 5;

        break;

      case 2:
        this.x += 5;

        break;
      case 3:
        this.x -= 5;

        break;
    }
  }
}

class Creeper extends EnemieCat {
  constructor(x, y) {
    super(x, y);
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "/images/enemieCat02.png";
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 38, 50);
    }
  }
  move() {
    if (player.y > this.y) {
      if (player.powerUp === "powerDrink") {
        this.y -= 1;
      }
      else{
        this.y += 1;

      }
    }

    if (player.y < this.y) {
      if (player.powerUp === "powerDrink") {
        this.y += 1;
      }
      else {
        this.y -= 1;

      }
    }
    if (player.x > this.x) {
      if (player.powerUp === "powerDrink") {
        this.x -= 1;
      }
      else{
        this.x += 1;

      }
    }
    if (player.x < this.x) {
      if (player.powerUp === "powerDrink") {
        this.x += 1;
      }
      else{
        this.x -= 1;

      }
      
    }
  }
}

class Pooper extends EnemieCat {
  constructor(x, y) {
    super(x, y);
    this.isPooper = true;
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "/images/enemieCat04.png";
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 33, 50);
    }
  }
  move() {
    this.y += 1;
  }
  poop() {
    if (frame % 300 === 0) {
      enemieCatArray.push(new Poo(this.x, this.y));
      enemieCatArray.forEach((turd) => turd.draw());
    }
  }
}

class Poo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "/images/turd.png";
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 25, 25);
    }
  }
  left() {
    return this.x - 15;
  }
  right() {
    return this.x + 15;
  }
  top() {
    return this.y - 15;
  }
  bottom() {
    return this.y + 15;
  }
  checkIfCollision() {
    if (
      !(
        player.bottom() < this.top() ||
        player.top() > this.bottom() ||
        player.right() < this.left() ||
        player.left() > this.right()
      )
    ) {
      return true;
    }
  }
}

class Catnip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "/images/catnip.png";
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 50, 50);
    }
  }
  checkIfCollected() {
    if (
      !(
        player.bottom() < this.top() ||
        player.top() > this.bottom() ||
        player.right() < this.left() ||
        player.left() > this.right()
      )
    ) {
      score += 50;
      return true;
    }
  }

  left() {
    return this.x - 15;
  }
  right() {
    return this.x + 15;
  }
  top() {
    return this.y - 15;
  }
  bottom() {
    return this.y + 15;
  }
}

class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 50, 50);
    }
  }

  left() {
    return this.x - 15;
  }
  right() {
    return this.x + 15;
  }
  top() {
    return this.y - 15;
  }
  bottom() {
    return this.y + 15;
  }
}

class PowerDrink extends PowerUp {
  constructor(x, y) {
    super(x, y);
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "/images/powerUpDrink.png";
  }
  checkIfCollected() {
    if (
      !(
        player.bottom() < this.top() ||
        player.top() > this.bottom() ||
        player.right() < this.left() ||
        player.left() > this.right()
      )
    ) {
      score += 50;
      player.changeImage("/images/catPoweredDrink.png", 84, 100, "powerDrink");
      setTimeout(()=>{
      player.changeImage("/images/mainCatCharacter.png", 42, 50, "");

      },10000)
      return true;
    }
  }
}

const enemieCatClasses = [Jumper, Creeper, Pooper];

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

document.getElementById("startBtn").addEventListener("mouseover", () => {
  document.getElementById("intro").style.backgroundColor = "red";
});
document.getElementById("startBtn").addEventListener("mouseout", () => {
  document.getElementById("intro").style.backgroundColor = "transparent";
});
document
  .getElementById("restartBtn")
  .addEventListener("click", () => location.reload());
