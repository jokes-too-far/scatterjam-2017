const SPRITE_SIZE=128;
const MAX_VELOCITY = 250;
const ACCELERATION = 25;

var space;
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Gordon extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
      x = x - (SPRITE_SIZE / 2)
      y = y - (SPRITE_SIZE / 2)
      super(game, x, y, 'gordon', frame);
      console.log("I AM GORDON, HEAR ME RAWR")
      game.physics.enable(this, Phaser.Physics.ARCADE);
      game.add.existing(this);
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);
      this.facing = 'right';
      // Invert scale.x to flip left/right
      this.scale.x *= -1;
  }

  //Code ran on each frame of game
  update() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
      if (this.facing == 'right'){
        // Invert scale.x to flip left/right
        this.scale.x *= -1;
        this.facing = 'left';
      }
      this.body.velocity.x -= ACCELERATION
      this.body.velocity.x = Math.max(this.body.velocity.x, -MAX_VELOCITY)
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      if (this.facing == 'left'){
        // Invert scale.x to flip left/right
        this.scale.x *= -1;
        this.facing = 'right';
      }

      this.body.velocity.x += ACCELERATION
      this.body.velocity.x = Math.min(this.body.velocity.x, MAX_VELOCITY)
    }
    else
    {
        if (this.body.velocity.x > 0) {
          this.body.velocity.x -= ACCELERATION
        } else if (this.body.velocity.x < 0) {
          this.body.velocity.x += ACCELERATION
        }
    }

  }

}

export default Gordon;
