function GameBoard() {
    const board =
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

    const printBoard = () => board;

    const markBoard = (row, column, marker) => {

        console.clear();
        if (board[row][column] === '') {
            board[row][column] = marker;
        } else {
            console.log('%c invalid move', 'color: red');
            return false;
        }
    }

    const getAvailableCellOnBoard = () => {

        let cellAvail = 0;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    cellAvail += 1;
                }
            }
        }

        return cellAvail;
    }

    const checkForWinner = () => {

        let arrSum = '';

        for (let a = 0; a < 3; a++) {
            for (let index = 0; index < 3; index++) {
                arrSum += board[a][index];
            }

            if (arrSum === 'XXX') {
                console.log('Player 1 wins');
            }
            if (arrSum === 'OOO') {
                console.log('Player 2 wins');
            }
            console.log(board[a]);
        }
    }

    return {
        printBoard, markBoard, getAvailableCellOnBoard, checkForWinner
    }
}


function gameController() {

    const game = GameBoard();

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

    const playGame = (row, column) => {
        const x = game.markBoard(row, column, getActivePlayer().marker);
        if (x !== false) {
            switchPlayers();
        }

        startGame();
    }

    const startGame = () => {

        const cellCounter = game.getAvailableCellOnBoard();
        console.log(`Total remaining cells in the board ${cellCounter}`);
        if (cellCounter == 0) {
            console.log('All cells are occupied, wanna restart the game?'); // this will trigger if all cells are occupied
        }

        if (cellCounter > 0) {
            // check for winner
            game.checkForWinner();
        }

        console.table(game.printBoard());
        console.log(`${getActivePlayer().name}'s turn to move.`);
    }

    return {
        switchPlayers, getActivePlayer, playGame, startGame
    }
}

const test = gameController();
test.startGame();