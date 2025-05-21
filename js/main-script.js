function GameBoard() {
    const board =
        [
            '', '', '',
            '', '', '',
            '', '', ''
        ];

    // This method will print the board on the screen
    const printBoard = () => {

        const container = document.querySelector('.game-container');
        for (const key in board) {
            //console.log(`this is a ${key}`);
            const gridCell = document.createElement('div');
            container.appendChild(gridCell);
            gridCell.setAttribute('class', 'ticbox');
            //gridCell.textContent = board[key];
        }

    };

    // This method will update the game board on screen upon user entry
    const updateBoard = () => {

        let gridCells = document.querySelectorAll('.ticbox');

        gridCells.forEach((cell, key) => {
            cell.textContent = board[key];
        })

    }

    // This method will mark the tic tac toe board for the user entry
    const markBoard = (key, marker) => {

        return board[key] == '' ? board[key] = marker : false;

    }

    // This method will get if there are still any available cell on the board for the user to play
    const getAvailableCellOnBoard = () => {

        let cellAvail = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i] == '') {
                cellAvail += 1;
            }
        }

        return cellAvail;
    }

    // This method will check everytime the user enter an entry to check for winning patterns
    const checkForWinner = () => {

        const topPattern = board[0] + board[1] + board[2];
        const middlePattern = board[3] + board[4] + board[5];
        const bottomPattern = board[6] + board[7] + board[8];
        const diagFirstPattern = board[0] + board[4] + board[8];
        const diagSecondPattern = board[6] + board[4] + board[2];
        const firstColumn = board[0] + board[3] + board[6];
        const secondColumn = board[1] + board[4] + board[7];
        const thirdColumn = board[2] + board[5] + board[8];

        if (topPattern == 'XXX' || middlePattern == 'XXX' || bottomPattern == 'XXX' || diagFirstPattern == 'XXX' || diagSecondPattern == 'XXX' || firstColumn == 'XXX' || secondColumn == 'XXX' || thirdColumn == 'XXX') {
            console.log('Player 1 wins');
            return true;
        }

        if (topPattern == 'OOO' || middlePattern == 'OOO' || bottomPattern == 'OOO' || diagFirstPattern == 'OOO' || diagSecondPattern == 'OOO' || firstColumn == 'OOO' || secondColumn == 'OOO' || thirdColumn == 'OOO') {
            console.log('Player 2 wins');
            return true;
        }

        return false;

    }

    return {
        printBoard, markBoard, getAvailableCellOnBoard, checkForWinner, updateBoard
    }
}


function gameController() {

    const game = GameBoard();

    game.printBoard();

    const players = [
        {
            'name': 'Player 1',
            'marker': 'X',
            'score': 0
        },
        {
            'name': 'Player 2',
            'marker': 'O',
            'score': 0
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayers = () => {
        activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
    }

    const startGame = () => {
        let x;

        const allBox = document.querySelectorAll('.ticbox');

        //console.log(`${getActivePlayer().name}'s turn to move.`);
        allBox.forEach((cell, key) => cell.addEventListener('click', () => {
            x = game.markBoard(key, getActivePlayer().marker);
            game.updateBoard();
            console.log(x);
            if (typeof x !== 'boolean') {
                switchPlayers();
            }
        }));
    }

    return {
        switchPlayers, getActivePlayer, startGame
    }
}

const test = gameController();
test.startGame();
