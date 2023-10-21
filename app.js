// Module for game board
const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { getBoard, resetBoard };
})();

// Factory for players
const Player = (name, marker) => {
    return { name, marker };
};

const displayController = (() => {
    const board = document.getElementById("game-board");
    const result = document.getElementById("result");
    const startButton = document.getElementById("start-button");

    let currentPlayer;
    let player1;
    let player2;

    startButton.addEventListener("click", startGame);

    board.addEventListener("click", (e) => {
        if (currentPlayer && e.target.textContent === "") {
            e.target.textContent = currentPlayer.marker;
            Gameboard.getBoard()[e.target.dataset.index] = currentPlayer.marker;
            if (checkForWin(currentPlayer.marker)) {
                result.textContent = `${currentPlayer.name} wins!`;
                startButton.style.display = "block";
            } else if (isBoardFull()) {
                result.textContent = "It's a tie!";
                startButton.style.display = "block";
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
        }
    });

    function startGame() {
        const player1Name = document.getElementById("player1").value;
        const player2Name = document.getElementById("player2").value;

        if (player1Name && player2Name) {
            player1 = Player(player1Name, "X");
            player2 = Player(player2Name, "O");
            currentPlayer = player1;
            result.textContent = "";
            Gameboard.resetBoard();
            board.innerHTML = "";
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                board.appendChild(cell);
            }
            startButton.style.display = "none";
        } else {
            alert("Please enter both players' names.");
        }
    }

    function checkForWin(marker) {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            if (combo.every(index => Gameboard.getBoard()[index] === marker)) {
                return true;
            }
        }
        return false;
    }

    function isBoardFull() {
        return Gameboard.getBoard().every(cell => cell !== "");
    }
})();
