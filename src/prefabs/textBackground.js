class TextBackground extends Phaser.TileSprite {

  constructor(game, y) {
    super(game, 0, y, 0, 256, 'textBackground')
    this.scale.y = 0.5
    this.anchor.setTo(0, 0.5)
    game.add.existing(this)

    this.destroying = false
  }

  update() {
    if (this.destroying) {
      if (this.alpha > 0.1) {
        this.alpha -= 0.05
      } else {
        super.destroy()
      }
      return
    }
    this.width += (this.game.width - this.width) * 0.15
  }

  remove() {
    this.destroying = true
  }

}

export default TextBackground
