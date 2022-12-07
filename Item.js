import {
  player,
  canvas,
  ctx,
  enemieCatArray,
  catSoundItem,
  animationPowerUp,upTickScore
} from "./index.js";

export class Catnip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isCollected = false;
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "./images/catnip.png";
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
      catSoundItem.play();
      upTickScore();
      this.isCollected = true;
    }
  }
  checkIfCollectedByEnemie() {
    for (let i = 0; i < enemieCatArray.length; i++) {
      if (
        !(
          enemieCatArray[i].bottom() < this.top() ||
          enemieCatArray[i].top() > this.bottom() ||
          enemieCatArray[i].right() < this.left() ||
          enemieCatArray[i].left() > this.right()
        )
      ) {
        this.isCollected = true;
      }
    }
  }
  left() {
    return this.x - 35;
  }
  right() {
    return this.x + 35;
  }
  top() {
    return this.y - 35;
  }
  bottom() {
    return this.y + 35;
  }
}

export class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isCollected = false;
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, 50, 50);
    }
  }

  left() {
    return this.x - 45;
  }
  right() {
    return this.x + 45;
  }
  top() {
    return this.y - 45;
  }
  bottom() {
    return this.y + 45;
  }
}

export class PowerDrink extends PowerUp {
  constructor(x, y) {
    super(x, y);
    const newImage = new Image();
    newImage.addEventListener("load", () => {
      this.img = newImage;
    });
    newImage.src = "./images/powerUpDrink.png";
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
      upTickScore();
      player.changeImage("./images/catPoweredDrink.png", 84, 100, "powerDrink");
      animationPowerUp();

      setTimeout(() => {
        player.changeImage("./images/mainCatCharacter.png", 42, 50, "");
      }, 15000);
      this.isCollected = true;
    }
  }

  checkIfCollectedByEnemie() {
    for (let i = 0; i < enemieCatArray.length; i++) {
      if (
        !(
          enemieCatArray[i].bottom() < this.top() ||
          enemieCatArray[i].top() > this.bottom() ||
          enemieCatArray[i].right() < this.left() ||
          enemieCatArray[i].left() > this.right()
        )
      ) {
        this.isCollected = true;
      }
    }
  }
}
