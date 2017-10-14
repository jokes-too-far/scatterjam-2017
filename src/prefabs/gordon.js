const SPRITE_SIZE=128;
const DEFAULT_ACCELERATION=5;
var space;

class Gordon extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game, x, y, frame) {
    x = x - (SPRITE_SIZE / 2)
    y = y - (SPRITE_SIZE / 2)
    super(game, x, y, 'gordon', frame);
    console.log("I AM GORDON HEAR ME ROAR")
    game.add.existing(this);
    this.lastAcceleration = 0;
    this.acceleration = DEFAULT_ACCELERATION;
    this.setupDevMode();
  }

  //Code ran on each frame of game
  update() {
    this.moveLeft();
    if (this.x <= 0) {
      this.endGame()
    }
  }

  moveLeft() {
    //x == 0 is the left side of the screen
    if (this.x > 0) {
      this.x = this.x - this.acceleration;
      return;
    }
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
      this.game.state.start('gameover')
    })
    timer.start();
  }

  setupDevMode(){
    if (this.game.ba.dev_mode) {
      space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      space.onDown.add(function(){
        //Toggle the acceleration on space bar so we can acutally pause things.
        var newAcceleration = this.lastAcceleration
        this.lastAcceleration = this.acceleration
        this.acceleration = newAcceleration
      }, this)
    }
  }
}

export default Gordon;
