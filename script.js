const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    return {
        getBoard: () => board,
        placeMark: (position, mark) => {
            (board[position] === '') 
            ? board[position] = mark
            : console.log("This position is already taken");
        }
    };
})();
const Player = (name, mark) => {
   
    return { name, mark };
};
const GameController = (function () {
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
            Gameboard.placeMark(position, activePlayer.mark);
            switchPlayer();
        }
    };
})();