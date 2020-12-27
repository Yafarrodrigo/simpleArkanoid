export default class PowerUp extends Phaser.Physics.Arcade.Sprite{
    constructor(data){
      super(data.scene, data.x, data.y, 'powerUp')
      this.scene.physics.world.enable(this);
      this.body.setImmovable(true);
      data.scene.add.existing(this)
    }
  
    static preload(scene){
      scene.load.image('powerUp', 'assets/images/powerUp_30x30.png')
    }
    
    update(){
        this.y = this.y +3
    }
  }