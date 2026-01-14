let gameBoard = [];
let gameBoardObj = function () {
    let gameBoard = [];
};
let player = function (name) {
    const playerName = name;
    let moves = [];
    return function (move) {
        moves.push(move);
        gameBoard.push(move);
        return { playerName, moves }
    }
};
let gameLogic = function () {
    const player1 = player("stephen");
    const player2 = player("james");
};
const player1 = player("stephen");
    const player2 = player("james");
gameLogic();
