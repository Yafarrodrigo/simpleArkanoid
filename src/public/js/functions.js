import { extraHitBricks, damagedBricks } from './blockArrays.js'
import Ball from './Classes/Ball.js'


export function disableAllBalls(data){
  let listOfBalls = Array.from(data.balls.getChildren())
  let numberOfBalls = listOfBalls.length

  for( let i = 0; i < numberOfBalls; i++){

    listOfBalls.forEach( ball => {
      ball.disableBody(true,true)
      data.balls.remove(ball)
    })
  }
}

// si no hay mas bolas -> perdiste
export function isGameOver(balls, data) {
    if (data.gameStarted){

      if(balls.getLength() == 0){
        return true
      }else{
        return false
      }
    }
}

// si no hay mas bloques -> ganaste
export function isWon(data) {
  if (data.blocks.getLength()          === 0 &&
      data.extraHitBlocks.getLength()  === 0 &&
      data.damagedBlocks.getLength()   === 0) {
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
          break;

        case 12:
          newBlock = data.physics.add.sprite( blockX, blockY, 'brick2' );
          data.blocks.add(newBlock)
          break;

        case 13:
          newBlock = data.physics.add.sprite( blockX, blockY, 'brick3' );
          data.blocks.add(newBlock)
          break;

        case 31:
           newBlock = data.physics.add.sprite( blockX, blockY, 'extraHitBlock1' );
           data.extraHitBlocks.add(newBlock)
          break;

        case 32:
          newBlock = data.physics.add.sprite( blockX, blockY, 'extraHitBlock2' );
          data.extraHitBlocks.add(newBlock)
          break;

        case 33:
          newBlock = data.physics.add.sprite( blockX, blockY, 'extraHitBlock3' );
          data.extraHitBlocks.add(newBlock)
          break;

        case 2:
          newBlock = data.physics.add.sprite( blockX, blockY, 'indestructible' );
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
  );
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
  while(data.extraHitBlocks.getLength() != 0){
    data.indestructibleBlocks.getChildren().forEach(block=>{
      block.destroy()
    })
  }
  while(data.damagedBlocks.getLength() != 0){
    data.indestructibleBlocks.getChildren().forEach(block=>{
      block.destroy()
    })
  }
}

function hitBrick(ball, brick) {

  if (ball.body.velocity.x === 0) {
    let randNum = Math.random();
    if (randNum >= 0.5) {
      ball.body.setVelocityX(150);
    } else {
      ball.body.setVelocityX(-150);
    }
  }
  
  // if (blocks.getLength()        != 0 ||
  //   extraHitBlocks.getLength()  != 0 ||
  //   damagedBlocks.getLength()   != 0   ){
          
  //    newBall = this.physics.add.sprite(
  //   ball.x,
  //   ball.y,
  //   'ball'
  //   );
  //   balls.add(newBall)

  //    randomYVelocityValue = 300 + Phaser.Math.Between((-50), (-100))
  //   newBall.setVelocityY(randomYVelocityValue)

  //   this.physics.add.collider(newBall, player, hitPlayer, null, this);
    
  //   newBall.setCollideWorldBounds(true);
  //   newBall.setBounce(1, 1); 
  // }
  
  brick.disableBody(true, true);
  brick.destroy()
}

function hitBrickIndestructible(ball){
  if (ball.body.velocity.x === 0) {
    let randNum = Math.random();
    if (randNum >= 0.5) {
      ball.body.setVelocityX(150);
    } else {
      ball.body.setVelocityX(-150);
    }
  }
}

function hitBrickExtraHit(ball, brick){
  brick.disableBody(true, true);
  brick.destroy()

  if (ball.body.velocity.x === 0) {
    let randNum = Math.random();
    if (randNum >= 0.5) {
      ball.body.setVelocityX(150);
    } else {
      ball.body.setVelocityX(-150);
    }
  }

  let prevBlockKey = extraHitBricks.indexOf(brick.texture.key)

  let newBlockKey = damagedBricks[prevBlockKey]
  let newBlock = ball.scene.physics.add.sprite( brick.x, brick.y, newBlockKey );
  ball.scene.damagedBlocks.add(newBlock)

}
  
function hitPlayer(ball, player) {

  ball.setVelocityY(ball.body.velocity.y - 3);

  if (ball.x > player.x){
      ball.body.setVelocityX(Math.abs(ball.x - player.x)* 4) 
  }else if (ball.x < player.x){
      ball.body.setVelocityX(Math.abs(ball.x - player.x)*(-4))
  }else{
      ball.body.setVelocityX(0)
  }
}
