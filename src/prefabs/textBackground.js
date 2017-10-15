class TextBackground extends Phaser.TileSprite {

  constructor(game, y, width, height) {
    super(game, 0, y, 0, 256, 'textBackground')
    this.scale.y = 0.5
    this.anchor.setTo(0, 0.5)
    game.add.existing(this)
  }

  update() {
    this.width += (this.game.width - this.width) * 0.15
  }

}

export default TextBackground
