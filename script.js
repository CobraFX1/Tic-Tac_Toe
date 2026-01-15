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
        GameController.reset();
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
    let players = [];
    let activePlayer;
    const initPlayers = (name1, name2) => {
        players = [
            Player(name1 || "Player1", "X"),
            Player(name2 || "Player2", "O")
        ];
        activePlayer = players[0];
    };
    const switchPlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };
    const reset = () => {
        activePlayer = players[0];
    };

    return {
        playRound: (position) => {
            if (gameOver == true) {
                gameOver = false;
                reset();
                Gameboard.resetBoard();
            };
            if ((Gameboard.placeMark(position, activePlayer.mark)) === true) {
                const win = (Gameboard.checkWinner(activePlayer.mark) == true);
                if (win || (Gameboard.checkTie() == true)) {
                    if (win) {
                        gameOver = true;
                        displayController.result(`${activePlayer.name}`);
                        return;
                    } else {
                        gameOver = true;
                        displayController.result("");
                        return;
                    }
                } else {
                    switchPlayer();
                }
            } else {
                console.log("This position is already taken");
                return;
            }
        },
        getActivePlayer: () => activePlayer,
        reset,
        initPlayers,
    };
})();

/**
 * Display Controller Module 🎮
Cache DOM Elements 🏠
Find the container element that holds the 3x3 grid.
Find all individual cells (the 9 boxes) and store them in a list
Find the reset button and the turn indicator text.
Bind Event Listeners 👂
Add a click listener to the container (using event delegation).
On Click: * Check if the clicked target is a cell.
If it is, extract the index from the cell's data-index attribute.
Call GameController.playRound(index) to process the move.
Call the Render function to update the screen.
Add a click listener to the reset button to call the game's reset logic and then Render.
The Render Function 🎨
Get the Board: Fetch the current array of marks from the Gameboard.
Update Cells: Use a forEach loop to look at every visual cell:
Match the cell's index to the board array's index.
Set the cell's text content to the value in the array ("X", "O", or "").
Update Status: Change the turn indicator text to reflect the current active player.
 */
const displayController = (function () {
    const container = document.querySelector(".container");
    const cellsList = document.querySelectorAll(".cell");
    const resetBtn = document.querySelector("button");
    const turnIndicator = document.querySelector(".turn");
    const closeBtn = document.createElement("button");
    const dialog = document.querySelector("#winDialog");
    const input1 = document.querySelector("#p1");
    const input2 = document.querySelector("#p2");
    const startBtn = document.querySelector('#start');
    const setupCont = document.querySelector(".setup-container");
    const btnCont = document.querySelector(".buttonCnt");
    const playAgain = document.createElement("button");


    const bindEvents = () => {
        container.addEventListener('click', (event) => {
            const clickedCell = event.target.closest('.cell');
            if (!clickedCell || clickedCell.textContent !== "") return;
            const index = clickedCell.dataset.index;
            GameController.playRound(index);
            render();
        });
        resetBtn.addEventListener('click', () => {
            Gameboard.resetBoard();
            turnIndicator.textContent = `${GameController.getActivePlayer().name}'s turn`;
            render();
        });
        closeBtn.addEventListener('click', () => {
            Gameboard.resetBoard();
            turnIndicator.textContent = `${GameController.getActivePlayer().name}'s turn`;
            render();
            dialog.close();
        });
        startBtn.addEventListener('click', () => {
            setupCont.classList.add('hide');
            btnCont.classList.remove('hide');
            container.classList.remove('hide');

            GameController.initPlayers(input1.value, input2.value);
            render();
        });
        playAgain.addEventListener('click', () => {
            input1.value = "";
            input2.value = "";
            Gameboard.resetBoard();
            render();
            dialog.close();
            setupCont.classList.remove('hide');
            btnCont.classList.add('hide');
            container.classList.add('hide');
        });
    };
    const render = () => {
        const currentBoard = Gameboard.getBoard();
        cellsList.forEach((cell, index) => {
            cell.textContent = currentBoard[index];
            cell.classList.remove('x-mark', 'o-mark');
            if (currentBoard[index] !== "") {
                cell.classList.add(`${currentBoard[index].toLowerCase()}-mark`);
            }
            turnIndicator.textContent = `${GameController.getActivePlayer().name}'s turn`;
        });
    }
    const result = (name) => {
        dialog.textContent = "";
        let message = document.createElement("p");
        message.classList.add("message");
        closeBtn.classList.add("closeDialog");
        closeBtn.textContent = "Cancel";
        playAgain.classList.add("#playAgain")
        playAgain.textContent = "Play Again"
        let container = document.createElement("div");
        container.classList.add("big");
        let miniContainer = document.createElement("div");
        miniContainer.classList.add("mini");

        if (name == "") {
            message.textContent = "This round ends at a tie";
        } else {
            message.textContent = `${name} is the winner`;
        }
        miniContainer.append(closeBtn, playAgain);
        container.append(message, miniContainer);
        dialog.append(container);
        dialog.showModal();
    }
    bindEvents();
    return {
        render,
        result,
    };
})();