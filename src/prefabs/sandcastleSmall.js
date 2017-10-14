
class SandcastleSmall extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'sandcastleSmall')
    game.add.existing(this)
  }

  update() {}

}

export default SandcastleSmall
