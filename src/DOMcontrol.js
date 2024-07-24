import { player, computer } from "./players";

let playerBoard = document.querySelector(".players-board");
let computerBoard = document.querySelector(".computers-board");
let computerTitle = document.querySelector(".computer-title");
let gamePlayDiv = document.querySelector(".play-game");

let acState = false;
let bsState = false;
let deState = false;
let sbState = false;
let crState = false;
let horizontal = true;
let shipsPlaced = 0;
let gameStart = false;
let lastAttack 

function createBoardSquares(board, playerB = true) {
  if (playerB) {
    for (let i = 0; i < player.gameboard.board.length; i++) {
      for (let j = 0; j < player.gameboard.board[i].length; j++) {
        let square = document.createElement("div");
        board.appendChild(square);
        square.classList.add("square");
        square.classList.add("home-square");
        square.dataset.x = j;
        square.dataset.y = i;
        square.addEventListener("click", () => {
          if (!gameStart) {
            if (
              acState == false &&
              bsState == false &&
              deState == false &&
              sbState == false &&
              crState == false &&
              square.classList.contains("ship-selected")
            ) {
              editShipPlacement(square.dataset.name);
            }
          }
        });
      }
    }
  } else {
    for (let i = 0; i < computer.gameboard.board.length; i++) {
      for (let j = 0; j < computer.gameboard.board[i].length; j++) {
        let square = document.createElement("div");
        board.appendChild(square);

        square.classList.add("square");
        square.classList.add("play-square");
        square.dataset.x = j;
        square.dataset.y = i;
        square.addEventListener("click", (event) => {
          computerBoardSquareFunction(event);
        });
      }
    }
  }
}

function resetColors() {
  for (let i = 0; i < player.gameboard.board.length; i++) {
    for (let j = 0; j < player.gameboard.board[i].length; j++) {
      let active = document.querySelector(`div[data-x='${i}'][data-y='${j}']`);
      if (active.classList.contains("ship-selection")) {
        active.classList.remove("ship-selection");
      }
      if (active.classList.contains("conflict")) {
        active.classList.remove("conflict");
      }
    }
  }
}

function shipHover(shipLength, event) {
  if (horizontal) {
    let x = event.target.dataset.x;
    let xInt = (x = parseInt(x));
    if (xInt + (shipLength - 1) > 9) {
      xInt = 9 - (shipLength - 1);
      x = String(xInt);
    }
    let y = event.target.dataset.y;
    for (let i = 0; i < shipLength; i++) {
      let active = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
      if (active.classList.contains("ship-selected")) {
        active.classList.add("conflict");
      } else {
        active.classList.add("ship-selection");
      }
      x = parseInt(x);
      x += 1;
      x = String(x);
    }
  } else {
    let y = event.target.dataset.y;
    let yInt = (y = parseInt(y));
    if (yInt + (shipLength - 1) > 9) {
      yInt = 9 - (shipLength - 1);
      y = String(yInt);
    }
    let x = event.target.dataset.x;
    for (let i = 0; i < shipLength; i++) {
      let active = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
      if (active.classList.contains("ship-selected")) {
        active.classList.add("conflict");
      } else {
        active.classList.add("ship-selection");
      }
      y = parseInt(y);
      y += 1;
      y = String(y);
    }
  }
}

function placementValidator(shipLength, event) {
  let result = true;
  if (horizontal) {
    let x = event.target.dataset.x;
    let xInt = parseInt(x);
    if (xInt + (shipLength - 1) > 9) {
      xInt = 9 - (shipLength - 1);
      x = String(xInt);
    }
    let y = event.target.dataset.y;

    for (let i = 0; i < shipLength; i++) {
      let active = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
      if (active.classList.contains("ship-selected")) {
        result = false;
      }
      x = parseInt(x);
      x += 1;
      x = String(x);
    }
  } else {
    let y = event.target.dataset.y;
    let yInt = (y = parseInt(y));
    if (yInt + (shipLength - 1) > 9) {
      yInt = 9 - (shipLength - 1);
      y = String(yInt);
    }
    let x = event.target.dataset.x;
    for (let i = 0; i < shipLength; i++) {
      let active = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
      if (active.classList.contains("ship-selected")) {
        result = false;
      }
      y = parseInt(y);
      y += 1;
      y = String(y);
    }
  }
  return result;
}

