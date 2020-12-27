export default class Player extends Phaser.Physics.Arcade.Sprite{
  constructor(data){
    super(data.scene, data.x, data.y, 'paddle')
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setImmovable(true);
    data.scene.add.existing(this)
  }

  static preload(scene){
    scene.load.image('paddle', 'assets/images/paddle_128_20.png')
  }

  update(){
    // mueve la bola si no empezo el game
    if (!this.scene.gameStarted) {
      this.scene.balls.getChildren().forEach( ball => {
      ball.setX(this.x)
      })}

    // controla y limita movimiento del mouse
    if (this.scene.input.x >= 50 && this.scene.input.x < 750){
      this.setX(this.scene.input.x)
    } else if (this.scene.input.x < 50){
      this.setX(64)
    } else{
      this.setX(736)
    }

  }
}