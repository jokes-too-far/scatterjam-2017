import style from '../fontStyle'

class HeaderText extends Phaser.Text {

  constructor(game, text) {
    super(game, game.world.centerX, game.world.centerY, text, style)
    this.anchor.setTo(0.5)
    game.add.existing(this)
  }

  update() {}

}

export default HeaderText
