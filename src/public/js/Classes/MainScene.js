import {disableAllBalls,isGameOver,isWon,pasarDeLvl,
  crearTextos,crearCollitions,createBlocksArray} from '../functions.js'

import Ball from './Ball.js'
import Player from './Player.js'
import { level1, level2, level3 } from '../levels.js'
import PowerUp from './powerUp.js';

export default class MainScene extends Phaser.Scene {
    constructor(){
      super('MainScene');
      this.gameStarted = false
      this.currentLevel = 1
    }
    
    preload(){
        this.load.image('background', 'assets/images/background.jpg')
        Ball.preload(this)
        Player.preload(this)
        PowerUp.preload(this)
        this.load.image('brick1', 'assets/images/brick1_70_30.png')
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

      // crea los grupos de objetos
      this.allBlocks = this.physics.add.group({immovable: true})
      this.blocks = this.physics.add.group({immovable: true})
      this.indestructibleBlocks = this.physics.add.group({immovable: true})
      this.extraHitBlocks = this.physics.add.group({immovable: true})
      this.damagedBlocks = this.physics.add.group({immovable: true})

      this.powerUps = this.physics.add.group()
      this.balls = this.physics.add.group()

      //crea el player y ball principal
      this.player = new Player({scene:this, x:400, y:580})
      this.ball = new Ball({scene:this,x:400 ,y:560})
      this.balls.add(this.ball)
      
      
      // Crea los textos
      crearTextos(this)
      
      // Crear el primer nivel
      if(customLevel == 'custom'){
        this.customLevelText.setVisible(true)
        this.levelText.setVisible(false)
        let customLevel = JSON.parse(customLevelData)
        createBlocksArray(customLevel, this)
      }else{
        createBlocksArray(level1, this)
      }
      
    
      // Iiniciar con el mouse
      this.input.mouse.disableContextMenu();
      this.input.on('pointerdown', () => {
        if(!this.gameStarted){
          this.gameStarted = true;
          this.balls.getChildren().forEach( ball => { ball.setVelocityY(-300) })
          this.openingText.setVisible(false);
          this.levelText.setVisible(false)
          this.customLevelText.setVisible(false)
        }
      })
    
      // crea las colisiones
      crearCollitions(this)
    
    }
    
    update() {
    
      // PERDER
      if (isGameOver(this)) {
        this.gameOverText.setVisible(true);
        this.ball.disableBody(true, true);
    
      // GANAR o PASAR DE LVL
      } else if (isWon(this)) {
    
        if(customLevel == 'custom'){

          this.balls.getChildren().forEach( ball => { ball.disableBody(false,true)})
          
          this.playerWonText.setVisible(true);
          this.gameOverText.setVisible(false);
          
          this.isPause = true
          if (this.isPause == true) return
          

        }else{
          
          if(this.currentLevel == 3){

            disableAllBalls(this)
            
            this.isPause = true
            if (this.isPause == true) return
            
            this.playerWonText.setVisible(true);
            this.gameOverText.setVisible(false);
            
          }else if(this.currentLevel == 1){
            disableAllBalls(this)
            pasarDeLvl(level2,this)
            crearCollitions(this)
    
          }else if(this.currentLevel == 2){
            disableAllBalls(this)
            pasarDeLvl(level3,this)
            crearCollitions(this)
    
          }
        }
      }else{
          this.player.body.setVelocityX(0);
      }

      // chequea si las bolas salen del juego y las elimina
      this.balls.getChildren().forEach( ball => {
        if (ball.body.y > this.physics.world.bounds.height){
          ball.disableBody(true, true)
          this.balls.remove(ball)
        }
      })

      this.player.update()
      this.ball.update()
      
      this.powerUps.getChildren().forEach( powerUp => powerUp.update())
    }
      
  }