export default class Ball extends Phaser.Physics.Arcade.Sprite{
  constructor(data){
    super(data.scene, data.x, data.y, 'ball')
    this.scene.physics.world.enable(this);
    this.body.setImmovable(true);
    data.scene.add.existing(this)
  }

  static preload(scene){
    scene.load.image('ball', 'assets/images/ball_16_16.png')
  }

  update(){

    // chequea si las bolas salen del juego y las elimina
    if (this.body.y > this.scene.physics.world.bounds.height){
      this.disableBody(true, true);
      this.scene.balls.remove(this)
    }

    // rotacion de las bolas
    this.angle -= 10

  }
}