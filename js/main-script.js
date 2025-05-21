const announceDiv = document.querySelector('.announce');

function GameBoard() {
    const board =
        [
            '', '', '',
            '', '', '',
            '', '', ''
        ];

    let winningPlayer = null;

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
    const checkPattern = (cellCount) => {


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


        if (cellCount == 0 && winningPlayer == null) {
            winningPlayer = "Its a draw";
        }

        return false;
    }

    const getWinner = () => { return winningPlayer; }


    return {
        printBoard, markBoard, getAvailableCellOnBoard, checkPattern, updateBoard, getWinner
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

    const setPlayerName = (name1, name2) => {

        players[0].name = name1;
        players[1].name = name2;
    }

    const switchPlayers = () => {
        activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
    }

    const startGame = () => {

        setPlayerName();

        let x;

        const allBox = document.querySelectorAll('.ticbox');

        allBox.forEach((cell, key) => cell.addEventListener('click', () => {

            x = game.markBoard(key, getActivePlayer().marker);
            game.updateBoard();
            if (typeof x !== 'boolean') {
                switchPlayers();
            }
            const cellCount = game.getAvailableCellOnBoard();
            game.checkPattern(cellCount);
            const winner = game.getWinner();
            if (winner == null) {
                announceDiv.textContent = `${getActivePlayer().name}'s turn to move.`
            } else {
                announceDiv.textContent = winner;
            }

        }));
    }

    return {
        switchPlayers, getActivePlayer, startGame, setPlayerName
    }
}

function loadTheGame() {
    const modalOpenBtn = document.querySelector('#play-game-first');
    const modal = document.querySelector('[player-system-modal]');
    const closeBtnModal = document.querySelector('#close-modal');
    const startGameBtn = document.querySelector('#start-game');

    modalOpenBtn.onclick = () => { modal.showModal(); } // Open modal
    closeBtnModal.onclick = () => { modal.close(); } // Close modal
    const test = gameController();
    test.startGame();

    startGameBtn.addEventListener('click', () => {
        const player1Details = document.querySelector('#first_player');
        const player2Details = document.querySelector('#second_player');

        if (player1Details.value == '' || player2Details.value == '') {
            alert('Please supply all the fields marked with (*).');
        } else {
            modal.close();
            //modalOpenBtn.style.display = 'none';
            loadGameDisplay(player1Details.value, player2Details.value, modalOpenBtn, test);
        }

    });

}

function loadGameDisplay(p1Name, p2Name, modalBtn, test) {
    const gameContainer = document.querySelector('.game-container');
    const etcArea = document.querySelector('.etc-area');
    const p1 = document.querySelector('#player1-name');
    const p2 = document.querySelector('#player2-name');

    announceDiv.style.opacity = 1;
    console.log(test);
    modalBtn.style.display = 'none';
    gameContainer.style.pointerEvents = 'all';
    etcArea.style.opacity = 1;
    p1.textContent = p1Name;
    p2.textContent = p2Name;
    test.setPlayerName(p1Name, p2Name);
    announceDiv.textContent = `${test.getActivePlayer().name}'s turn to move.`;
}

window.onload = () => { loadTheGame(); }