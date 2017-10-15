class TextBackground extends Phaser.TileSprite {

  constructor(game, y, width, height) {
    super(game, 0, y, game.width, 256, 'textBackground')
    this.anchor.setTo(0, 0.5)
    game.add.existing(this)
  }

  update() {}

}

export default TextBackground
