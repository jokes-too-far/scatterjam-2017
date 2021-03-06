const percentOfSky = 0.3
const tileSize = 64
const wetTint = 0xb4a050

class Background extends Phaser.Sprite {

  constructor(game) {
    super(game, 0, 0, 'gradient')
    this.width = game.width
    this.height = game.height * (percentOfSky + 0.1)
    this.tint = 0x00aaff
    game.add.existing(this)

    new Sand(game)
    new BackgroundHorizon(game)
    new Birb(game, )
    new OceanTile(game)
  }

  update() {}

}

class BackgroundHorizon extends Phaser.TileSprite {

  constructor(game) {
    super(game, 0, Math.ceil(game.height * percentOfSky), game.width, tileSize, 'tileable-horizon-sand')
    game.add.existing(this)
  }

  update() {}

}

class WetBackgroundHorizon extends Phaser.TileSprite {

  constructor(game) {
    super(game, game.width * .6, Math.ceil(game.height * percentOfSky), game.width, tileSize, 'tileable-horizon-sand')
    this.tint = wetTint;
    game.add.existing(this)
  }

  update() {}

}

class Sand extends Phaser.TileSprite {

  constructor(game) {
    super(game, 0, Math.ceil(game.height * percentOfSky) + tileSize, game.width, game.height, 'tileable-ground-sand')
    game.add.existing(this)
  }

  update() {}

}

class OceanTile extends Phaser.TileSprite {

  constructor(game) {
    var playerLane = (game.height / 3) + 64 * 2.5;
    super(game, 0, Math.ceil(playerLane), game.width, game.height, 'ocean-tile')
    game.add.existing(this)
  }

  update() {}

}

class WetSand extends Phaser.TileSprite {

  constructor(game,tileLocation, maxTiles) {
    super(game, game.width * 100 / maxTiles * tileLocation, Math.ceil(game.height * percentOfSky) + tileSize, 100 / maxTiles, game.height, 'tileable-ground-sand')
    this.tint = wetTint;
    game.add.existing(this)
  }

  update() {}

}

class Birb extends Phaser.Sprite {
  //initialization code in the constructor
  constructor(game) {
    var x = 200
    var y = 20
    super(game, x, y, 'birbs', 0);
    game.add.existing(this)
  }
  update() {}
}

export default Background
