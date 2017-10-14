const percentOfSky = 0.3
const tileSize = 64


class Background extends Phaser.Sprite {

  constructor(game) {
    super(game, 0, 0, 'gradient')
    this.width = game.width
    this.height = game.height * (percentOfSky + 0.1)
    this.tint = 0x00aaff
    game.add.existing(this)
    new Sand(game)
    new BackgroundHorizon(game)
  }

  update() {}

}

class BackgroundHorizon extends Phaser.TileSprite {

  constructor(game) {
    super(game, 0, game.height * percentOfSky, game.width, tileSize, 'tileable-horizon-sand')
    game.add.existing(this)
  }

  update() {}

}

class Sand extends Phaser.TileSprite {

  constructor(game) {
    super(game, 0, game.height * percentOfSky + tileSize, game.width, game.height, 'tileable-ground-sand')
    game.add.existing(this)
  }

  update() {}

}

export default Background
