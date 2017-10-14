import Gordon from '../prefabs/gordon'
import TimerDisplay from '../prefabs/timerDisplay'

class Game extends Phaser.State {

  constructor() {
    super()
  }

  create() {
<<<<<<< HEAD
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Game', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);
    new Gordon();

    this.input.onDown.add(this.endGame, this);
=======
    const timer = this.game.time.create(false)
    timer.add(Phaser.Timer.SECOND * 5, () => {
      this.endGame()
    })
    timer.start()
    new TimerDisplay(this.game, timer)
>>>>>>> 640847deb4dee930b1e5ef4157fdbd13813c3392
  }

  update() {

  }

  endGame() {
    this.game.state.start('gameover')
  }

}

export default Game;
