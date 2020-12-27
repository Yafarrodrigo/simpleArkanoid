window.addEventListener("click", clickOnPage)
var currentColor = 'blue'
var formSaveLevel = document.querySelector('#formSaveLevel')
var levelData = document.querySelector('#levelData')
var blackscreen = document.querySelector('#blackscreen')

blackscreen.style.display = 'none'
formSaveLevel.style.display = 'none'

var levelX = [0, 0 ,0 ,0, 0,
              0 ,0 ,0, 0, 0, 
              0 ,0, 0, 0, 0,
              0 ,0 ,0, 0, 0,
              0 ,0, 0 ,0, 0,
              0, 0 ,0 ,0, 0,
              0 ,0 ,0 ,0, 0,
              0 ,0, 0, 0, 0,
              0 ,0 ,0 ,0, 0,
              0 ,0 ,0 ,0, 0]

levelData.value = JSON.stringify(levelX)

// block 11 -> normal Blue
// block 12 -> normal Green
// block 13 -> normal Red

// block 31 - > extra hit blue
// block 32 - > extra hit green
// block 33 - > extra hit red

// block 2 -> indestructible

window.onload = () =>{
  let brickContainer = document.getElementById('blocksGrid')
    
  let columnas = 10;
  let filas = 5;
  let k = 0

  for (let i = 0; i < columnas; i++) { 
    for (let j = 0; j < filas; j++) {
    
        let brickElement = document.createElement('div')
        brickElement.classList.add('brick')
        brickElement.id = k
        if      (levelX[k] == 11){
            brickElement.classList.add('blue')
        }else if(levelX[k] == 12){
            brickElement.classList.add('green')
        }else if(levelX[k] == 13){
            brickElement.classList.add('red')
        }else if(levelX[k] == 31){
            brickElement.classList.add('blueExtra')
        }else if(levelX[k] == 32){
            brickElement.classList.add('greenExtra')
        }else if(levelX[k] == 33){
            brickElement.classList.add('redExtra')
        }else if(levelX[k] == 2){
            brickElement.classList.add('indestructible')
        }
        brickContainer.append(brickElement)

        k++
    }
  }
}


function clickOnPage(e){
    let checkClassButton = e.target.classList.contains('buttonBrick')
    if(checkClassButton){
        let prevActiveButton = document.querySelector('.active')
        if(prevActiveButton){prevActiveButton.classList.remove('active')}

        if (e.target.classList.contains('clear-everything') == false &&
            e.target.classList.contains('open-form')        == false &&
            e.target.classList.contains('back') == false) {

                e.target.classList.add('active')
        }

        if      (e.target.classList.contains('blue')){
            currentColor = 'blue'
        }else if(e.target.classList.contains('red')){
            currentColor = 'red'
        }else if(e.target.classList.contains('green')){
            currentColor = 'green'
        }else if(e.target.classList.contains('blueExtra')){
            currentColor = 'blueExtra'
        }else if(e.target.classList.contains('redExtra')){
            currentColor = 'redExtra'
        }else if(e.target.classList.contains('greenExtra')){
            currentColor = 'greenExtra'
        }else if(e.target.classList.contains('indestructible')){
            currentColor = 'indestructible'
        }else if(e.target.classList.contains('clear')){
            currentColor = 'CLEAR'
        }
    }
    
    let checkClassBrick = e.target.classList.contains('brick')
    if(checkClassBrick){
        e.target.classList.remove('red',
                                'green',
                                'blue',
                                'redExtra',
                                'greenExtra',
                                'blueExtra',
                                'indestructible')

        if(currentColor != 'CLEAR' || currentColor != 'save'){
            e.target.classList.add(currentColor)
        }
        
    }

    let checkClassRESET = e.target.classList.contains('clear-everything')
    if(checkClassRESET){
        let allBlocks = Array.from(document.querySelectorAll('.brick'))
        allBlocks.forEach( block => {
            block.classList.remove( 'red',
                                    'green',
                                    'blue',
                                    'redExtra',
                                    'greenExtra',
                                    'blueExtra',
                                    'indestructible')
        })
    }

    let checkClassBack = e.target.classList.contains('back')
    if(checkClassBack){
        window.history.back()
    }

    let checkClassSave = e.target.classList.contains('save')
    if (checkClassSave){

        var newLevel = [0, 0 ,0 ,0, 0,
                        0 ,0 ,0, 0, 0, 
                        0 ,0, 0, 0, 0,
                        0 ,0 ,0, 0, 0,
                        0 ,0, 0 ,0, 0,
                        0, 0 ,0 ,0, 0,
                        0 ,0 ,0 ,0, 0,
                        0 ,0, 0, 0, 0,
                        0 ,0 ,0 ,0, 0,
                        0 ,0 ,0 ,0, 0]
                        
        let columnas = 10;
        let filas = 5;
        var k = 0


        for (let i = 0; i < columnas; i++) { 
            for (let j = 0; j < filas; j++) {

                let brick = document.getElementById(k)

                if      (brick.classList.contains('blue')){
                    newLevel[k] = 11
                }else if(brick.classList.contains('green')){
                    newLevel[k] = 12
                }else if(brick.classList.contains('red')){
                    newLevel[k] = 13
                }else if(brick.classList.contains('blueExtra')){
                    newLevel[k] = 31
                }else if(brick.classList.contains('greenExtra')){
                    newLevel[k] = 32
                }else if(brick.classList.contains('redExtra')){
                    newLevel[k] = 33
                }else if(brick.classList.contains('indestructible')){
                    newLevel[k] = 2
                }else{
                    newLevel[k] = 0

                }
                k++
            }
        }

        levelData.value = JSON.stringify(newLevel)
    }

    let checkClassCloseFormButton = e.target.classList.contains('cancel-form')
    if(checkClassCloseFormButton){
        blackscreen.style.display = 'none'
        formSaveLevel.style.display = 'none'
    }

    let checkClassOpenFormButton = e.target.classList.contains('open-form')
    if(checkClassOpenFormButton){
        blackscreen.style.display = 'block'
        formSaveLevel.style.display = 'block'
    }
    
}

formSaveLevel.addEventListener('submit', function passLevelToServer(event){
    event.preventDefault()
    
    let levelNameInput = document.getElementById('levelName').value
    let levelAuthorInput = document.getElementById('levelAuthor').value
    let levelDifficultyInput = document.getElementById('levelDifficulty').value
    
    if(levelNameInput != '' && levelAuthorInput != '' && levelDifficultyInput != 'none'){
        formSaveLevel.submit()
    }else{
        alert('fill all the fields and try again')
        formSaveLevel.reset()
    }
})