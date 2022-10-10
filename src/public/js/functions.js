import { extraHitBricks, damagedBricks } from './blockArrays.js'
import Ball from './Classes/Ball.js'
import PowerUp from './Classes/powerUp.js'


export function disableAllBalls(data){

  data.balls.getChildren().forEach( ball => {
      ball.disableBody(true,true)
      data.balls.remove(ball)
  })

}

// si no hay mas bolas -> perdiste
export function isGameOver(data) {
    if (data.gameStarted){

      if(data.balls.getLength() == 0){
        return true
      }else{
        return false
      }
    }
}

// si no hay mas bloques -> ganaste
export function isWon(data) {
  if (data.allBlocks.getLength() === 0) {
        return true
      }else{
        return false
      } 
  
}

// creacion del array de nivel
export function createBlocksArray(level, data){

   let columnas = 10;
   let filas = 5;
   let k = 0
   let newBlock

  for ( let i = 0; i < columnas; i++) { 
    for ( let j = 0; j < filas; j++) {
       let blockX = i * 75 + 65;
       let blockY = j * 30 + 25;

      switch(level[k]){
        case 11:
          newBlock = data.physics.add.sprite( blockX, blockY, 'brick1' );
          data.blocks.add(newBlock)
          data.allBlocks.add(newBlock)
          break;

        case 12:
          newBlock = data.physics.add.sprite( blockX, blockY, 'brick2' );
          data.blocks.add(newBlock)
          data.allBlocks.add(newBlock)
          break;

        case 13:
          newBlock = data.physics.add.sprite( blockX, blockY, 'brick3' );
          data.blocks.add(newBlock)
          data.allBlocks.add(newBlock)
          break;

        case 31:
           newBlock = data.physics.add.sprite( blockX, blockY, 'extraHitBlock1' );
           data.extraHitBlocks.add(newBlock)
           data.allBlocks.add(newBlock)
          break;

        case 32:
          newBlock = data.physics.add.sprite( blockX, blockY, 'extraHitBlock2' );
          data.extraHitBlocks.add(newBlock)
          data.allBlocks.add(newBlock)
          break;

        case 33:
          newBlock = data.physics.add.sprite( blockX, blockY, 'extraHitBlock3' );
          data.extraHitBlocks.add(newBlock)
          data.allBlocks.add(newBlock)
          break;

        case 2:
          newBlock = data.physics.add.sprite( blockX, blockY, 'indestructible');
          data.indestructibleBlocks.add(newBlock)
          break;
      }    
      k++
    }
  }
}

// pasar de level
export function pasarDeLvl(level, data){ 
  borrarTodosLosBloques(data)

  data.powerUps.getChildren().forEach( powerUp => {
    powerUp.disableBody(true, true)
    data.powerUps.remove(powerUp)
  })

  data.openingText.setVisible(true);
  createBlocksArray(level, data)

  data.gameStarted = false
  let ball = new Ball({scene:data,x:400 ,y:560})
  data.balls.add(ball)
  crearCollitions(data)
  data.currentLevel++
  
  data.levelText.setText(`Level ${data.currentLevel}`)
  data.levelText.setVisible(true)

}
  
export function crearTextos(data){
    // Texto Inicial
    data.openingText = data.add.text(
      data.physics.world.bounds.width / 2,
      data.physics.world.bounds.height / 2,
      'Click to Start',
      {
        fontFamily: 'Monaco, Courier, monospace',
        fontSize: '50px',
        fill: '#fff'
      }
  ).setOrigin(0.5);
  data.openingText.setOrigin(0.5);

  // Texto Game Over
  data.gameOverText = data.add.text(
  data.physics.world.bounds.width / 2,
  data.physics.world.bounds.height / 2,
  'Game Over',
  {
    fontFamily: 'Monaco, Courier, monospace',
    fontSize: '50px',
    fill: '#fff'
  }
  );

  // Texto level
  data.levelText = data.add.text(
    (data.physics.world.bounds.width / 2) - 50,
    250,
    'Level 1',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '25px',
      fill: '#fff'
    }
    );

  // Texto custom level
  data.customLevelText = data.add.text(
    (data.physics.world.bounds.width / 2) - 75,
    250,
    'Custom level',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '25px',
      fill: '#fff'
    }
    );
    data.customLevelText.setVisible(false)
    data.gameOverText.setOrigin(0.5);
    data.gameOverText.setVisible(false);

  // Texto Ganar
  data.playerWonText = data.add.text(
  data.physics.world.bounds.width / 2,
  data.physics.world.bounds.height / 2,
  'You won!',
  {
    fontFamily: 'Monaco, Courier, monospace',
    fontSize: '50px',
    fill: '#fff'
  });
  data.playerWonText.setOrigin(0.5);
  // Invisible al inicio
  data.playerWonText.setVisible(false);
}
  
