import Background from '../prefabs/background'
import TitleGraphic from '../prefabs/titleGraphic'
import Sun from '../prefabs/Sun'

var music

class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    new Background(this.game)
    new Sun(this.game, this.game.width - 50, 50)

    this.assetsToClear = []
    const text = new TitleGraphic(this.game, 'Beach Annihilation!')
    this.assetsToClear.push(text)
    music = this.game.add.audio('title');
    music.play();
        this.input.onDown.add(this.startGame, this);
    var self = this;
    this.game.input.keyboard.onPressCallback = function(e){
      self.startGame();}
  }

  update() {}

  startGame () {
    this.game.input.keyboard.onPressCallback = null;
    for (const asset of this.assetsToClear) {
      asset.destroy()
    }
    music.stop()
    this.game.state.start('game', false);
  }

}

export default Menu;
