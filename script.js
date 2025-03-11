const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            message.textContent = `${currentPlayer} Wins!`;
            disableBoard();
            return true;
        }
    }
    if (!boardState.includes("")) {
        message.textContent = "It's a Draw!";
        return true;
    }
    return false;
}

function handleClick(index) {
    if (boardState[index] !== "" || message.textContent) return;
    boardState[index] = currentPlayer;
    document.getElementById(index).textContent = currentPlayer;
    document.getElementById(index).classList.add("taken");
    if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    message.textContent = "";
    currentPlayer = "X";
    board.innerHTML = "";
    createBoard();
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.classList.add("taken"));
}

function createBoard() {
    boardState.forEach((_, i) => {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.id = i;
        cell.addEventListener("click", () => handleClick(i));
        board.appendChild(cell);
    });
}

restartButton.addEventListener("click", resetGame);
createBoard();
