function GameBoard() {
    const board =
        [
            '', '', '',
            '', '', '',
            '', '', ''
        ];

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

    const updateBoard = () => {
        console.clear();
        let gridCells = Array.from(document.querySelectorAll('.ticbox'));
        //let gridCells = document.querySelectorAll('.ticbox');
        console.log(gridCells);

        gridCells.forEach((cell, key) => {
            cell.textContent = board[key];
        })

        /* for (let i = 0; i < gridCells.length; i++) {
            gridCells.textContent = board[i];
            console.log(`This is the content of the board ${ board[i]}`, board.indexOf(board[i]));
        } */

    }


    const markBoard = (row, column, marker) => {
        if (row == 0) {
            switch (column) {
                case 0:
                    return (board[0] == '') ? board[0] = marker : false;
                case 1:
                    return (board[1] == '') ? board[1] = marker : false;
                case 2:
                    return (board[2] == '') ? board[2] = marker : false;
                default:
                    break;
            }
        }
        if (row == 1) {
            switch (column) {
                case 0:
                    return (board[3] == '') ? board[3] = marker : false;
                case 1:
                    return (board[4] == '') ? board[4] = marker : false;
                case 2:
                    return (board[5] == '') ? board[5] = marker : false;
                default:
                    break;
            }
        }
        if (row == 2) {
            switch (column) {
                case 0:
                    return (board[6] == '') ? board[6] = marker : false;
                case 1:
                    return (board[7] == '') ? board[7] = marker : false;
                case 2:
                    return (board[8] == '') ? board[8] = marker : false;
                default:
                    break;
            }
        }
    }
    //console.log('%c invalid move', 'color: red');

    const getAvailableCellOnBoard = () => {

        let cellAvail = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i] == '') {
                cellAvail += 1;
            }
        }

        return cellAvail;
    }

    const checkForWinner = () => {

        const topPattern = board[0] + board[1] + board[2];
        const middlePattern = board[3] + board[4] + board[5];
        const bottomPattern = board[6] + board[7] + board[8];
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

    const playGame = (row, column) => {

        const x = game.markBoard(row, column, getActivePlayer().marker);

        game.updateBoard();

        if (typeof x !== 'boolean') {
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
        console.log(`${getActivePlayer().name}'s turn to move.`);
    }

    return {
        switchPlayers, getActivePlayer, playGame, startGame
    }
}

const test = gameController();
test.startGame();