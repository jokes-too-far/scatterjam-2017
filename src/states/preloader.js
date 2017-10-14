class Preloader extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    //setup loading bar
    const loadingBar = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(loadingBar);

    this.load.image('logo-stl', 'assets/logos/stl.png');
    this.load.spritesheet('logo-studio', 'assets/logos/studio.png', 128, 128);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  update() {}

  loadResources() {
    this.game.load.spritesheet('ralph', '../../assets/gordong.png', 128, 128, 1)
    //this.game.load.spritesheet('gordon', '../../assets/sprites/babygodzilla.png', 128, 128, 1)
  }

  onLoadComplete() {
    this.game.state.start('splashScreen');
  }
}

export default Preloader;
