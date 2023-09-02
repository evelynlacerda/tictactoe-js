const spaceElements = document.querySelectorAll('[data-space]');
const board = document.querySelector('[data-board]');
const winnMessageTextElement = document.querySelector('[data-winn-text]');
const winnMessage = document.querySelector('[data-winn]');
const restartButton = document.querySelector('[data-restart-button]');

// check if it's the turn of the player
let isOTurn;

// all the winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// start game
const startGame = () => {
    isOTurn = false;

    // add click event to each space
    for (const space of spaceElements) {
        space.classList.remove('x');
        space.classList.remove('o');
        // remove the event listener before adding it again
        space.removeEventListener('click', handleClick);
        // add the event listener to each space and remove it after the first click
        space.addEventListener('click', handleClick, { once: true });
    };

    setBoardHoverClass();
    // hide the message of the winner
    winnMessage.classList.remove('winnactive');
};

// check if the game is a draw or if someone won
const endGame = (isDraw) => {
    if (isDraw) {
        winnMessageTextElement.innerText = "Draw!"
    } else {
        winnMessageTextElement.innerText = isOTurn
            ? "O's Won!"
            : "X's Won!"
    };
    // show the message of the winner
    winnMessage.classList.add('winnactive');
};

// check if the player won
const checkForWinner = (currentPlayer) => {
    // check if any of the winning combinations are true
    return winningCombinations.some(combination => {
        // check if the space has the class of the current player
        return combination.every((index) => {
            return spaceElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...spaceElements].every((space) => {
        return space.classList.contains('x') || space.classList.contains('o');
    })
}

// add the symbol of the player to the space
const spaceMark = (space, classToAdd) => {
    space.classList.add(classToAdd);
};

// add class of the player to the board
const setBoardHoverClass = () => {
    board.classList.remove('o');
    board.classList.remove('x');

    if (isOTurn) {
        board.classList.add('o');
    } else {
        board.classList.add('x');
    };
};

// swap the turn of the player
const swapTurns = () => {
    isOTurn = !isOTurn;

    // reset the board symbol
    setBoardHoverClass();
};

const handleClick = (e) => {
    // put the symbol on the board
    const space = e.target;
    const classToAdd = isOTurn
        ? 'o'
        : 'x';

    spaceMark(space, classToAdd);

    // check if the player won
    const isWinn = checkForWinner(classToAdd);
    const isDraw = checkForDraw();

    if (isWinn) {
        endGame(false);
    } else if (isDraw) {
        // check if the game is a draw
        endGame(true);
    } else {
        // swap the turn of the player
        swapTurns();
    }
};

// start the game
startGame();

// add click event to restart the game
restartButton.addEventListener('click', startGame);