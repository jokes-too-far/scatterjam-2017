import style from '../fontStyle'

const decimalPlacesToShow = 1

class TimerDisplay extends Phaser.Text {

  constructor(game, timer) {
    super(game, game.world.width, 0, '', style)
    this.timer = timer
    this.anchor.setTo(1, 0)
    game.add.existing(this)
  }

  update() {
    const timeLeft = (this.timer.duration / Phaser.Timer.SECOND).toFixed(decimalPlacesToShow)
    this.text = timeLeft + ' until Ralph\'s mom calls him back'
  }

}

export default TimerDisplay
