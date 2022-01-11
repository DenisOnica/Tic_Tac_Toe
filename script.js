const X_Class = 'x';
const Circle_Class = 'circle';
let circleTurn;

const cells = document.querySelectorAll('[data-cell]');
const restart = document.querySelector('#restart');
const winnigMessageElement = document.querySelector('.winning-message')
const winningMessageTextElement = document.querySelector('.data-winning-message-text')
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

restart.addEventListener('click', startGame)

startGame()

function startGame(){
    circleTurn = false;
    cells.forEach((cell) =>{
        cell.classList.remove(X_Class);
        cell.classList.remove(Circle_Class);
        cell.addEventListener('click', handleClick, {once: true})  
    })
    winnigMessageElement.classList.remove('show')
}


function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? Circle_Class : X_Class;
    placemark(cell, currentClass)
    if(checkForWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    
    else{
        switchTurns()
    }
}

function placemark(cell, currentClass){
    cell.classList.add(currentClass)
}

function switchTurns(){
    circleTurn = !circleTurn;
}

function isDraw(){
    return [...cells].every(cell =>{
        return cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
    })
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw'
    }
    else{
        winningMessageTextElement.innerText = `${circleTurn ? 'O' : 'X'} Wins`
    }
    winnigMessageElement.classList.add('show');
}


function checkForWin(currentClass){
    return winningCombinations.some((element) =>{
        return element.every(index =>{
            return cells[index].classList.contains(currentClass);
        })
    })
}