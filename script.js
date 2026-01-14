const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    return {
        getBoard: () => board,
        placeMark: (position, mark) => {
            (board[position] === false) ? board[position] = mark : "This position is already taken";
        }
    };
})();