import {
  canvas,
  ctx,
  player,
  enemieCatArray,
  itemArray,
  catNipArray,
  catFightSound,
  findNearestItem,frame,

} from "./index.js";


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
    return this.x - 20;
  }
  right() {
    return this.x + 20;
  }
  top() {
    return this.y - 20;
  }
  bottom() {
    return this.y + 20;
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
      if (player.powerUp != "powerDrink") {
        const fightCloud = new Image();
        fightCloud.addEventListener("load", () => {
          this.fightCloudImg = fightCloud;
        });
        fightCloud.src = "./images/fightCloud.png";
        console.log(typeof this.fightCloudImg,this.fightCloudImg)
        ctx.drawImage(this.fightCloudImg, this.x - 100, this.y - 50, 300, 171);

 
      }
      catFightSound.play();

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
    newImage.src = "./images/enemieCat01.png";
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
    newImage.src = "./images/enemieCat02.png";
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 38, 50);
    }
  }
  move() {
    if (player.y > this.y) {
      if (player.powerUp === "powerDrink") {
        this.y -= 0.3;
      } else {
        this.y += 1;
      }
    }

    if (player.y < this.y) {
      if (player.powerUp === "powerDrink") {
        this.y += 0.3;
      } else {
        this.y -= 1;
      }
    }
    if (player.x > this.x) {
      if (player.powerUp === "powerDrink") {
        this.x -= 0.3;
      } else {
        this.x += 1;
      }
    }
    if (player.x < this.x) {
      if (player.powerUp === "powerDrink") {
        this.x += 0.3;
      } else {
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
    newImage.src = "./images/enemieCat04.png";
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
    newImage.src = "./images/turd.png";
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

class Eater extends EnemieCat {
  constructor(x, y) {
    super(x, y);
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "./images/enemieCat05.png";
  }
  move() {
    if (catNipArray.length > 0) {
      const nearestItem = findNearestItem(this.x);
      const nearestX = nearestItem[0];
      const nearestY = nearestItem[1];

      if (nearestY > this.y) {
        this.y += 1;
      }

      if (nearestY < this.y) {
        this.y -= 1;
      }
      if (nearestX > this.x) {
        this.x += 1;
      }
      if (nearestX < this.x) {
        this.x -= 1;
      }
    }
  }
 
}

export { EnemieCat, Jumper, Creeper, Pooper, Poo, Eater };
