class TitleGraphic extends Phaser.Sprite {

  constructor(game) {  
    super(game, game.world.centerX, -1000, 'titleGraphic')
    this.target = game.world.centerY
    this.anchor.setTo(0.5)
    game.add.existing(this)
  }

  update() {
    this.y += (this.target - this.y) * 0.1
  }

}

export default TitleGraphic