function shipPlace(shipName, shipLength, event) {
  if (horizontal) {
    let x = event.target.dataset.x;
    let xInt = (x = parseInt(x));
    if (xInt + (shipLength - 1) > 9) {
      xInt = 9 - (shipLength - 1);
      x = String(xInt);
    }
    let y = event.target.dataset.y;
    let yInt = parseInt(y);

    if (placementValidator(shipLength, event)) {
      player.gameboard.placeShip(shipName, xInt, yInt, horizontal);
      for (let i = 0; i < shipLength; i++) {
        let active = document.querySelector(
          `div[data-x='${x}'][data-y='${y}']`
        );
        active.classList.add("ship-selected");
        active.dataset.name = shipName;
        if (i == 0) {
          active.classList.add("start-horizontal");
        } else if (i == shipLength - 1) {
          active.classList.add("end-horizontal");
        } else {
          active.classList.add("mid-horizontal");
        }
        x = parseInt(x);
        x += 1;
        x = String(x);
      }
      let shipContainer = document.querySelector(".active");
      shipContainer.textContent = "";
      acState = bsState = deState = sbState = crState = false;
      shipsPlaced += 1;
    }
  } else {
    let y = event.target.dataset.y;
    let yInt = (y = parseInt(y));
    if (yInt + (shipLength - 1) > 9) {
      yInt = 9 - (shipLength - 1);
      y = String(yInt);
    }
    let x = event.target.dataset.x;
    let xInt = parseInt(x);

    if (placementValidator(shipLength, event)) {
      player.gameboard.placeShip(shipName, xInt, yInt, horizontal);
      for (let i = 0; i < shipLength; i++) {
        let active = document.querySelector(
          `div[data-x='${x}'][data-y='${y}']`
        );
        active.classList.add("ship-selected");
        active.dataset.name = shipName;
        if (i == 0) {
          active.classList.add("start-vertical");
        } else if (i == shipLength - 1) {
          active.classList.add("end-vertical");
        } else {
          active.classList.add("mid-vertical");
        }
        y = parseInt(y);
        y += 1;
        y = String(y);
      }
      let shipContainer = document.querySelector(".active");
      shipContainer.textContent = "";
      acState = bsState = deState = sbState = crState = false;
      shipsPlaced += 1;
    }
  }

  if (shipsPlaced === 5) {
    doYouWantToPlayAGame();
  }
}

function resetShip(shipName) {
  let length = 0;
  for (let i = 0; i < player.gameboard.board.length; i++) {
    for (let j = 0; j < player.gameboard.board[i].length; j++) {
      let active = document.querySelector(`div[data-x='${i}'][data-y='${j}']`);
      if (active.dataset.name == shipName) {
        active.classList.remove("ship-selected");

        active.classList.remove("start-vertical");
        active.classList.remove("end-vertical");
        active.classList.remove("mid-vertical");
        active.classList.remove("start-horizontal");
        active.classList.remove("end-horizontal");
        active.classList.remove("mid-horizontal");
        active.dataset.name = "";
        length += 1;
      }
    }
  }

  return length;
}

function editShipPlacement(shipName) {
  let length = resetShip(shipName);
  let active = document.querySelector(".active");
  if (active) {
    active.classList.remove("active");
  }
  let focus = document.querySelector(`.${shipName}`);

  placeShip(shipName, length, focus);
  if (shipsPlaced === 5) {
    gamePlayDiv.textContent = "";
  }
  shipsPlaced -= 1;
}

function setHover(event) {
  if (acState) {
    shipHover(5, event);
  } else if (bsState) {
    shipHover(4, event);
  } else if (deState) {
    shipHover(3, event);
  } else if (sbState) {
    shipHover(3, event);
  } else if (crState) {
    shipHover(2, event);
  }
}
playerBoard.addEventListener("mousemove", (event) => {
  mouseHover(event);
});

