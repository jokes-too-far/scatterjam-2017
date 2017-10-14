import Background from '../prefabs/background'
import HeaderText from '../prefabs/HeaderText'

class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    new Background(this.game)

    this.assetsToClear = []
    const text = new HeaderText(this.game, 'Beach Annihilation!')
    this.assetsToClear.push(text)

    this.input.onDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    for (const asset of this.assetsToClear) {
      asset.kill()
    }
    this.game.state.start('game', false);
  }

}

export default Menu;
