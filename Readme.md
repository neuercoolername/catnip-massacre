# Catnip Massacre

![Alt text](../../../../../../../C:/Users/David/Desktop/IronHack/catnip%20massacre/game/images/background%20game.png)

[Click here to see deployed game](https://neuercoolername.github.io/catnip-massacre/)

## Description
Catnip Massacre is a game where you play a cat trying to gather as much Catnip as possible. Collect Catnip, avoid other Cats and upgrade yourself with a mysterious energy drink. After picking up the power up you're invincible for 10 seconds and can beat other cats. Otherwise, the game ends if you run into another cat. After that a score is calculated based on the amount of Catnip is gathered and how many other Cats you've beaten up.


## MVP
- game has a maincharacter that can be controlled via arrow-keys
- catnip spawns randomly on the level
- other cats spawn randomly on the level
- other cats move around
- the game registers collision between the elements: running into catnip increases your score, running into other cats ends it

## Backlog
- different classes of other cats
- a powerUp that lets you beat other cats
- 


## Data structure

## index.js
updateGame()
findNearestItem()
findNearestItem()
startGame()
drawBackground()
updateScore()
checkGameOver()
catNitUpdater()
itemUpdater()
updateEnemieCat()
spawnEnemieCat()
stop()

class CatCharacter


## EnemyCat.js
class EnemieCat
class Eater extends EnemieCat
class Jumper extends EnemieCat
class Creeper extends EnemieCat
class Pooper extends EnemieCat
class Poo
## Item.js
class Catnip
class PowerUp
class PowerDrink extends PowerUp

## States y States Transitions
- splashScreen
- gameScreen
- gameOverScreen


## Links

- [Trello Link](https://trello.com/b/8DvOgOlB/catnip-massacre)
- [Slides Link](http://slides.com)
- [Github repository Link](https://github.com/neuercoolername/catnip-massacre)
- [Deployment Link](https://neuercoolername.github.io/catnip-massacre/)