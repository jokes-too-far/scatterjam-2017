import Gordon from '../prefabs/gordon'
import TimerDisplay from '../prefabs/timerDisplay'

const DEV_MODE=true;
var escapeKey;
var gordonLaneY;
var playerLaneY;
var timer;

class Game extends Phaser.State {

  constructor() {
    super()
  }

  create() {
    //Set DEV_MODE environment variable to true if you wanna
    this.setUpDebug()

    //Level timer.
    timer = this.game.time.create(false)
    this.game.ba.timer = timer
    //TODO: make this time configurable via some level config?
    timer.add(Phaser.Timer.SECOND * 5, () => {
      this.endGame()
    })
    timer.start()
    new TimerDisplay(this.game, timer)

    var height = this.game.height
    gordonLaneY = height / 3
    playerLaneY = (height / 3) * 2
    new Gordon(this.game, this.game.width, gordonLaneY, 0);
  }

  update() {}

  endGame() {
    this.game.state.start('gameover')
  }

  setUpDebug() {
    this.game.ba.dev_mode = DEV_MODE;
    if(DEV_MODE !== true){
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
