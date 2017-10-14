import Background from '../prefabs/background'
import HeaderText from '../prefabs/HeaderText'

var music

class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    new Background(this.game)

    this.assetsToClear = []
    const text = new HeaderText(this.game, 'Beach Annihilation!')
    this.assetsToClear.push(text)
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
