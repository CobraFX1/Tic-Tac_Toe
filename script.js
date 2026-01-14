const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];
    // Function to check for a win
    let checkWinner = (mark) => {
        for (const condition of winningConditions) {
            const [num1, num2, num3] = condition;
            if (board[num1] == mark && board[num2] == mark && board[num3] == mark) {
                return true;
            }
        }
    }
    let checkTie = () => {
        let spotsLeft = board.filter((item) => item == "");
        if (spotsLeft.length == 0) {

            return true;
        }
    }
    let resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }
    return {
        getBoard: () => board,
        placeMark: (position, mark) => {
            if (board[position] === '') {
                board[position] = mark;
                return true
            }
            else {
                return false;
            }
        },
        checkWinner,
        checkTie,
        resetBoard,
    };
})();
const Player = (name, mark) => {
    return { name, mark };
};
const GameController = (function () {
    let gameOver = false;
    const players = [
        Player("Stephen", "X"),
        Player("James", "O")
    ];
    let activePlayer = players[0];
    const switchPlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };
    return {
        playRound: (position) => {
            if (gameOver == true) {
                gameOver = false;
                activePlayer = players[0];  
                Gameboard.resetBoard();
            };
            if ((Gameboard.placeMark(position, activePlayer.mark)) === true) {
                console.log(Gameboard.getBoard())
                const win = (Gameboard.checkWinner(activePlayer.mark) == true);
                if (win || (Gameboard.checkTie() == true)) {
                    if (win) {
                        gameOver = true;
                        console.log(`${activePlayer.name} is the winner!`);
                        return;
                    } else {
                        gameOver = true;
                        console.log("This round is a draw");
                        return;
                    }
                } else {
                    switchPlayer();
                }
            } else {
                console.log("This position is already taken");
                return;
            }
            // console.log(Gameboard.getBoard())
        },
        getActivePlayer: () => activePlayer,
    };
})();