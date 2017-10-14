import HeaderText from '../prefabs/HeaderText'

class EndLevel extends Phaser.State {

  constructor() {
    super();
  }

  init(ralph) {
    this.ralph = ralph
  }

  create() {
    var winMessage = "Delicious Candy!"
    if (this.game.ba.win === false) {
      winMessage = "Nooo... my candy! q.q"
    }
    new HeaderText(this.game, winMessage)

    this.saveVarsToLocalStorage();

    var timer = this.game.time.create(false)
    timer.add(Phaser.Timer.SECOND * 3, () => {
      this.progressGame()
    })
    timer.start()
    this.input.onDown.add(() => {
      timer.stop()
      this.progressGame()
    }, this);
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){
    var currentLevel = this.game.ba.currentLevel + 1;
    var levels = this.game.cache.getJSON('levels');
    console.log(levels)
    var nextLevel = null;
    for(var level of levels){
      if (level && level.id === currentLevel){
        nextLevel = level;
      }
    }
    console.log(currentLevel)
    console.log(nextLevel)
    this.game.ba = {
      dev_mode: true,
      currentLevel:currentLevel,
      level: nextLevel
    }
  }

  update() {
    this.ralph.body.velocity.x += 50
  }

  progressGame () {
    var winning = this.game.ba.win
    this.resetGlobalVariables();
    if(winning && this.game.ba.level){
      this.game.state.start('game')
      return
    }
    this.game.state.start('gamefinal');
  }

}

export default EndLevel;
