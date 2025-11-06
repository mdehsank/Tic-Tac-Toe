// Select all buttons and the reset button
const buttons = document.querySelectorAll(".btn-class");
const resetButton = document.querySelector(".resetBtn");
const msg = document.querySelector(".msg-continer"); // Message container

// Winning patterns (indices of buttons)
const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

let turn = "X"; // Starting turn

// Add click event to each button
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (btn.innerText === "") {
      btn.innerText = turn; // Set X or O

      // Check for winner after every move
      checkWinner();

      // Switch turn
      turn = turn === "X" ? "O" : "X";
    }
  });
});

// Function to check winner
function checkWinner() {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;

    if (
      buttons[a].innerText !== "" &&
      buttons[a].innerText === buttons[b].innerText &&
      buttons[a].innerText === buttons[c].innerText
    ) {
      // Highlight winning buttons
      pattern.forEach(i => buttons[i].style.backgroundColor = "lightgreen");

      // Disable all buttons
      buttons.forEach(btn => btn.disabled = true);

      // Show winner message
      msg.innerText = `Congratulations! Player ${buttons[a].innerText} has won the game!`;

      return; // Stop checking after a winner is found
    }
  }

  // Optional: Check for tie
  if ([...buttons].every(btn => btn.innerText !== "")) {
    msg.innerText = "It's a tie!";
  }
}

// Reset button functionality
resetButton.addEventListener("click", () => {
  buttons.forEach(btn => {
    btn.innerText = "";
    btn.disabled = false;
    btn.style.backgroundColor = "";
  });

  msg.innerText = ""; // Clear message
  turn = "X";         // Reset turn
});
