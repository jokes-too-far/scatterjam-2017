const SPRITE_SIZE=128;
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Candy extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {

    super(game, x, y, 'candy', frame);

    console.log("I AM CANDY, YUM.  i live at", this.x,"." ,this.y)
    game.physics.enable(this, Phaser.Physics.ARCADE);

    game.add.existing(this);
    // Set Anchor to the center of your sprite
    this.anchor.setTo(.5);


  }

  //Code ran on each frame of game
  update() {

  }

}

export default Candy;
