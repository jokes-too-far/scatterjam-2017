import Ralph from '../prefabs/ralph'
import Gordon from '../prefabs/gordon'
import TimerDisplay from '../prefabs/timerDisplay'
import SandCastle from '../prefabs/sandcastleSmall'
import HeaderText from '../prefabs/headerText'
import SandEmitter from '../prefabs/sandEmitter'
import SandMeter from '../prefabs/sandMeter'
import Candy from '../prefabs/candy'

var escapeKey;
var ralphLaneY;
var playerLaneY;
var castleLaneY;
var timer;
var ralph, gordie, candy
var castles = [];
var sandEmitter;
var sandMeter;

class Game extends Phaser.State {

  constructor() {
    super()
  }

  create() {
    this.setUpDebug()

    //Level timer.
    timer = this.game.time.create(false)
    this.game.ba.timer = timer
    timer.add(Phaser.Timer.SECOND * this.game.ba.level.levelTimeSeconds, () => {
      this.endGame()
    })
    timer.start()
    this.timerDisplay = new TimerDisplay(this.game, timer)
    this.displayLevelName()

    var height = this.game.height
    ralphLaneY = height / 3 + 64
    playerLaneY = (height / 3) + 64 * 2.5
    castleLaneY = height / 3 +16

    sandEmitter = new SandEmitter(this.game, castleLaneY)
    ralph = new Ralph(this.game, this.game.width, ralphLaneY, 0);
    gordie = new Gordon(this.game, playerLaneY, 0);
    sandMeter = new SandMeter(this.game);
    candy = new Candy(this.game, 64, castleLaneY, 0);

    const buildButton = this.game.input.keyboard.addKey(Phaser.Keyboard.B)
    buildButton.onDown.add(() => {
      if (gordie.x > this.game.width * 0.6) {
        const gotSand = sandMeter.addSand()
        return;
      }

      if (sandMeter.sand === 0) {
        // no sand! oh no
        return;
      }

      // if there is a castle above gordie
     var found = 'false';
     var ralphFound = 'false';
     for (var castle of castles) {
       if(gordie.x <= castle.x + (castle.width / 2) && gordie.x >= castle.x - (castle.width / 2)){
         found = 'true';
         gordie.startBuilding();
         //console.log("buffed health to ", castle.health)
         this.emitSandParticles(gordie.x)
         if (castle.health<castle.myMaxHealth){
           sandMeter.removeSand()
         }
         castle.addHealth();
       }
     }

     // is ralph above gordie?
     if(gordie.x <= ralph.x + (ralph.width / 2) && gordie.x >= ralph.x - (ralph.width / 2)){
       ralphFound = 'true';
       console.log("How dare you build on me?")
     }

     if(found == 'true' || ralphFound == 'true'){
       //nothing to do for now
     }
     else {
       // add a new castle
       gordie.startBuilding();
       castles.push(new SandCastle(this.game, gordie.x, castleLaneY))
       this.emitSandParticles(gordie.x)
       sandMeter.removeSand()
     }
    })
  }

  update() {
    if (ralph.x < 0) {
      if(this.game.ba.win === false){
        return;
      }
      this.game.ba.win = false;
      this.game.ba.timer.stop();
      //play animation of bro eating candy
      const timer = this.game.time.create(false)
      timer.add(Phaser.Timer.SECOND * 1.5, () => {
        this.moveToEndState()
      })
      timer.start();
    }

    for (const sandcastle of castles) {
      this.game.physics.arcade.collide(ralph, sandcastle, this.collisionHandler, null, this)
    }

    this.game.physics.arcade.collide(ralph, candy, this.candyCollisionHandler, null, this)

    var newCastles = []
    for (var castle of castles) {
      if(castle.health > 0){
        newCastles.push(castle);
      }
    }
    castles = newCastles;
  }

  collisionHandler(ralph, sandcastle) {
    sandcastle.damage(1)
    sandcastle.updateDisplay();
    //console.log("damaged castle health to ", sandcastle.health)
    if (sandcastle.health == 0){
      castles.splice()
    }
    ralph.body.velocity.x = 50
    this.game.camera.shake(0.005, 50);

    this.emitSandParticles(sandcastle.x)
  }

  candyCollisionHandler(ralph, candy) {
    this.game.ba.win = false;
    // make candy move with Ralph
    ralph.addChild(candy);
    //reset the candy position relative to Ralph
    candy.x = 0;
    candy.y = 0;
      // trigger game over.  he took your candy!
    this.endGame();
  }

  emitSandParticles(x) {
    sandEmitter.x = x
    sandEmitter.start(true, 200, null, 5)
  }

  endGame() {
    this.timerDisplay.kill();
    this.moveToEndState()
  }

  moveToEndState() {
    var assetsToClear = [sandMeter, sandEmitter, ralph, gordie, candy].concat(castles)
    castles = [];
    this.game.state.start('endLevel', false, false, ralph, assetsToClear)
  }

  setUpDebug() {
    if(this.game.ba.dev_mode !== true){
      return;
    }
    //set up the escape key to stop the timer, and enable click to continue
    escapeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC)
    escapeKey.onDown.add(function(){
      this.input.onDown.add(this.endGame, this)
      timer.stop()
    }, this)
  }

  displayLevelName(){
    var header = new HeaderText(this.game, this.game.ba.level.name)
    this.game.time.events.add(2000, function() {
          this.game.add.tween(header).to({x: this.game.width}, 2000, Phaser.Easing.Linear.None, true);
          this.game.add.tween(header).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
        }, this);
    this.game.time.events.add(4000, function() {
      header.kill()
    })
  }

}

export default Game;
