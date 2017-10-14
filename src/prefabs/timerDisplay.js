import style from '../fontStyle'

const decimalPlacesToShow = 1

class TimerDisplay extends Phaser.Text {

  constructor(game, timer) {
    super(game, game.world.centerX, 0, '', style)
    this.timer = timer
    this.anchor.setTo(0.5, 0)
    game.add.existing(this)
  }

  update() {
    this.text = (this.timer.duration / Phaser.Timer.SECOND).toFixed(decimalPlacesToShow)
  }

}

export default TimerDisplay
