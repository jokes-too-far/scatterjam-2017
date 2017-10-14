import HeaderText from '../prefabs/HeaderText'

class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var winMessage = "Delicious Candy!"
    if (this.game.ba.win === false) {
      winMessage = "Nooo... my candy! q.q"
    }
    new HeaderText(this.game, winMessage)

    this.saveVarsToLocalStorage();

    this.input.onDown.add(this.restartGame, this);
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){
    this.game.ba = {
      gridSpaces: 15,
      dev_mode: true
    }
  }

  update() {}

  restartGame () {
    this.resetGlobalVariables();
    this.game.state.start('menu');
  }

}

export default Menu;
