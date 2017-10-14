class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var winMessage = "Delicious Candy!"
    if (this.game.ba.win === false) {
      winMessage = "Nooo... my candy! q.q"
    }
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, winMessage, {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.saveVarsToLocalStorage();

    this.input.onDown.add(this.restartGame, this);
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){
    this.game.ba = {
      dev_mode: true,
      currentLevel:1,
      level: this.game.cache.getJSON('levels')[0]
    }
  }

  update() {}

  restartGame () {
    this.resetGlobalVariables();
    this.game.state.start('menu');
  }

}

export default Menu;
