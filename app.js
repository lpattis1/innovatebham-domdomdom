// Create button and it's parent element on load

function loadContent() {
  document.addEventListener("DOMContentLoaded", function (e) {
    const parentDiv = document.querySelector(".parent-div");

    const btn = document.createElement("button");
    btn.textContent = "Add Square";
    btn.className = "btn";

    parentDiv.appendChild(btn);

    btn.addEventListener("click", createSquares);
  });
}

// When newly created button is clicked, create a new square each time

function createSquares(e) {
  const squareContainer = document.querySelector(".square-container");
  squareContainer.className = "square-container";
  const square = document.createElement("div");
  square.className = "square";
  square.style.marginRight = "2rem";
  square.style.marginBottom = "2rem";
  squareContainer.appendChild(square);

  const squares = document.querySelectorAll(".square");

  addIDToSquares(squares);
  changeSquareBackgroundColor(squares);
}

// Add an id to each individual square based on it's index position/number

function addIDToSquares(squares) {
  squares.forEach((square, index) => {
    if (!document.getElementById(index)) {
      square.id = index;
      displayAndHideSquareID(square, square.id);
      removePreviousOrNextSquares(square, square.id);
    } else {
      return;
    }
  });
}

// Get a random number (for the RGB value of the clicked square)

function randomRGBANumber() {
  return Math.floor(Math.random() * 256);
}

// Change the background of each square when clicked

function changeSquareBackgroundColor(squares) {
  squares.forEach((square) => {
    square.addEventListener("click", function (e) {
      square.style.background = `rgb(${randomRGBANumber()}, ${randomRGBANumber()}, ${randomRGBANumber()})`;
    });
  });
}

// If a square's id is even, the next element sibling of the targeted square should be removed, else if the square id is odd, the previous element sibling of the targeted square should be removed. If there isn't a square before or after the targeted square, display an alert

function removePreviousOrNextSquares(square, squareID) {
  square.addEventListener("dblclick", function (e) {
    if (squareID % 2 === 0) {
      square.nextElementSibling.remove();
    } else if (!squareID % 2 === 0) {
      square.previousElementSibling.remove();
    } else {
      return;
    }
  });
}

// Show square id on mouseover and hide it on mouseout

function displayAndHideSquareID(square, squareID) {
  const headingID = document.createElement("h3");
  headingID.textContent = squareID;
  headingID.className = "heading-id";
  square.addEventListener("mouseover", function (e) {
    if (!square.children[0]) {
      square.appendChild(headingID);
    } else {
      return;
    }
  });

  square.addEventListener("mouseleave", function (e) {
    square.children[0].remove();
  });
}

loadContent();
