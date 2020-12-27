
import MainScene from './Classes/MainScene.js'

const config = {
  type: Phaser.AUTO,
  parent: 'container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  width: 800,
  height: 600,
  scene:[MainScene],
  physics: {
    default: 'arcade',
    debug: true,
    arcade: {
      gravity: false
    },
  }
}
const game = new Phaser.Game(config);
