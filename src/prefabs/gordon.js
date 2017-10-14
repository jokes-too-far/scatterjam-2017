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
  }

  //Code ran on each frame of game
  update() {

  }

}

export default Gordon;
