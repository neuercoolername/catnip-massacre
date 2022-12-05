import {canvas,ctx,enemieCatArray,player,upTickScore} from './index.js'


export class Catnip {
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
        const condition1 = (ele) => ele.bottom() < this.top()
        const condition2 = (ele) => ele.bottom() > this.bottom()
        const condition3 = (ele) => ele.bottom() < this.left()
        const condition4 = (ele) => ele.bottom() > this.right()
      if (
        !(
          player.bottom() < this.top() ||
          player.top() > this.bottom() ||
          player.right() < this.left() ||
          player.left() > this.right()
        )
      ) {
        upTickScore()
        return true;
      }
      else if(
        (
            enemieCatArray.some(condition1 && condition2 && condition3 && condition4)
      )){
        console.log("eaten at",this.x,this.y)
        return true
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
  
    
  
  
  export class PowerUp {
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
  
  export class PowerDrink extends PowerUp {
    constructor(x, y) {
      super(x, y);
      const newImage = new Image();
      newImage.addEventListener("load", () => {
        this.img = newImage;
      });
      newImage.src = "/images/powerUpDrink.png";
    }
    checkIfCollected() {
      const condition1 = (ele) => ele.bottom() < this.top()
      const condition2 = (ele) => ele.bottom() > this.bottom()
      const condition3 = (ele) => ele.bottom() < this.left()
      const condition4 = (ele) => ele.bottom() > this.right()

      if (
        !(
          player.bottom() < this.top() ||
          player.top() > this.bottom() ||
          player.right() < this.left() ||
          player.left() > this.right()
        )
        
      ) {
        upTickScore()
        player.changeImage("/images/catPoweredDrink.png", 84, 100, "powerDrink");
        setTimeout(()=>{
        player.changeImage("/images/mainCatCharacter.png", 42, 50, "");
  
        },10000)
        return true;
      }
      else if(
        !(
            enemieCatArray.some(condition1 && condition2 && condition3 && condition4)
      )){
        console.log("eaten at",this.x,this.y)
        return true
      }
    }
  }