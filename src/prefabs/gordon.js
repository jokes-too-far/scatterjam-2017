const SPRITE_SIZE=128;
const MAX_VELOCITY = 250;
const ACCELERATION = 25;

var space;
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Gordon extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, y, frame) {
      y = y - (SPRITE_SIZE / 2)
      super(game, SPRITE_SIZE, y, 'gordon', frame);
      console.log("I AM GORDON, HEAR ME RAWR")
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.frame = 0;
      game.add.existing(this);
      // Set Anchor to the center of your sprite
      this.anchor.setTo(.5);

      this.animations.add('run', [0,1,2,3,4,5,6], 20, false);
      this.animations.add('build', [8,9,10,11,12,13,14,15,8,9,10,11,12,13,14,15], 30, false);
      this.walkingSound = this.game.add.audio('walking')
      this.digging = this.game.add.audio('digging')
      this.facing = 'right';
      // Invert scale.x to flip left/right
      this.scale.x *= -1;
  }

  //Code ran on each frame of game
  update() {
    this.bringToTop()
    if (this.animations.currentAnim.name =="build" && this.animations.currentAnim.isPlaying==true){
      //console.log('current anim: ', this.animations.currentAnim.name, ', isplaying = ', this.animations.currentAnim.isPlaying)
      return;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
      if(!this.walkingSound.isPlaying){
        this.walkingSound.play()
      }

      if (this.animations.currentAnim.name !="run" || this.animations.currentAnim.isPlaying==false){
        this.animations.play("run");
      }

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
      if(!this.walkingSound.isPlaying){
        this.walkingSound.play()
      }

      if (this.animations.currentAnim.name !="run" || this.animations.currentAnim.isPlaying==false){
        this.animations.play("run");
      }
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
    if (this.left < 0 || this.right > this.game.width) {
      this.body.velocity.x = 0
    }
  }

  startBuilding(){

    this.body.velocity.x = 0
    this.animations.play("build");
    if(!this.digging.isPlaying){
      this.digging.play()
    }
  }


}

export default Gordon;
