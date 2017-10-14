import Ralph from '../prefabs/ralph'
import Gordon from '../prefabs/gordon'
import TimerDisplay from '../prefabs/timerDisplay'
import SandCastle from '../prefabs/sandcastleSmall'

var escapeKey;
var ralphLaneY;
var playerLaneY;
var timer;

class Game extends Phaser.State {

  constructor() {
    super()
  }

  create() {
    this.setUpDebug()

    //Level timer.
    timer = this.game.time.create(false)
    this.game.ba.timer = timer
    //TODO: make this time configurable via some level config?
    // This is currently set so that you can just barely lose the game if you let Ralph run
    // uninhibited.
    timer.add(Phaser.Timer.SECOND * 7, () => {
      this.endGame()
    })
    timer.start()
    new TimerDisplay(this.game, timer)


    var height = this.game.height
    ralphLaneY = height / 3
    playerLaneY = (height / 3) * 2
    new Ralph(this.game, this.game.width, ralphLaneY, 0);
    new Gordon(this.game, 50, playerLaneY, 0);

    const buildButton = this.game.input.keyboard.addKey(Phaser.Keyboard.B)
    buildButton.onDown.add(() => {
      const x = this.game.rnd.between(100, 500)
      new SandCastle(this.game, x, ralphLaneY)
    })
  }

  update() {}

  endGame() {
    this.game.state.start('gameover', false)
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
