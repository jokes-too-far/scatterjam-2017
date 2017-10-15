class WinSplash extends Phaser.Sprite {

  constructor(game) {
    console.log('I win')
    super(game, game.world.centerX, game.world.centerY, 'victory-screen')
    this.width = 1024
    this.height = 1024
    this.bringToTop()
    this.anchor.setTo(0.5)
    game.add.existing(this)
  }

  update() {}

}

export default WinSplash
