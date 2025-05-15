function GameBoard() {
    const board =
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

    const printBoard = () => {


    };

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

        const topPattern = board[0].join('');
        const middlePattern = board[1].join('');
        const bottomPattern = board[2].join('');
        const diagFirstPattern = board[0][0] + board[1][1] + board[2][2];
        const diagSecondPattern = board[2][0] + board[1][1] + board[0][2];
        const firstColumn = board[0][0] + board[1][0] + board[2][0];
        const secondColumn = board[0][1] + board[1][1] + board[2][1];
        const thirdColumn = board[0][2] + board[1][2] + board[2][2];

        console.log(`top pattern : ${topPattern}`);
        console.log(`middle pattern : ${middlePattern}`);
        console.log(`bottom pattern : ${bottomPattern}`);
        console.log(`right to left pattern : ${diagFirstPattern}`);
        console.log(`left to right pattern : ${diagSecondPattern}`);
        console.log(`first column pattern : ${firstColumn}`);
        console.log(`second column pattern : ${secondColumn}`);
        console.log(`third column pattern : ${thirdColumn}`);
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

        const cellCounter = game.getAvailableCellOnBoard();

        if (cellCounter > 0) {
            // check for winner
            const isThereAWinner = game.checkForWinner();
            if (isThereAWinner == false) {
                startGame();
            } else {
                // restart the game and put the score
            }
        } else {
            console.log('The match was a draw!, wanna restart the game?');
        }


    }

    const startGame = () => {

        console.table(game.printBoard());
        console.log(`${getActivePlayer().name}'s turn to move.`);
    }

    return {
        switchPlayers, getActivePlayer, playGame, startGame
    }
}

const test = gameController();
test.startGame();