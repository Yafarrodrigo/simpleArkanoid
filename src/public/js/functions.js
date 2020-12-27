function disableAllBalls(data){
  listOfBalls = Array.from(data.balls.getChildren())
  numberOfBalls = listOfBalls.length

  for( i = 0; i < numberOfBalls; i++){

    listOfBalls.forEach( ball => {
      ball.disableBody(true,true)
      data.balls.remove(ball)
    })
  }
}

function checkIfBalls(world, data){

  data.balls.getChildren().forEach( ball => {
    if (ball.body.y > world.bounds.height){
      ball.disableBody(true, true);
      data.balls.remove(ball)
    }
  })
}

// si no hay mas bolas -> perdiste
function isGameOver(balls) {
    if (gameStarted){

      if(balls.getLength() == 0){
        return true
      }else{
        return false
      }
    }
}

// si no hay mas bloques -> ganaste
function isWon(data) {
  if (data.blocks.getLength()          === 0 &&
      data.extraHitBlocks.getLength()  === 0 &&
      data.damagedBlocks.getLength()   === 0) {
        return true
      }else{
        return false
      }   
}


function hitBrick(ball, brick) {

  if (ball.body.velocity.x === 0) {
    randNum = Math.random();
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
    randNum = Math.random();
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
    randNum = Math.random();
    if (randNum >= 0.5) {
      ball.body.setVelocityX(150);
    } else {
      ball.body.setVelocityX(-150);
    }
  }

  prevBlockKey = extraHitBricks.indexOf(brick.texture.key)

  newBlockKey = damagedBricks[prevBlockKey]
  newBlock = this.physics.add.sprite( brick.x, brick.y, newBlockKey );
  this.damagedBlocks.add(newBlock)

}
  
function hitPlayer(ball, player) {

  this.physics.add.collider(ball, this.blocks, hitBrick, null, this);
  this.physics.add.collider(ball, this.indestructibleBlocks, hitBrickIndestructible, null, this);
  this.physics.add.collider(ball, this.extraHitBlocks, hitBrickExtraHit, null, this);
  this.physics.add.collider(ball, this.damagedBlocks, hitBrick, null, this);

  ball.setVelocityY(ball.body.velocity.y - 3);

  if (ball.x > player.x){
      ball.body.setVelocityX(Math.abs(ball.x - player.x)* 4) 
  }else if (ball.x < player.x){
      ball.body.setVelocityX(Math.abs(ball.x - player.x)*(-4))
  }else{
      ball.body.setVelocityX(0)
  }
}

// creacion del array de nivel
function createBlocksArray(level, data){

   let columnas = 10;
   let filas = 5;
   let k = 0
   let newBlock

  for ( i = 0; i < columnas; i++) { 
    for ( j = 0; j < filas; j++) {
       blockX = i * 75 + 65;
       blockY = j * 30 + 25;

      switch(level[k]){
        case 11:
          newBlock = this.physics.add.sprite( blockX, blockY, 'brick1' );
          data.blocks.add(newBlock)
          break;

        case 12:
          newBlock = this.physics.add.sprite( blockX, blockY, 'brick2' );
          data.blocks.add(newBlock)
          break;

        case 13:
          newBlock = this.physics.add.sprite( blockX, blockY, 'brick3' );
          data.blocks.add(newBlock)
          break;

        case 31:
           newBlock = this.physics.add.sprite( blockX, blockY, 'extraHitBlock1' );
           data.extraHitBlocks.add(newBlock)
          break;

        case 32:
          newBlock = this.physics.add.sprite( blockX, blockY, 'extraHitBlock2' );
          data.extraHitBlocks.add(newBlock)
          break;

        case 33:
          newBlock = this.physics.add.sprite( blockX, blockY, 'extraHitBlock3' );
          data.extraHitBlocks.add(newBlock)
          break;

        case 2:
          newBlock = this.physics.add.sprite( blockX, blockY, 'indestructible' );
          data.indestructibleBlocks.add(newBlock)
          break;
      }    
      k++
    }
  }
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
  
// pasar de level
function pasarDeLvl(level, data){ 
  borrarTodosLosBloques(data)

  openingText.setVisible(true);
  this.crearNivel(level, data)

  gameStarted = false
  data.ball = new Ball({scene:this,x:400 ,y:560})
  data.balls.add(data.ball)
  this.physics.add.collider(data.ball, data.blocks, hitBrick, null, this);
  this.physics.add.collider(data.ball, data.player, hitPlayer, null, this);
  this.physics.add.collider(data.ball, data.indestructibleBlocks, hitBrickIndestructible, null, this);
  this.physics.add.collider(data.ball, data.extraHitBlocks, hitBrickExtraHit, null, this);
  this.physics.add.collider(data.ball, data.damagedBlocks, hitBrick, null, this);
  currentLevel++

  levelText.setText(`Level ${currentLevel}`)
  levelText.setVisible(true)
}
  
function crearTextos(){
    // Texto Inicial
    openingText = this.add.text(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      'Click to Start',
      {
        fontFamily: 'Monaco, Courier, monospace',
        fontSize: '50px',
        fill: '#fff'
      }
  );
  openingText.setOrigin(0.5);

  // Texto Game Over
  gameOverText = this.add.text(
  this.physics.world.bounds.width / 2,
  this.physics.world.bounds.height / 2,
  'Game Over',
  {
    fontFamily: 'Monaco, Courier, monospace',
    fontSize: '50px',
    fill: '#fff'
  }
  );

  // Texto level
  levelText = this.add.text(
    (this.physics.world.bounds.width / 2) - 50,
    250,
    'Level 1',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '25px',
      fill: '#fff'
    }
    );

  // Texto custom level
    customLevelText = this.add.text(
    (this.physics.world.bounds.width / 2) - 75,
    250,
    'Custom level',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '25px',
      fill: '#fff'
    }
    );
  customLevelText.setVisible(false)
  gameOverText.setOrigin(0.5);
  gameOverText.setVisible(false);

  // Texto Ganar
  playerWonText = this.add.text(
  this.physics.world.bounds.width / 2,
  this.physics.world.bounds.height / 2,
  'You won!',
  {
    fontFamily: 'Monaco, Courier, monospace',
    fontSize: '50px',
    fill: '#fff'
  });
  playerWonText.setOrigin(0.5);
  // Invisible al inicio
  playerWonText.setVisible(false);
}
  
function crearCollitions(data){

  data.balls.getChildren().forEach( ball => {
    data.physics.add.collider(ball, data.player, hitPlayer, null, data);
    data.physics.add.collider(ball, data.indestructibleBlocks, hitBrickIndestructible, null, data);
    data.physics.add.collider(ball, data.blocks, hitBrick, null, data);
    data.physics.add.collider(ball, data.extraHitBlocks, hitBrickExtraHit, null, data);
    data.physics.add.collider(ball, data.damagedBlocks, hitBrick, null, data);
    ball.body.setCollideWorldBounds(true);
    ball.body.setBounce(1, 1);
  })

  
  
  this.physics.world.checkCollision.down = false;
  
}