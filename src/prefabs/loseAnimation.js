class LoseAnimation extends Phaser.Sprite {

  constructor(game) {
    super(game, game.world.centerX, game.world.centerY, 'lose-screen')
    this.animations.add('play', [0,1,2,3], 2, false);
    this.animations.play('play');
    this.width = 1024
    this.height = 1024
    this.bringToTop()
    this.anchor.setTo(0.5)
    game.add.existing(this)
  }

  update() {}

}

export default LoseAnimation
