
class SandcastleSmall extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'sandcastleSmall')
    game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    this.events.onKilled.add(() => {
      this.body.destroy()
    })


    this.health = 4

    game.add.existing(this)
  }

  update() {
    // Uncomment this to see the physics collision box
    // this.game.debug.body(this);
  }

}

export default SandcastleSmall