function mouseHover(event) {
  resetColors();
  setHover(event);
}

function boardSetupClick(event) {
  resetColors();

  if (acState) {
    shipPlace("Aircraft-Carrier", 5, event);
  } else if (bsState) {
    shipPlace("Battleship", 4, event);
  } else if (deState) {
    shipPlace("Destroyer", 3, event);
  } else if (sbState) {
    shipPlace("Submarine", 3, event);
  } else if (crState) {
    shipPlace("Cruiser", 2, event);
  }
}

playerBoard.addEventListener("click", (event) => {
  boardSetupClick(event);
});

playerBoard.addEventListener("mouseout", resetColors);

function createShip(length) {
  let div = document.createElement("div");
  div.classList.add("ship");
  for (let i = 0; i < length; i++) {
    let square = document.createElement("div");
    square.classList.add("ship-square");
    div.appendChild(square);
  }
  return div;
}

function createShipDiv(shipName, length) {
  let shipContainer = document.createElement("div");
  shipContainer.classList.add("ship-container");
  shipContainer.classList.add(shipName);
  return createShipDivContent(shipName, length, shipContainer);
}

function createShipDivContent(shipName, length, shipContainer) {
  let shipTitle = document.createElement("h3");
  shipTitle.classList.add("ship-name");
  shipTitle.textContent = shipName;

  shipContainer.appendChild(shipTitle);
  shipContainer.appendChild(createShip(length));

  return shipContainer;
}

function placeShip(shipName, length, shipContainer) {
  let shipD = createShipDivContent(shipName, length, shipContainer);
  shipD.addEventListener("click", () => {
    acState = bsState = deState = sbState = crState = false;
    if (shipName == "Destroyer") {
      deState = true;
    } else if (shipName == "Battleship") {
      bsState = true;
    } else if (shipName == "Aircraft-Carrier") {
      acState = true;
    } else if (shipName == "Submarine") {
      sbState = true;
    } else if (shipName == "Cruiser") {
      crState = true;
    }

    toggleActive();
    shipD.classList.add("active");
  });
  return shipD;
}

function toggleActive() {
  let active = document.querySelector(".active");

  if (active != null) {
    active.classList.remove("active");
  }
}

function placeShips() {
  computerBoard.classList.add("ship-set-up");
  computerTitle.textContent = "Place Ships";
  let shipDirection = document.querySelector(".holder");
  shipDirection.textContent = "➡";
  shipDirection.addEventListener("click", () => {
    if (horizontal) {
      shipDirection.textContent = "⬆";
      horizontal = false;
    } else {
      shipDirection.textContent = "➡";
      horizontal = true;
    }
  });
  let ac = computerBoard.appendChild(createShipDiv("Aircraft-Carrier", 5));
  let bs = computerBoard.appendChild(createShipDiv("Battleship", 4));
  let de = computerBoard.appendChild(createShipDiv("Destroyer", 3));
  let sub = computerBoard.appendChild(createShipDiv("Submarine", 3));
  let cr = computerBoard.appendChild(createShipDiv("Cruiser", 2));

  ac.addEventListener("click", () => {
    acState = bsState = deState = sbState = crState = false;
    acState = true;
    toggleActive();
    ac.classList.add("active");
  });
  bs.addEventListener("click", () => {
    acState = bsState = deState = sbState = crState = false;
    bsState = true;
    toggleActive();
    bs.classList.add("active");
  });
  de.addEventListener("click", () => {
    acState = bsState = deState = sbState = crState = false;
    deState = true;
    toggleActive();
    de.classList.add("active");
  });
  sub.addEventListener("click", () => {
    acState = bsState = deState = sbState = crState = false;
    sbState = true;
    toggleActive();
    sub.classList.add("active");
  });
  cr.addEventListener("click", () => {
    acState = bsState = deState = sbState = crState = false;
    crState = true;
    toggleActive();
    cr.classList.add("active");
  });
}

