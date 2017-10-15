const SPRITE_SIZE=128;
const MAX_VELOCITY = -50
var space;

class Ralph extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game, x, y, frame) {
    x = x - (SPRITE_SIZE / 2)
    y = y - (SPRITE_SIZE / 2)
    super(game, x, y, 'ralph', frame);
    this.anchor.setTo(.5);
    this.animations.add('run', [1,2,3,4,5,6,7,8], 3, true);
    console.log("I AM RALPH, I AM MEAN")
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(50, 128, 40, 0);
    this.body.velocity.x = 0
    game.add.existing(this);
    this.animations.play("run");
  }

  update() {
    if (this.body.velocity.x > MAX_VELOCITY) {
      this.body.velocity.x  -= 2
    }

    // Uncomment this to see the physics collision box
    //this.game.debug.body(this);
  }

}

export default Ralph;
