import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gameover from './states/gameFinal';
import EndLevel from './states/levelEnd';
import SplashScreen from './states/splashScreen';


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'scatterjam-2017-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('gamefinal', new Gameover());
game.state.add('endLevel', new EndLevel());
game.state.add('splashScreen', new SplashScreen());

game.state.start('boot');
