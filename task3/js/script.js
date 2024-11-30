let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";  // "X" starts
let gameOver = false;
let lastMoveIndex = null;
let gameMode = "friend";  // Default to "friend", can change to "computer"

document.getElementById('gameMode').addEventListener('change', (e) => {
  gameMode = e.target.value;  // Change mode based on selection
  resetGame();
});

function handleClick(index) {
  if (gameOver || board[index] !== "") return; // Prevent click on already filled cells
  
  board[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].textContent = currentPlayer;
  lastMoveIndex = index;  // Track the last move
  
  // Update last move display
  document.getElementById('last-move').textContent = `Last move: ${currentPlayer} at position ${index + 1}`;
  
  const winner = checkWinner(currentPlayer);
  if (winner) {
    highlightWinningCells(winner);
    showWinnerMessage("🎉 "+ currentPlayer + " wins! 🎉");
    gameOver = true;
    return;
  }
  
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player

  // If playing against the computer, trigger computer's move
  if (gameMode === "computer" && !gameOver && currentPlayer === "O") {
    computerMove();
  }
}

function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  
    [0, 4, 8], [2, 4, 6]               
  ];

  for (let pattern of winPatterns) {
    if (pattern.every(index => board[index] === player)) {
      return pattern;  // Return the winning combination (array of indexes)
    }
  }
  
  return null;  // No winner
}

function highlightWinningCells(winningPattern) {
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = ""; // Clear background color
  }

  for (let index of winningPattern) {
    document.getElementsByClassName('cell')[index].style.backgroundColor = "yellow";
  }
}

function showWinnerMessage(message) {
  const messageBox = document.getElementById('winnerMessage');
  messageBox.textContent = message;
  messageBox.style.display = 'block';  // Show the message
  
  // Hide the message after 3 seconds
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 10000);
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  lastMoveIndex = null;

  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].style.backgroundColor = ""; // Remove any previous highlights
  }

  // Reset last move display
  document.getElementById('last-move').textContent = "Last move: ";
  
  // Hide the winner message when the game resets
  document.getElementById('winnerMessage').style.display = 'none';
}

function computerMove() {
  if (gameOver) return;

  let availableMoves = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
  let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  
  board[move] = "O";  // Assuming "O" is the computer
  document.getElementsByClassName('cell')[move].textContent = "O";
  lastMoveIndex = move;  // Track the last move for computer
  
  // Update last move display
  document.getElementById('last-move').textContent = `Last move: O at position ${move + 1}`;
  
  const winner = checkWinner("O");
  if (winner) {
    highlightWinningCells(winner);
    showWinnerMessage("🎉 Computer wins! 🎉");
    gameOver = true;
  } else {
    currentPlayer = "X";  // Switch to player after computer's move
  }
}
