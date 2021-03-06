
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class WetSand extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'wet-sand', frame)

    this.tint = 0xb4a050;
    this.anchor.setTo(.5);
    this.angle = game.rnd.integerInRange(-180, 180)
    game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true

    this.health = 3;
    this.alpha = 0

    this.events.onKilled.add(() => {
      this.body.destroy()
    })

    game.add.existing(this);
  }


  //Code ran on each frame of game
  update() {
    if (this.alpha < 0.9) {
      this.alpha += 0.1
    }
  }

}

export default WetSand;
