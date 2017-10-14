class SandEmitter extends Phaser.Particles.Arcade.Emitter {

  constructor(game, y) {
    console.log('going to y', y);
    super(game, 0, y, 20)
    this.makeParticles('sandParticle')
    this.setAlpha(0.1, 0.5);
  }

  update() {}

}

export default SandEmitter
