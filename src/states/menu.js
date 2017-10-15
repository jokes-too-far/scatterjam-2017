import Background from '../prefabs/background'
import TitleGraphic from '../prefabs/titleGraphic'
import TextBackground from '../prefabs/textBackground'

var music

class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    new Background(this.game)

    this.assetsToClear = []
    const textBG = new TextBackground(this.game, this.game.world.centerY)
    const text = new TitleGraphic(this.game, 'Beach Annihilation!')
    this.assetsToClear.push(text)
    this.assetsToClear.push(textBG)
    music = this.game.add.audio('title');
    music.play();
    this.input.onDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    for (const asset of this.assetsToClear) {
      asset.kill()
    }
    music.stop()
    this.game.state.start('game', false);
  }

}

export default Menu;
