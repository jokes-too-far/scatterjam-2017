import style from '../fontStyle'
import TextBackground from './textBackground'

class HeaderText extends Phaser.Text {

  constructor(game, text, y) {
     y = y || game.world.centerY + 128
    super(game, game.world.centerX, y, text, style)
    this.bg = new TextBackground(game, y)
    this.anchor.setTo(0.5)
    game.add.existing(this)
    this.events.onDestroy.add(() => {
      this.bg.remove()
    })
  }

  update() {}

}

export default HeaderText
