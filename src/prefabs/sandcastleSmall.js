const maxHealth = 5;
class SandcastleSmall extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'sandcastleSmall')
    game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    // Set Anchor to the center of your sprite
    this.anchor.setTo(.5);
    this.events.onKilled.add(() => {
      this.body.destroy()
    })

    this.health = 1

    game.add.existing(this)
  }

  addHealth(){
    if(this.health< maxHealth){
      this.health++;
    }
  }

  update() {
    // Uncomment this to see the physics collision box
    // this.game.debug.body(this);
  }

}

export default SandcastleSmall
