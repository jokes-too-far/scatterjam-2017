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
    this.game.load.spritesheet('ralph', '../../assets/rolph.png', 128, 128, 8)
    this.game.load.spritesheet('gordon', '../../assets/gordon.png', 128, 128, 18)
    this.game.load.spritesheet('sandcastleSmall', '../../assets/sandcastle-small.png', 128, 128, 4)
    this.game.load.spritesheet('candy','../../assets/candy.png', 128, 128, 1)
    this.game.load.spritesheet('lose-screen','../../assets/lose-screen.png', 512, 512, 4)

    this.game.load.image('ocean-tile', '../../assets/ocean-tile.png')
    this.game.load.image('wet-sand', '../../assets/wet-sand.png')
    this.game.load.image('tileable-ground-sand', '../../assets/tileable-ground-sand.png')
    this.game.load.image('tileable-horizon-sand', '../../assets/tileable-horizon-sand.png')
    this.game.load.image('gradient', '../../assets/gradient.png')
    this.game.load.image('sandParticle', '../../assets/sandParticle.png')
    this.game.load.image('meterFill', '../../assets/pixel.png')
    this.game.load.image('titleGraphic', '../../assets/title.png')
    this.game.load.image('textBackground', '../../assets/tileable-title-background.png')
    this.game.load.image('victory-screen','../../assets/victory-screen.png')
    this.game.load.image('birbs', '../../assets/birbs.png')
    this.game.load.image('sun','../../assets/sun.png')

    this.game.load.audio('title', ['assets/sounds/title.wav']);
    this.game.load.audio('digging', ['assets/sounds/digging.ogg'])
    this.game.load.audio('walking', ['assets/sounds/walking.ogg'])
    this.game.load.audio('destroy', ['assets/sounds/destroy.ogg'])
    this.game.load.audio('loser', ['assets/sounds/loser.ogg'])
    this.game.load.audio('level', ['assets/sounds/level.ogg'])
    this.game.load.audio('success', ['assets/sounds/success.ogg'])

  }

  onLoadComplete() {
    this.game.state.start('splashScreen');
  }
}

export default Preloader;
