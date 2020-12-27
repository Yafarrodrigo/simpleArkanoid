export default class Player extends Phaser.Physics.Arcade.Sprite{
  constructor(data){
    super(data.scene, data.x, data.y, 'paddle')
    this.scene.physics.world.enable(this);
    // this.body.setCollideWorldBounds(true);
    this.body.setImmovable(true);
    data.scene.add.existing(this)
  }

  static preload(scene){
    scene.load.image('paddle', 'assets/images/paddle_128_20.png')
    scene.load.image('bigPaddle', 'assets/images/paddle_256_20.png')
  }

  update(){
    // mueve la bola si no empezo el game
    if (!this.scene.gameStarted) {
      this.scene.balls.getChildren().forEach( ball => {
      ball.setX(this.x)
      })}

      if(this.scene.input.x < this.width/2){
        this.setX( 0 + this.width/2)
      }else if(this.scene.input.x > this.scene.physics.world.bounds.width - this.width/2){
        this.setX( this.scene.physics.world.bounds.width - this.width/2)
      }else{
        this.setX(this.scene.input.x)
      }
  }
}