const container = document.getElementById("container");
const resetBtn = document.getElementById("reset-btn");
const blackBtn = document.getElementById("black-btn");
const randomBtn = document.getElementById("random-btn");
const darkenBtn = document.getElementById("darken-btn");
const clearBtn = document.getElementById("clear-btn");

let currentMode = "black"; // Options: 'black', 'random', 'darken'

// Helper function to generate a random RGB color string
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to create the grid
function createGrid(squaresPerSide) {
  // Clear any existing squares inside the container
  container.innerHTML = "";

  // Calculate width/height percentage for each square so it fits perfectly
  const squareSizePercent = 100 / squaresPerSide;

  // Total total number of squares needed (e.g., 16x16 = 256)
  const totalSquares = squaresPerSide * squaresPerSide;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");

    // Set flex-basis / size dynamically so all squares stay within the fixed container
    square.style.width = `${squareSizePercent}%`;
    square.style.height = `${squareSizePercent}%`;

    // Store opacity interaction count for Progressive Darkening (Extra Credit)
    square.dataset.darkness = "0";

    // Hover event listener
    square.addEventListener("mouseenter", () => handleHover(square));

    container.appendChild(square);
  }
}

// Function to handle square coloring on mouseenter
function handleHover(square) {
  if (currentMode === "black") {
    square.style.backgroundColor = "#000000";
    square.style.opacity = "1";
  } else if (currentMode === "random") {
    square.style.backgroundColor = getRandomColor();
    square.style.opacity = "1";
  } else if (currentMode === "darken") {
    // Extra Credit: Progressive Darkening (+10% opacity each hover)
    let currentDarkness = parseInt(square.dataset.darkness, 10);

    if (currentDarkness < 10) {
      currentDarkness += 1;
      square.dataset.darkness = currentDarkness;

      // If square doesn't have a background color yet, make it black
      if (
        !square.style.backgroundColor ||
        square.style.backgroundColor === "rgb(255, 255, 255)"
      ) {
        square.style.backgroundColor = "#000000";
      }

      // Set opacity: 0.1 for 1 hover, 1.0 for 10 hovers
      square.style.opacity = (currentDarkness * 0.1).toString();
    }
  }
}

// Function to set active mode button styling
function setMode(mode, activeBtn) {
  currentMode = mode;
  [blackBtn, randomBtn, darkenBtn].forEach((btn) =>
    btn.classList.remove("active"),
  );
  activeBtn.classList.add("active");
}

// Event Listeners for Mode Selection
blackBtn.addEventListener("click", () => setMode("black", blackBtn));
randomBtn.addEventListener("click", () => setMode("random", randomBtn));
darkenBtn.addEventListener("click", () => setMode("darken", darkenBtn));

// Clear button resets the canvas colors without changing grid dimensions
clearBtn.addEventListener("click", () => {
  const squares = document.querySelectorAll(".grid-square");
  squares.forEach((square) => {
    square.style.backgroundColor = "#ffffff";
    square.style.opacity = "1";
    square.dataset.darkness = "0";
  });
});

// "New Grid Size" Prompt Handler
resetBtn.addEventListener("click", () => {
  let userInput = prompt("Enter number of squares per side (Max 100):");

  // Cancelled prompt check
  if (userInput === null) return;

  const num = parseInt(userInput, 10);

  // Validation
  if (isNaN(num) || num < 1 || num > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  createGrid(num);
});

// Initialize default 16x16 grid on page load
createGrid(16);