export function crearCollitions(data){

  data.balls.getChildren().forEach( ball => {
    data.physics.add.collider(ball, data.player, hitPlayer, null, this);
    data.physics.add.collider(ball, data.indestructibleBlocks, hitBrickIndestructible, null,this);
    data.physics.add.collider(ball, data.blocks, hitBrick, null,this);
    data.physics.add.collider(ball, data.extraHitBlocks, hitBrickExtraHit,null ,this);
    data.physics.add.collider(ball, data.damagedBlocks, hitBrick,null, this);
    ball.body.setCollideWorldBounds(true);
    ball.body.setBounce(1, 1);
  })
  data.physics.world.checkCollision.down = false;
  
}

function borrarTodosLosBloques(data){
  while(data.balls.getLength() != 0){
    data.balls.getChildren().forEach(ball=>{
      ball.destroy()
    })
  }
  while(data.indestructibleBlocks.getLength() != 0){
    data.indestructibleBlocks.getChildren().forEach(block=>{
      block.destroy()
    })
  }
  while(data.allBlocks.getLength() != 0){
    data.allBlocks.getChildren().forEach(block=>{
      block.destroy()
    })
  }
}

function hitBrick(ball, brick) {

  ballFirstHit(ball)

  brick.disableBody(true, true);
  brick.destroy()

  let randomNum = Math.random()*100
  // expand player powerUp
  if (randomNum <= 10){
    let newPowerUp = new PowerUp({scene:ball.scene, x:brick.x, y:brick.y})
    ball.scene.powerUps.add(newPowerUp)
    ball.scene.physics.add.collider(ball.scene.player, newPowerUp, getPowerUp,null, this);

   // extra ball powerUp
  }else if(randomNum > 10 && randomNum < 20){
    let newPowerUp = new PowerUp({scene:ball.scene, x:brick.x, y:brick.y})
    ball.scene.powerUps.add(newPowerUp)
    ball.scene.physics.add.collider(ball.scene.player, newPowerUp, getPowerUpExtraBall,null, this);
  }
}

function hitBrickIndestructible(ball){
  ballFirstHit(ball)
}

function hitBrickExtraHit(ball, brick){
  brick.disableBody(true, true);
  brick.destroy()

  ballFirstHit(ball)

  let prevBlockKey = extraHitBricks.indexOf(brick.texture.key)

  let newBlockKey = damagedBricks[prevBlockKey]
  let newBlock = ball.scene.physics.add.sprite( brick.x, brick.y, newBlockKey );
  ball.scene.damagedBlocks.add(newBlock)
  ball.scene.allBlocks.add(newBlock)

}
  
function hitPlayer(ball, player) {

  if (ball.x > player.x){
    let newVelocityX = Math.abs(ball.x - player.x) * 4
    if (newVelocityX > 300){ newVelocityX = 300 }
    ball.body.setVelocityX(newVelocityX) 
  }
  else if (ball.x < player.x){
    let newVelocityX = Math.abs(ball.x - player.x) * (-4)
    if (newVelocityX < (-300)){ newVelocityX = (-300) }
      ball.body.setVelocityX(newVelocityX)
  }
  else
  {
    ball.body.setVelocityX(0)
  }
}

function getPowerUp(player, powerUp){

  powerUp.disableBody(true, true)
  player.scene.powerUps.remove(powerUp)

  player.setTexture('bigPaddle')
  player.setSize()
  let duration = setTimeout(() => {
    player.setTexture('paddle'); player.setSize()
  }, 5000)

}

function getPowerUpExtraBall(player, powerUp){
  powerUp.disableBody(true, true)
  player.scene.powerUps.remove(powerUp)

  let ball = new Ball({scene:player.scene,x:player.x ,y:560})
  player.scene.balls.add(ball)
  ball.setVelocityY(-300)
  crearCollitions(player.scene)
}

function ballFirstHit(ball){

  if (ball.body.velocity.x === 0) {
    let randNum = Math.random();
    if (randNum >= 0.5) {
      ball.body.setVelocityX(Math.floor(Math.random()*200)+100);
    } else {
      ball.body.setVelocityX(-(Math.floor(Math.random()*200)+100));
    }
  }
}