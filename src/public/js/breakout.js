class MainScene extends Phaser.Scene {
  constructor(){
    super('MainScene');
  }
  
  preload(){
      this.load.image('background', 'assets/images/background.jpg')
      this.load.image('ball', 'assets/images/ball_16_16.png')
      this.load.image('paddle', 'assets/images/paddle_128_20.png')
      this.load.image('brick1', 'assets/images/brick1_70_30.png')
      this.load.image('brick2', 'assets/images/brick2_70_30.png')
      this.load.image('brick3', 'assets/images/brick3_70_30.png')
      this.load.image('extraHitBlock1', 'assets/images/brick1_70_30_extra.png')
      this.load.image('extraHitBlock2', 'assets/images/brick2_70_30_extra.png')
      this.load.image('extraHitBlock3', 'assets/images/brick3_70_30_extra.png')
      this.load.image('brickDmg1', 'assets/images/brick1_70_30_dmg.png')
      this.load.image('brickDmg2', 'assets/images/brick2_70_30_dmg.png')
      this.load.image('brickDmg3', 'assets/images/brick3_70_30_dmg.png')
      this.load.image('indestructible', 'assets/images/indestructible.png')
    }  
    
    create() {
  
      //create background
      this.background = this.add.image(0, 0, 'background').setOrigin(0);
    
      //funciones en otro file
      this.crearNivel = createBlocksArray
      this.levelUp = pasarDeLvl
      this.texts = crearTextos
      this.collitions = crearCollitions
    
      // crea los grupos de objetos
      this.blocks = this.physics.add.group({immovable: true})
      this.indestructibleBlocks = this.physics.add.group({immovable: true})
      this.extraHitBlocks = this.physics.add.group({immovable: true})
      this.damagedBlocks = this.physics.add.group({immovable: true})
      this.balls = this.physics.add.group()
    
      //crea el player y ball principal
      this.player = new Player({scene:this, x:400, y:580})
      this.ball = new Ball({scene:this,x:400 ,y:560})
      this.balls.add(this.ball)
      
      
      // Crea los textos
      this.texts()
      
      // Crear el primer nivel
      if(customLevel == 'custom'){
        customLevelText.setVisible(true)
        levelText.setVisible(false)
        let customLevel = JSON.parse(customLevelData)
        this.crearNivel(customLevel, this)
      }else{
        this.crearNivel(level1, this)
      }
      
    
      // Iiniciar con el mouse
      this.input.mouse.disableContextMenu();
      this.input.on('pointerdown', () => {
        if(!gameStarted){
          gameStarted = true;
          this.ball.setVelocityY(-300);
          openingText.setVisible(false);
          levelText.setVisible(false)
          customLevelText.setVisible(false)
        }
      })
    
      // crea las colisiones
      this.collitions(this)
    
    }
    
    update() {
    
      // PERDER
      if (isGameOver(this.balls)) {
        gameOverText.setVisible(true);
        this.ball.disableBody(true, true);
    
      // GANAR o PASAR DE LVL
      } else if (isWon(this)) {
    
        if(customLevel == 'custom'){
          playerWonText.setVisible(true);
          disableAllBalls()
          this.balls.getChildren().forEach( ball=>{ball.angle = 0})
        }else{
          
          if(currentLevel == 4){
            playerWonText.setVisible(true);
            disableAllBalls(this)
            this.balls.getChildren().forEach( ball=>{ball.angle = 0})
    
          }else if(currentLevel == 1){
            disableAllBalls(this)
            this.levelUp(level2,this)
            this.collitions(this)
    
          }else if(currentLevel == 2){
            disableAllBalls(this)
            this.levelUp(level3,this)
            this.collitions(this)
    
          }else if(currentLevel == 3){
            currentLevel++
            disableAllBalls(this)
            this.collitions(this)
          }
        }
      }else{
          this.player.body.setVelocityX(0);
      }
    
        // controla y limita movimiento del mouse
        if (this.input.x >= 50 && this.input.x < 750){
    
        this.player.setX(this.input.x)
        
        }else if (this.input.x < 50){
          this.player.setX(64)
        }else{
          this.player.setX(736)
        }
    
      // mueve la bola si no empezo el game
      if (!gameStarted) {
        this.ball.setX(this.player.x);
      }
    
      // rotacion de las bolas
      this.balls.getChildren().forEach( ball=>{
        ball.angle -= 10
      })
    
      // chequea si las bolas salen del juego y las elimina
      checkIfBalls(this.physics.world, this)
    }
    
}

class Player extends Phaser.Physics.Arcade.Sprite{
  constructor(data){
    super(data.scene, data.x, data.y, 'paddle')
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setImmovable(true);
    data.scene.add.existing(this)
  }
}

class Ball extends Phaser.Physics.Arcade.Sprite{
  constructor(data){
    super(data.scene, data.x, data.y, 'ball')
    this.scene.physics.world.enable(this);
    this.body.setImmovable(true);
    data.scene.add.existing(this)
  }
}


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

var cursors
var gameStarted = false
var extraHitBricks = ['extraHitBlock1', 'extraHitBlock2', 'extraHitBlock3']
var damagedBricks = ['brickDmg1', 'brickDmg2', 'brickDmg3']
var currentLevel = 1
