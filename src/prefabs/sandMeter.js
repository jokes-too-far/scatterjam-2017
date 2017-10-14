import style from '../fontStyle'

const padding = 10
const maxSand = 3

class SandMeter extends Phaser.Sprite {

  constructor(game) {
    super(game, padding, game.height - padding, 'meterFill')
    new Label(game, this)
    this.anchor.setTo(0, 1)
    game.add.existing(this)

    this.sand = 0
  }

  addSand() {
    if (this.sand < maxSand) {
      this.sand++
      return true
    }
    return false
  }
  removeSand() {
    if (this.sand > 0) {
      this.sand--
      return true
    }
    return false
  }

  update() {
    const targetWidth = padding + (this.sand * 50)
    this.width += (targetWidth - this.width) * 0.1
    if (this.sand === 0) {
      this.tint = 0xff0000
    } else if (this.sand === maxSand) {
      this.tint = 0x00ff00
    } else {
      this.tint = 0xffffff
    }
  }

}


class Label extends Phaser.Text {

  constructor(game, linkedBar) {
    super(game, linkedBar.x, linkedBar.y - linkedBar.height, 'Sand', style)
    this.fontSize = 32
    this.anchor = linkedBar.anchor
    game.add.existing(this)
  }

  update() {}

}

export default SandMeter;
