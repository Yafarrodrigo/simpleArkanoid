window.addEventListener("click", clickOnPage)

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

window.onload = () =>{

    let blocks = document.querySelectorAll('.brick')
    blocks.forEach(block => { block.remove()} )

    let firstLevel = document.querySelector('.level')
    firstLevel.classList.add('active')
    
    selectedLevel = []
    let activeElem = document.querySelector('.active')
    let data = activeElem.lastElementChild.textContent
    let filter1 = data.split(',')
    let filter2 = filter1.forEach(elem => {
        let newElem = elem.replace('[', '').replace(']', '')
        selectedLevel.push(newElem)})

    let inputElem = document.getElementById('levelToSend')
    inputElem.value = JSON.stringify(selectedLevel)
    showLevel(selectedLevel)

}

function clickOnPage(e){
    let checkClassLevel = e.target.classList.contains('level')
    if(checkClassLevel){
        document.querySelector('.active').classList.remove('active')
        e.target.classList.add('active')

        let blocks = document.querySelectorAll('.brick')
        blocks.forEach(block => { block.remove()} )
        
        selectedLevel = []
        let data = e.target.lastElementChild.textContent
        let filter1 = data.split(',')
        let filter2 = filter1.forEach(elem => {
            let newElem = elem.replace('[', '').replace(']', '')
            selectedLevel.push(newElem)
        })

        let inputElem = document.getElementById('levelToSend')
        inputElem.value = selectedLevel.toString()
        showLevel(selectedLevel)
    }

    let checkClassBack = e.target.classList.contains('back')
    if(checkClassBack){
        window.history.back()
    }

}

function showName(elem){
    elem.firstElementChild.style.zindex= 5000
}

function showLevel(level){
let brickContainer = document.getElementById('blocksGrid')

let columnas = 10;
let filas = 5;
let k = 0

for (let i = 0; i < columnas; i++) { 
    for (let j = 0; j < filas; j++) {
    
        let brickElement = document.createElement('div')
        brickElement.classList.add('brick')
        brickElement.id = k
        if      (level[k] == 11){
            brickElement.classList.add('blue')
        }else if(level[k] == 12){
            brickElement.classList.add('green')
        }else if(level[k] == 13){
            brickElement.classList.add('red')
        }else if(level[k] == 31){
            brickElement.classList.add('blueExtra')
        }else if(level[k] == 32){
            brickElement.classList.add('greenExtra')
        }else if(level[k] == 33){
            brickElement.classList.add('redExtra')
        }else if(level[k] == 2){
            brickElement.classList.add('indestructible')
        }
        brickContainer.append(brickElement)

        k++
    }
}
}