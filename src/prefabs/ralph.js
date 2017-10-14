const SPRITE_SIZE=128;
var space;

class Ralph extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game, x, y, frame) {
    x = x - (SPRITE_SIZE / 2)
    y = y - (SPRITE_SIZE / 2)
    super(game, x, y, 'ralph', frame);
    console.log("I AM RALPH, I AM MEAN")
    game.add.existing(this);
    this.lastvelocity = 0

    //calculate the velocity based on grid spaces so we don't have screen size issues.
    var grids = this.game.ba.level.gridSpaces
    var widthPerGrid = this.game.width / grids
    //Move 2 grid spaces per second to start? I dunno, collisions are going to screw with it.
    // but this seems like a good rate?
    this.velocity = (widthPerGrid / this.game.time.desiredFps) * 2;
    console.log("velocity: " + this.velocity)

    this.setupDevMode();
  }

  update() {
    this.moveLeft();
    if (this.x <= 0) {
      this.endGame()
    }
  }

  //Relentlessly move left until we get called home.
  moveLeft() {
    //TODO: figure out collision, and destrcution and delay mechanics.
    //x == 0 is the left side of the screen
    if (this.x > 0) {
      this.x = this.x - this.velocity;
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
      this.game.state.start('endLevel', false)
    })
    timer.start();
  }

  setupDevMode(){
    if (this.game.ba.dev_mode) {
      space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      space.onDown.add(function(){
        //Toggle the velocity on space bar so we can acutally pause things.
        var newvelocity = this.lastvelocity
        this.lastvelocity = this.velocity
        this.velocity = newvelocity
        console.log("velocity: " + this.velocity)
      }, this)
    }
  }
}

export default Ralph;
