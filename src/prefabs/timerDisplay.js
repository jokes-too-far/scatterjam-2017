import style from '../fontStyle'

class TimerDisplay extends Phaser.Text {

  constructor(game, timer) {
    super(game, game.centerX, game.centerY, 'default text yo', style)
    this.timer = timer
    game.add.existing(this)
  }

  update() {
    this.text = this.timer.duration / Phaser.Timer.SECOND
  }

}

export default TimerDisplay
