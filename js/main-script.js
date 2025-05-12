function gameBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    // First lets draw and map the board
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(0);
        }
    }

    // This is the method to return the board
    const getBoard = () => board;

    const markBoard = (row, column, playerMarker) => {
        if (board[row][column] == 0) {
            board[row][column] = playerMarker;
        } else {
            console.log('Invalid move');
        }
    }

    return { getBoard, markBoard };
}

function gameController() {
    const player1 = 'PlayerOne';
    const player2 = 'PlayerTwo';

    const board = gameBoard();

    const players = [
        {
            name: player1,
            marker: 'x'
        },
        {
            name: player2,
            marker: 'o'
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        console.log(board.getBoard());
        console.log("Marking the token of the player on the board");
        board.markBoard(row, column, getActivePlayer().marker);
        console.log(board.getBoard());
    }

    return { switchPlayer, getActivePlayer, playRound };

}

const test = gameController();