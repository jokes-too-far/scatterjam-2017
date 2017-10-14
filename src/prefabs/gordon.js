const SPRITE_SIZE=128;
var space;
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Gordon extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
      x = x - (SPRITE_SIZE / 2)
      y = y - (SPRITE_SIZE / 2)
      super(game, x, y, 'gordon', frame);
      console.log("I AM GORDON, HEAR ME RAWR")
      game.add.existing(this);
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5,.5);
      this.facing = 'right';
      // Invert scale.x to flip left/right
      this.scale.x *= -1;

      //calculate the velocity based on grid spaces so we don't have screen size issues.
      var grids = this.game.ba.level.gridSpaces
      var widthPerGrid = this.game.width / grids
      this.velocity = (widthPerGrid / this.game.time.desiredFps) * 2;
  }

  //move right when the keyboard is pressed
  moveRight() {
    //TODO: figure out collision, and destrcution and delay mechanics.
    //x == 0 is the left side of the screen

    if (this.facing == 'left'){
      // Invert scale.x to flip left/right
      this.scale.x *= -1;
      this.facing = 'right';
    }

    if (this.x < this.game.width) {
      let distance = Math.min(this.velocity * this.game.time.elapsed / 15, Math.abs(this.velocity));
      this.x = this.x + distance;
      return;
    }
  }

  //move left when the keyboard is pressed
  moveLeft() {
    //TODO: figure out collision, and destrcution and delay mechanics.
    //x == 0 is the left side of the screen

    if (this.facing == 'right'){
      // Invert scale.x to flip left/right
      this.scale.x *= -1;
      this.facing = 'left';
    }
    if (this.x >=0 ) {
      let distance = Math.min(this.velocity * this.game.time.elapsed / 15, Math.abs(this.velocity));
      this.x = this.x - distance;
      return;
    }
  }

  //Code ran on each frame of game
  update() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        this.moveLeft();
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {

      this.moveRight();
    }
    else
    {
        // do nothing
    }

  }

}

export default Gordon;
