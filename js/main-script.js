function GameBoard() {
    const board =
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

    const printBoard = () => board;

    const markBoard = (row, column, marker) => {

        if (board[row][column] === '') {
            board[row][column] = marker;
        } else {
            console.log('invalid move');
        }
    }

    return {
        printBoard, markBoard
    }
}

function gameController() {

    const game = GameBoard();

    const players = [
        {
            'name': 'Aldin',
            'marker': 'X'
        },
        {
            'name': 'Zeke',
            'marker': 'O'
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayers = () => {
        activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
    }

    const playGame = (row, column) => {
        game.markBoard(row, column, getActivePlayer().marker);
        switchPlayers();
        startGame();
    }

    const startGame = () => {
        console.clear();
        console.table(game.printBoard());
        console.log(`${getActivePlayer().name}'s turn to move.`);
    }

    return {
        switchPlayers, getActivePlayer, playGame, startGame
    }
}

const test = gameController();