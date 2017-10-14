const SPRITE_SIZE=128;
const MAX_VELOCITY = -200
var space;

class Ralph extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game, x, y, frame) {
    x = x - (SPRITE_SIZE / 2)
    y = y - (SPRITE_SIZE / 2)
    super(game, x, y, 'ralph', frame);
    console.log("I AM RALPH, I AM MEAN")
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.x = 0
    game.add.existing(this);
  }

  update() {
    if (this.body.velocity.x > MAX_VELOCITY) {
      this.body.velocity.x  -= 2
    }

    if (this.x <= 0) {
      this.endGame()
    }

    // Uncomment this to see the physics collision box
    // this.game.debug.body(this);
  }

  endGame() {
    if(this.game.ba.win === false){
      return;
    }
    this.game.ba.win = false;
    this.game.ba.timer.stop();
    //play animation of bro eating candy
    const timer = this.game.time.create(false)
    timer.add(Phaser.Timer.SECOND * 1.5, () => {
      this.game.state.start('endLevel', false)
    })
    timer.start();
  }

}

export default Ralph;
