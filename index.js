const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "/images/background game.png";

let intervalId;
let frame = 0;
let score = 0;
const enemieCatArray = [];
const turdArray = [];
let obstaclesArray = []

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
  checkGameOver();
  updateObstaclesArray()
}

function startGame() {
  drawBackground();
  player.draw();
  intervalId = setInterval(updateGame, 20);
}

function updateObstaclesArray () {obstaclesArray = enemieCatArray.concat(turdArray)}

function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  document.querySelector("#intro").style.display = "none";
  // document.querySelector('#game-board').style = 'width: 100vw; display: flex; justify-content: center;';
}

function updateScore() {
  score = Math.floor(frame / 10); // 1 sec -->12
  ctx.font = "18px serif";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 350, 50);
}

function checkGameOver() {
  const crashed = obstaclesArray.some(function (obstacle) {
    return crashWith(obstacle);
  });

  if (crashed) {
    stop();
    console.log("game over");

    const points = Math.floor(frames / 10);

    ctx.font = "35px serif";
    ctx.fillStyle = "cyan";
    ctx.fillText(`GAME OVER your score is ${points} `, 20, canvas.height / 2);
  }
}

function crashWith(obstacle) {
  return !(
    player.bottom() < obstacle.top() ||
    player.top() > obstacle.bottom() ||
    player.right() < obstacle.left() ||
    player.left() > obstacle.right()
  );
}

function updateEnemieCat() {
  for (i = 0; i < enemieCatArray.length; i++) {
    enemieCatArray[i].move();
    enemieCatArray[i].draw();
    if (enemieCatArray[i].isPooper) {
      enemieCatArray[i].poop();
    }
  }

  for (i = 0; i < turdArray.length; i++) {
    turdArray[i].draw();
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

    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "/images/mainCatCharacter.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 50, 50);
  }
  moveLeft() {
    this.x -= 15;
  }
  moveRight() {
    this.x += 15;
  }
  moveUp() {
    this.y -= 15;
  }
  moveDown() {
    this.y += 15;
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
  move() {
    if (player.y > this.y) {
      this.y += 1;
    }
    if (player.y < this.y) {
      this.y -= 1;
    }
    if (player.x > this.x) {
      this.x += 1;
    }
    if (player.x < this.x) {
      this.x -= 1;
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
  move() {
    this.y += 1;
  }
  poop() {
    if (frame % 300 === 0) {
      turdArray.push(new Poo(this.x, this.y));
      turdArray.forEach((turd) => turd.draw());
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
      ctx.drawImage(this.img, this.x, this.y, 20, 20);
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
