import style from '../fontStyle'

const padding = 10
const widthPerSand = 50

class SandMeter extends Phaser.Sprite {

  constructor(game) {
    super(game, padding, game.height - padding, 'meterFill')
    new Label(game, this)
    this.anchor.setTo(0, 1)
    game.add.existing(this)

    this.maxSand = 3
    this.sand = 2
    this.width = padding + (this.sand * widthPerSand)
    new Background(game, this)
    this.bringToTop()
    this.moveDown()
  }

  addSand() {
    if (this.sand < this.maxSand) {
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
    const targetWidth = padding + (this.sand * widthPerSand)
    this.width += (targetWidth - this.width) * 0.1
    if (this.sand === 0) {
      this.tint = 0xff0000
    } else if (this.sand === this.maxSand) {
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

class Background extends Phaser.Sprite {
  constructor(game, parent) {
    super(game, 0, game.height, 'meterFill')
    this.width = parent.maxSand * widthPerSand + padding * 3
    game.add.existing(this)
    this.tint = 0x000000
    this.anchor = parent.anchor
    this.height = parent.height + padding * 2
    console.log(this.x, this.y, this.height, this.width);
    new BatteryStickyOutyBit(game, this)
    for (var i = 1; i < parent.maxSand; i++) {
      new BatteryFillLine(game, this, padding * 2 + i * widthPerSand)
    }
  }
}

class BatteryStickyOutyBit extends Phaser.Sprite {
  constructor(game, parent) {
    super(game, parent.x + parent.width, parent.y - parent.height / 4, 'meterFill')
    game.add.existing(this)
    this.anchor = parent.anchor
    this.height = parent.height / 2
    this.width = 12
    this.tint = parent.tint
  }
}

class BatteryFillLine extends Phaser.Sprite {
  constructor(game, parent, x) {
    super(game, x, parent.y, 'meterFill')
    game.add.existing(this)
    this.anchor = parent.anchor
    this.height = parent.height
    this.width = 4
    this.bringToTop()
    this.tint = parent.tint
    this.tint = 0xff0000
  }
}

export default SandMeter;
