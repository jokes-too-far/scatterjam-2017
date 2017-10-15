import HeaderText from '../prefabs/HeaderText'

class EndLevel extends Phaser.State {

  constructor() {
    super();
  }

  init(ralph, assetsToRemove) {
    this.ralph = ralph
    this.assetsToKill = assetsToRemove
  }

  create() {
    var winMessage = "My candy is safe!"
    this.successSound = this.game.add.audio('success')
    if (this.game.ba.win === false) {
      winMessage = "Nooo... my candy! q.q"
    } else {
      this.game.ba.win = true; //because nobody's setting this
      this.successSound.play()
    }
    this.message = new HeaderText(this.game, winMessage)

    this.saveVarsToLocalStorage();

    // FACE THE OTHER WAY YOU CRAZY RALPH YOU
    this.ralph.scale.x *= -1;
    this.ralph.animations.currentAnim.frameRate = 30;
    this.ralph.animations.currentAnim.restart();

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
    var nextLevel = null;
    for(var level of levels){
      if (level && level.id === currentLevel){
        nextLevel = level;
      }
    }
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
    this.clearAssets()
    var winning = this.game.ba.win
    var lastLevel = this.game.ba.level.lastLevel
    this.resetGlobalVariables();
    if(winning && lastLevel===false){
      this.game.state.start('game', false)
      return
    }
    this.game.state.start('gamefinal');
  }

  clearAssets() {
    for (var asset of this.assetsToKill) {
      asset.destroy()
    }
    this.message.destroy()
  }

}

export default EndLevel;
