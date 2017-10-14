
class SandcastleSmall extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'sandcastleSmall')
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this)
  }

  update() {}

}

export default SandcastleSmall
