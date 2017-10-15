class Sun extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'sun')
    this.anchor.setTo(0.5)
    this.scale.setTo(1.2)
    game.add.existing(this)
  }

  update() {
    this.angle = 30 + Math.sin(this.game.time.time * 1/500) * 5
  }

}

export default Sun
