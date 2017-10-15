import TextBackground from './textBackground'

class TitleGraphic extends Phaser.Sprite {

  constructor(game) {
    super(game, game.world.centerX, -1000, 'titleGraphic')
    this.bg = new TextBackground(game, game.world.centerY)
    this.target = game.world.centerY
    this.anchor.setTo(0.5)
    game.add.existing(this)

    this.events.onDestroy.add(() => {
      console.log('detah');
      this.bg.destroy()
    })
  }

  update() {
    this.y += (this.target - this.y) * 0.1
  }

}

export default TitleGraphic
