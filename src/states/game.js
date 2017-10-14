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
      castles.push(new SandCastle(this.game, gordie.x, ralphLaneY))
    })
  }

  update() {
    for (const sandcastle of castles) {
      this.game.physics.arcade.collide(ralph, sandcastle, this.collisionHandler, null, this)
    }
  }

  collisionHandler(ralph, sandcastle) {
    sandcastle.damage(1)
    ralph.body.velocity.x = 50
  }

  endGame() {
    this.game.state.start('endLevel', false)
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
