const SPRITE_SIZE=128;
class Gordon extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    x = x - (SPRITE_SIZE / 2);
    super(game, x, y, 'gordon', frame);
    console.log("I AM GORDON HEAR ME ROAR")
    game.add.existing(this);
  }

  //Code ran on each frame of game
  update() {}

}

export default Gordon;
