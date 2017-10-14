import Ralph from '../prefabs/ralph'
import Gordon from '../prefabs/gordon'
import TimerDisplay from '../prefabs/timerDisplay'
import SandCastle from '../prefabs/sandcastleSmall'

var escapeKey;
var ralphLaneY;
var playerLaneY;
var timer;
var ralph
var castles = []

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
    new TimerDisplay(this.game, timer)


    var height = this.game.height
    ralphLaneY = height / 3
    playerLaneY = (height / 3) * 2 + 64
    ralph = new Ralph(this.game, this.game.width, ralphLaneY, 0);
    var gordie = new Gordon(this.game, playerLaneY, 0);

    const buildButton = this.game.input.keyboard.addKey(Phaser.Keyboard.B)
    buildButton.onDown.add(() => {
      // if there is a castle above gordie
     var found = 'false';
     for (var castle of castles) {
       if(gordie.x <= castle.x + (castle.width / 2) && gordie.x >= castle.x - (castle.width / 2)){
         found = 'true';
         castle.addHealth();
         console.log("buffed health to ", castle.health)
       }
     }

     if(found == 'true'){
       //nothing to do for now
     }
     else {
       // add a new castle
       castles.push(new SandCastle(this.game, gordie.x, ralphLaneY + 32))
     }
    })
  }

  update() {
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

    for (var castle of castles) {
        castles = [];
    }
    this.game.state.start('endLevel', false, false, ralph)
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


}

export default Game;
