import Background from '../prefabs/background'

class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    new Background(this.game)

    this.assetsToClear = []
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Beach Annihilation!', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);
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
