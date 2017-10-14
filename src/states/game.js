import Ralph from '../prefabs/ralph'
import Gordon from '../prefabs/gordon'
import TimerDisplay from '../prefabs/timerDisplay'
import SandCastle from '../prefabs/sandcastleSmall'
import HeaderText from '../prefabs/headerText'

var escapeKey;
var ralphLaneY;
var playerLaneY;
var castleLaneY;
var timer;
var ralph, gordie
var castles = [];

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
    castleLaneY = height / 3 + 32

    ralph = new Ralph(this.game, this.game.width, ralphLaneY, 0);
    gordie = new Gordon(this.game, playerLaneY, 0);

    const buildButton = this.game.input.keyboard.addKey(Phaser.Keyboard.B)
    buildButton.onDown.add(() => {
      // if there is a castle above gordie
     var found = 'false';
     var ralphFound = 'false';
     for (var castle of castles) {
       if(gordie.x <= castle.x + (castle.width / 2) && gordie.x >= castle.x - (castle.width / 2)){
         found = 'true';
         gordie.animations.play("build");
         castle.addHealth();
         console.log("buffed health to ", castle.health)
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
       castles.push(new SandCastle(this.game, gordie.x, castleLaneY))
       gordie.animations.play("build");
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
    console.log("damaged castle health to ", sandcastle.health)
    if (sandcastle.health == 0){
      castles.splice()
    }
    ralph.body.velocity.x = 50
    this.game.camera.shake(0.005, 50);
  }

  endGame() {
    this.timerDisplay.kill();
    //this will persist across game loops if this isn't cleaned up correctly.
    castles = [];
    //pass ralph so we can do some animationy things.
    this.moveToEndState()
  }

  moveToEndState() {
    var assetsToClear = [ralph, gordie].concat(castles)
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
