import TimerDisplay from '../prefabs/timerDisplay'

class Game extends Phaser.State {

  constructor() {
    super()
  }

  create() {
    const timer = this.game.time.create(false)
    timer.add(Phaser.Timer.SECOND * 5, () => {
      console.log('done');
    })
    timer.start()
    new TimerDisplay(this.game, timer)
    console.log(timer);

    this.input.onDown.add(this.endGame, this)
  }

  update() {

  }

  endGame() {
    this.game.state.start('gameover')
  }

}

export default Game;
