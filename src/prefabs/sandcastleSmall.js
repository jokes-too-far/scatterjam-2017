
class SandcastleSmall extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'sandcastleSmall')
    this.tint = 0xb4a050;
    this.frame = 0;
    game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    // Set Anchor to the center of your sprite
    this.anchor.setTo(.5);
    this.events.onKilled.add(() => {
      this.body.destroy()
    })

    this.myMaxHealth=4
    this.health = 1

    game.add.existing(this)
  }

  addHealth(){
    if(this.health< this.myMaxHealth){
      this.health++;
      this.updateDisplay();
    }
  }

  updateDisplay(){
    this.frame = this.health-1;
  }

  update() {
    // Uncomment this to see the physics collision box
    // this.game.debug.body(this);
  }

}

export default SandcastleSmall
