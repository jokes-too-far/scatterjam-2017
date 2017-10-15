import HeaderText from '../prefabs/HeaderText'

class GameOver extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    new HeaderText(this.game, "Thanks for playing!")

    this.saveVarsToLocalStorage();

    this.input.onDown.add(this.restartGame, this);

    var self = this;
    this.game.input.keyboard.onPressCallback = function(e){
      self.restartGame();}
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){
    var currentLevel = 1
    var nextLevel = this.game.cache.getJSON('levels')[0];
    this.game.ba = {
      dev_mode: true,
      currentLevel:1,
      win: true,
      level: nextLevel
    }
  }

  update() {}

  restartGame () {
    this.game.input.keyboard.onPressCallback = null;
    this.resetGlobalVariables();
    this.game.state.start('menu');
  }

}

export default GameOver;