function makeComputerBoard() {
  computerBoard.textContent = "";
  computerBoard.classList.remove("ship-set-up");
  createBoardSquares(computerBoard, false);
  let shipDirection = document.querySelector(".holder");
  shipDirection.textContent = "";
  computerTitle.textContent = "Computer Board";
}

function doYouWantToPlayAGame() {
  let question = document.createElement("h3");
  gamePlayDiv.appendChild(question);
  question.classList.add("start-title");
  question.textContent = "Start Game?";
  let startButton = document.createElement("button");
  gamePlayDiv.appendChild(startButton);
  startButton.classList.add("start-button");
  startButton.textContent = "Play";
  startButton.addEventListener("click", () => {
    gameStart = true;
    playerBoard.removeEventListener(
      "mousemove",
      (event) => {
        mouseHover(event);
      },
      false
    );
    playerBoard.removeEventListener("click", (event) => {
      boardSetupClick(event);
    });
    playerBoard.removeEventListener("mouseout", resetColors);
    makeComputerBoard();
    placeComputerShips();
  });
}

function computerBoardSquareFunction(event) {
  if (!event.target.classList.contains("already-played")) {
    let x = event.target.dataset.x
    let y = event.target.dataset.y
    let hit = computer.gameboard.receiveAttack(x,y)

    event.target.classList.add("already-played");

    if (hit === 3) {
      event.target.classList.add("miss");
    } else if (hit === 1) {
        event.target.classList.add("hit");
    }
    if (!computer.gameboard.anyShipsLeft()) {
      winHandler(true);
      return
    }
    if (!player.gameboard.anyShipsLeft()) {
      winHandler(false);
      return;
    }
    computerTurn();
  }
}

function winHandler(playerWin) {
  let space = document.querySelector(".game-space");
  space.textContent = "";
  let message = document.createElement("h2");
  message.classList.add("final-message");
  if (playerWin) {
    message.textContent = "You Win!    Would you like to play again?";
  } else {
    message.textContent = "You Lost!    Would you like to play again?";
  }
  let button = document.createElement("button");
  button.classList.add("play-again");
  button.textContent = "Play Again?";
  space.appendChild(message);
  space.appendChild(button);
  button.addEventListener("click", () => {
    location.reload();
  });
}

function computerTurn() {
  setTimeout(() => {
    computerShot();
  }, 500);
}

function computerShot() {

  while (true) {
    
    let x = randomIntFromInterval(0, 9);
    let y = randomIntFromInterval(0, 9);
    let thefocus = document.querySelector(
      `div.square.home-square[data-x='${x}'][data-y='${y}']`
    );
    if(thefocus.classList.contains("already-played")){continue}
    let hit = player.gameboard.receiveAttack(x, y);
    if (hit === 3) {
      thefocus.classList.add("miss");
    } else if (hit === 1) {
      thefocus.classList.add("hit");
    }
    thefocus.classList.add("already-played");
    break;
  }
}

createBoardSquares(playerBoard);
placeShips();

function placeComputerShips() {
  let ships = computer.gameboard.shipList;
  for (let i = 0; i < 5; i++) {
    while (true) {
      let valid = true;
      let direction = randomIntFromInterval(1, 2);
      direction === 1 ? (direction = true) : (direction = false);
      let x = randomIntFromInterval(0, 9);
      let y = randomIntFromInterval(0, 9);

      let shipName = ships[i].name;

      if (direction) {
        if (x + (ships[i].length - 1) > 9) {
          valid = false;
        } else {
          for (let j = 0; j < ships[i].length; j++) {
            if (computer.gameboard.board[y][x + j] != 0) {
              valid = false;
            }
          }
        }
      }
      if (!direction) {
        if (y + (ships[i].length - 1) > 9) {
          valid = false;
        } else {
          for (let j = 0; j < ships[i].length; j++) {
            if (computer.gameboard.board[y + j][x] != 0) {
              valid = false;
            }
          }
        }
      }
      if (!valid) {
        continue;
      }

      computer.gameboard.placeShip(shipName, x, y, direction);

      break;
    }
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
