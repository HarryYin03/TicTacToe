const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');


const winCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
]

let currentPlayer = "X";
let option = ["" , "" , "" , "" , "" , "" , "" , "" , ""];
let win = false;
initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClick));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    win = true;
}

function cellClick(){
    const cellIndex = this.getAttribute('cellIndex');

    if(option[cellIndex] !== "" || !win){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    option[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winCombination.length; i++){
        const condition = winCombination[i];
        const a = option[condition[0]];
        const b = option[condition[1]];
        const c = option[condition[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }
        else if(a === b && b === c){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} is a real fan of McBaBa`;
        win = false;
    }
    else if(!option.includes("")){
        statusText.textContent = `You guys are fake fans of McBaBa`;
        win = false;
    }
    else{
        changePlayer();
    }
}



function restartGame(){
    currentPlayer = "X";
    option = ["", "", "", "", "", "", "", "", ""];
    win = true;
    statusText.textContent = `McBaBa's fan turn`;
    cells.forEach(cell => cell.textContent = "");
}