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

    return {
        printBoard, markBoard, getAvailableCellOnBoard
    }
}


function gameController() {

    const game = GameBoard();

    const players = [
        {
            'name': 'Player 1',
            'marker': 'X'
        },
        {
            'name': 'Player 2',
            'marker': 'O'
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
        console.table(game.printBoard());
        console.log(`${getActivePlayer().name}'s turn to move.`);
        const cellCounter = game.getAvailableCellOnBoard();
        console.log(cellCounter);
        if (cellCounter == 0) {
            console.log('All cells are occupied, wanna restart the game?'); // this will trigger if all cells are occupied
        }
    }

    return {
        switchPlayers, getActivePlayer, playGame, startGame
    }
}

const test = gameController();
test.startGame();