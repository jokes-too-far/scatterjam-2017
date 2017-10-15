import Ralph from '../prefabs/ralph'
import Gordon from '../prefabs/gordon'
import TimerDisplay from '../prefabs/timerDisplay'
import SandCastle from '../prefabs/sandcastleSmall'
import HeaderText from '../prefabs/headerText'
import SandEmitter from '../prefabs/sandEmitter'
import SandMeter from '../prefabs/sandMeter'
import Candy from '../prefabs/candy'
import WetSand from '../prefabs/wetSand'

var escapeKey;
var ralphLaneY;
var playerLaneY;
var castleLaneY;
var timer;
var ralph, gordie, candy
var castles = [];
var sandEmitter;
var sandMeter;
var wetSands = [];

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

    this.destroySound = this.game.add.audio('destroy')
    this.loserSound = this.game.add.audio('loser')

    var height = this.game.height
    ralphLaneY = height / 3 + 64
    playerLaneY = (height / 3) + 64 * 2.5
    castleLaneY = height / 3 +16

    sandEmitter = new SandEmitter(this.game, castleLaneY)
    ralph = new Ralph(this.game, this.game.width, ralphLaneY, 0);
    gordie = new Gordon(this.game, playerLaneY, 0);
    sandMeter = new SandMeter(this.game);
    candy = new Candy(this.game, 64, castleLaneY - 20, 0);

    //randomize wet sand location
    //what tile is wet?
    var wetTileLocation = this.game.rnd.integerInRange(1, this.game.ba.level.gridSpaces)
    var maxTiles = this.game.ba.level.gridSpaces
    var sandPositionX = this.game.width / maxTiles * wetTileLocation - 64;
    console.log(this.game.width, ' ', maxTiles, ' ',wetTileLocation, ' ',sandPositionX);
    wetSands.push(new WetSand(this.game, sandPositionX,playerLaneY - 64,0))


    const buildButton = this.game.input.keyboard.addKey(Phaser.Keyboard.B)
    buildButton.onDown.add(() => {
      //is Gordie on a sand tile?  and does his bucket have room?
      for (var sandspot of wetSands) {

        var sandspotRight = sandspot.x + (sandspot.width / 2)
        var sandspotLeft = sandspot.x - (sandspot.width / 2)
        console.log('gordie X: ', gordie.x, ' sandspotLeft: ', sandspotLeft, ' sandspotRight ', sandspotRight);
        console.log('sandMeter.sand: ', sandMeter.sand, ' sandMeter.maxSand: ', sandMeter.maxSand);
        if(gordie.x <= sandspotRight && gordie.x >= sandspotLeft && sandMeter.sand < sandMeter.maxSand){

            const gotSand = sandMeter.addSand()
            gordie.startBuilding();
            return;

        }
      }


      if (sandMeter.sand === 0) {
        // no sand! oh no
        return;
      }

      // if there is a castle above gordie
     var found = 'false';
     var ralphFound = 'false';
     var candyFound = 'false';

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

     // is the candy above gordie?
     if(gordie.x <= candy.x + (candy.width / 2) && gordie.x >= candy.x - (candy.width / 2)){
       candyFound = 'true';
       console.log("Sand on your candy? Yuck!")
     }

     if(found == 'true' || ralphFound == 'true' || candyFound == 'true'){
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

    if(!this.destroySound.isPlaying) {
      this.destroySound.play()
    }

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
    this.loserSound.play()
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
    var assetsToClear = [sandMeter, sandEmitter, ralph, gordie, candy].concat(castles).concat(wetSands)
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
    const f2Key = this.game.input.keyboard.addKey(Phaser.Keyboard.F2)
    f2Key.onDown.add(() => {
      timer.stop()
      this.game.ba.win = false
      this.endGame()
    }, this)
  }

  displayLevelName(){
    const header = new HeaderText(this.game, this.game.ba.level.name)
    this.game.time.events.add(2000, function() {
          header.bg.remove()
          this.game.add.tween(header).to({x: this.game.width}, 2000, Phaser.Easing.Linear.None, true);
          this.game.add.tween(header).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
        }, this);
    this.game.time.events.add(4000, function() {
      header.destroy()
    })
  }

}

export default Game;
