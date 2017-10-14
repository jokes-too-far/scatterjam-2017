import Gordon from '../prefabs/gordon'
import TimerDisplay from '../prefabs/timerDisplay'

var escapeKey;

class Game extends Phaser.State {

  constructor() {
    super()
  }

  create() {
    const timer = this.game.time.create(false)
    timer.add(Phaser.Timer.SECOND * 5, () => {
      this.endGame()
    })
    timer.start()
    escapeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    escapeKey.onDown.add(function(){
      this.input.onDown.add(this.endGame, this);
      timer.stop()
    }, this);
    new TimerDisplay(this.game, timer)
    new Gordon(this.game, this.game.width, this.game.height / 2, 0);
  }

  update() {}

  endGame() {
    this.game.state.start('gameover')
  }

}

export default Game;
