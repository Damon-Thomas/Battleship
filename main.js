/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMcontrol.js":
/*!***************************!*\
  !*** ./src/DOMcontrol.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ "./src/players.js");

var playerBoard = document.querySelector(".players-board");
var computerBoard = document.querySelector(".computers-board");
var computerTitle = document.querySelector(".computer-title");
var gamePlayDiv = document.querySelector(".play-game");
var acState = false;
var bsState = false;
var deState = false;
var sbState = false;
var crState = false;
var horizontal = true;
var shipsPlaced = 0;
var gameStart = false;
var lastAttack;
function createBoardSquares(board) {
  var playerB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (playerB) {
    for (var i = 0; i < _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.board.length; i++) {
      var _loop = function _loop() {
        var square = document.createElement("div");
        board.appendChild(square);
        square.classList.add("square");
        square.classList.add("home-square");
        square.dataset.x = j;
        square.dataset.y = i;
        square.addEventListener("click", function () {
          if (!gameStart) {
            if (acState == false && bsState == false && deState == false && sbState == false && crState == false && square.classList.contains("ship-selected")) {
              editShipPlacement(square.dataset.name);
            }
          }
        });
      };
      for (var j = 0; j < _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.board[i].length; j++) {
        _loop();
      }
    }
  } else {
    for (var _i = 0; _i < _players__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.board.length; _i++) {
      for (var _j = 0; _j < _players__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.board[_i].length; _j++) {
        var square = document.createElement("div");
        board.appendChild(square);
        square.classList.add("square");
        square.classList.add("play-square");
        square.dataset.x = _j;
        square.dataset.y = _i;
        square.addEventListener("click", function (event) {
          computerBoardSquareFunction(event);
        });
      }
    }
  }
}
function resetColors() {
  for (var i = 0; i < _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.board.length; i++) {
    for (var j = 0; j < _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.board[i].length; j++) {
      var active = document.querySelector("div[data-x='".concat(i, "'][data-y='").concat(j, "']"));
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
    var x = event.target.dataset.x;
    var xInt = x = parseInt(x);
    if (xInt + (shipLength - 1) > 9) {
      xInt = 9 - (shipLength - 1);
      x = String(xInt);
    }
    var y = event.target.dataset.y;
    for (var i = 0; i < shipLength; i++) {
      var active = document.querySelector("div[data-x='".concat(x, "'][data-y='").concat(y, "']"));
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
    var _y = event.target.dataset.y;
    var yInt = _y = parseInt(_y);
    if (yInt + (shipLength - 1) > 9) {
      yInt = 9 - (shipLength - 1);
      _y = String(yInt);
    }
    var _x = event.target.dataset.x;
    for (var _i2 = 0; _i2 < shipLength; _i2++) {
      var _active = document.querySelector("div[data-x='".concat(_x, "'][data-y='").concat(_y, "']"));
      if (_active.classList.contains("ship-selected")) {
        _active.classList.add("conflict");
      } else {
        _active.classList.add("ship-selection");
      }
      _y = parseInt(_y);
      _y += 1;
      _y = String(_y);
    }
  }
}
function placementValidator(shipLength, event) {
  var result = true;
  if (horizontal) {
    var x = event.target.dataset.x;
    var xInt = parseInt(x);
    if (xInt + (shipLength - 1) > 9) {
      xInt = 9 - (shipLength - 1);
      x = String(xInt);
    }
    var y = event.target.dataset.y;
    for (var i = 0; i < shipLength; i++) {
      var active = document.querySelector("div[data-x='".concat(x, "'][data-y='").concat(y, "']"));
      if (active.classList.contains("ship-selected")) {
        result = false;
      }
      x = parseInt(x);
      x += 1;
      x = String(x);
    }
  } else {
    var _y2 = event.target.dataset.y;
    var yInt = _y2 = parseInt(_y2);
    if (yInt + (shipLength - 1) > 9) {
      yInt = 9 - (shipLength - 1);
      _y2 = String(yInt);
    }
    var _x2 = event.target.dataset.x;
    for (var _i3 = 0; _i3 < shipLength; _i3++) {
      var _active2 = document.querySelector("div[data-x='".concat(_x2, "'][data-y='").concat(_y2, "']"));
      if (_active2.classList.contains("ship-selected")) {
        result = false;
      }
      _y2 = parseInt(_y2);
      _y2 += 1;
      _y2 = String(_y2);
    }
  }
  return result;
}
function shipPlace(shipName, shipLength, event) {
  if (horizontal) {
    var x = event.target.dataset.x;
    var xInt = x = parseInt(x);
    if (xInt + (shipLength - 1) > 9) {
      xInt = 9 - (shipLength - 1);
      x = String(xInt);
    }
    var y = event.target.dataset.y;
    var yInt = parseInt(y);
    if (placementValidator(shipLength, event)) {
      _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.placeShip(shipName, xInt, yInt, horizontal);
      for (var i = 0; i < shipLength; i++) {
        var active = document.querySelector("div[data-x='".concat(x, "'][data-y='").concat(y, "']"));
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
      var shipContainer = document.querySelector(".active");
      shipContainer.textContent = "";
      acState = bsState = deState = sbState = crState = false;
      shipsPlaced += 1;
    }
  } else {
    var _y3 = event.target.dataset.y;
    var _yInt = _y3 = parseInt(_y3);
    if (_yInt + (shipLength - 1) > 9) {
      _yInt = 9 - (shipLength - 1);
      _y3 = String(_yInt);
    }
    var _x3 = event.target.dataset.x;
    var _xInt = parseInt(_x3);
    if (placementValidator(shipLength, event)) {
      _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.placeShip(shipName, _xInt, _yInt, horizontal);
      for (var _i4 = 0; _i4 < shipLength; _i4++) {
        var _active3 = document.querySelector("div[data-x='".concat(_x3, "'][data-y='").concat(_y3, "']"));
        _active3.classList.add("ship-selected");
        _active3.dataset.name = shipName;
        if (_i4 == 0) {
          _active3.classList.add("start-vertical");
        } else if (_i4 == shipLength - 1) {
          _active3.classList.add("end-vertical");
        } else {
          _active3.classList.add("mid-vertical");
        }
        _y3 = parseInt(_y3);
        _y3 += 1;
        _y3 = String(_y3);
      }
      var _shipContainer = document.querySelector(".active");
      _shipContainer.textContent = "";
      acState = bsState = deState = sbState = crState = false;
      shipsPlaced += 1;
    }
  }
  if (shipsPlaced === 5) {
    doYouWantToPlayAGame();
  }
}
function resetShip(shipName) {
  var length = 0;
  for (var i = 0; i < _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.board.length; i++) {
    for (var j = 0; j < _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.board[i].length; j++) {
      var active = document.querySelector("div[data-x='".concat(i, "'][data-y='").concat(j, "']"));
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
  var length = resetShip(shipName);
  var active = document.querySelector(".active");
  if (active) {
    active.classList.remove("active");
  }
  var focus = document.querySelector(".".concat(shipName));
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
playerBoard.addEventListener("mousemove", function (event) {
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
playerBoard.addEventListener("click", function (event) {
  boardSetupClick(event);
});
playerBoard.addEventListener("mouseout", resetColors);
function createShip(length) {
  var div = document.createElement("div");
  div.classList.add("ship");
  for (var i = 0; i < length; i++) {
    var square = document.createElement("div");
    square.classList.add("ship-square");
    div.appendChild(square);
  }
  return div;
}
function createShipDiv(shipName, length) {
  var shipContainer = document.createElement("div");
  shipContainer.classList.add("ship-container");
  shipContainer.classList.add(shipName);
  return createShipDivContent(shipName, length, shipContainer);
}
function createShipDivContent(shipName, length, shipContainer) {
  var shipTitle = document.createElement("h3");
  shipTitle.classList.add("ship-name");
  shipTitle.textContent = shipName;
  shipContainer.appendChild(shipTitle);
  shipContainer.appendChild(createShip(length));
  return shipContainer;
}
function placeShip(shipName, length, shipContainer) {
  var shipD = createShipDivContent(shipName, length, shipContainer);
  shipD.addEventListener("click", function () {
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
  var active = document.querySelector(".active");
  if (active != null) {
    active.classList.remove("active");
  }
}
function placeShips() {
  computerBoard.classList.add("ship-set-up");
  computerTitle.textContent = "Place Ships";
  var shipDirection = document.querySelector(".holder");
  shipDirection.textContent = "➡";
  shipDirection.addEventListener("click", function () {
    if (horizontal) {
      shipDirection.textContent = "⬆";
      horizontal = false;
    } else {
      shipDirection.textContent = "➡";
      horizontal = true;
    }
  });
  var ac = computerBoard.appendChild(createShipDiv("Aircraft-Carrier", 5));
  var bs = computerBoard.appendChild(createShipDiv("Battleship", 4));
  var de = computerBoard.appendChild(createShipDiv("Destroyer", 3));
  var sub = computerBoard.appendChild(createShipDiv("Submarine", 3));
  var cr = computerBoard.appendChild(createShipDiv("Cruiser", 2));
  ac.addEventListener("click", function () {
    acState = bsState = deState = sbState = crState = false;
    acState = true;
    toggleActive();
    ac.classList.add("active");
  });
  bs.addEventListener("click", function () {
    acState = bsState = deState = sbState = crState = false;
    bsState = true;
    toggleActive();
    bs.classList.add("active");
  });
  de.addEventListener("click", function () {
    acState = bsState = deState = sbState = crState = false;
    deState = true;
    toggleActive();
    de.classList.add("active");
  });
  sub.addEventListener("click", function () {
    acState = bsState = deState = sbState = crState = false;
    sbState = true;
    toggleActive();
    sub.classList.add("active");
  });
  cr.addEventListener("click", function () {
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
  var shipDirection = document.querySelector(".holder");
  shipDirection.textContent = "";
  computerTitle.textContent = "Computer Board";
}
function doYouWantToPlayAGame() {
  var question = document.createElement("h3");
  gamePlayDiv.appendChild(question);
  question.classList.add("start-title");
  question.textContent = "Start Game?";
  var startButton = document.createElement("button");
  gamePlayDiv.appendChild(startButton);
  startButton.classList.add("start-button");
  startButton.textContent = "Play";
  startButton.addEventListener("click", function () {
    gameStart = true;
    playerBoard.removeEventListener("mousemove", function (event) {
      mouseHover(event);
    }, false);
    playerBoard.removeEventListener("click", function (event) {
      boardSetupClick(event);
    });
    playerBoard.removeEventListener("mouseout", resetColors);
    makeComputerBoard();
    placeComputerShips();
  });
}
function computerBoardSquareFunction(event) {
  if (!event.target.classList.contains("already-played")) {
    var x = event.target.dataset.x;
    var y = event.target.dataset.y;
    var hit = _players__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.receiveAttack(x, y);
    event.target.classList.add("already-played");
    if (hit === 3) {
      event.target.classList.add("miss");
    } else if (hit === 1) {
      event.target.classList.add("hit");
    }
    if (!_players__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.anyShipsLeft()) {
      winHandler(true);
      return;
    }
    if (!_players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.anyShipsLeft()) {
      winHandler(false);
      return;
    }
    computerTurn();
  }
}
function winHandler(playerWin) {
  var space = document.querySelector(".game-space");
  space.textContent = "";
  var message = document.createElement("h2");
  message.classList.add("final-message");
  if (playerWin) {
    message.textContent = "You Win!    Would you like to play again?";
  } else {
    message.textContent = "You Lost!    Would you like to play again?";
  }
  var button = document.createElement("button");
  button.classList.add("play-again");
  button.textContent = "Play Again?";
  space.appendChild(message);
  space.appendChild(button);
  button.addEventListener("click", function () {
    location.reload();
  });
}
function computerTurn() {
  setTimeout(function () {
    computerShot();
  }, 500);
}
function computerShot() {
  while (true) {
    var x = randomIntFromInterval(0, 9);
    var y = randomIntFromInterval(0, 9);
    var thefocus = document.querySelector("div.square.home-square[data-x='".concat(x, "'][data-y='").concat(y, "']"));
    if (thefocus.classList.contains("already-played")) {
      continue;
    }
    var hit = _players__WEBPACK_IMPORTED_MODULE_0__.player.gameboard.receiveAttack(x, y);
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
  var ships = _players__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.shipList;
  for (var i = 0; i < 5; i++) {
    while (true) {
      var valid = true;
      var direction = randomIntFromInterval(1, 2);
      direction === 1 ? direction = true : direction = false;
      var x = randomIntFromInterval(0, 9);
      var y = randomIntFromInterval(0, 9);
      var shipName = ships[i].name;
      if (direction) {
        if (x + (ships[i].length - 1) > 9) {
          valid = false;
        } else {
          for (var j = 0; j < ships[i].length; j++) {
            if (_players__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.board[y][x + j] != 0) {
              valid = false;
            }
          }
        }
      }
      if (!direction) {
        if (y + (ships[i].length - 1) > 9) {
          valid = false;
        } else {
          for (var _j2 = 0; _j2 < ships[i].length; _j2++) {
            if (_players__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.board[y + _j2][x] != 0) {
              valid = false;
            }
          }
        }
      }
      if (!valid) {
        continue;
      }
      _players__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.placeShip(shipName, x, y, direction);
      break;
    }
  }
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");

function Gameboard() {
  var _this = this;
  // 0 = empty,  1 = already hit,  2 = miss,   name = ship
  this.board = [];
  this.shipList = [];

  // fill empty board to start game
  this.initializeBlankBoard = function () {
    for (var i = 1; i <= 10; i++) {
      var xrow = [];
      for (var j = 1; j <= 10; j++) {
        xrow.push(0);
      }
      _this.board.push(xrow);
    }
  };
  this.fillShipList = function () {
    _this.shipList.push(new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship('Destroyer', 3));
    _this.shipList.push(new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship('Battleship', 4));
    _this.shipList.push(new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship('Aircraft-Carrier', 5));
    _this.shipList.push(new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship('Submarine', 3));
    _this.shipList.push(new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship('Cruiser', 2));
  };
  this.initialize = function () {
    _this.initializeBlankBoard();
    _this.fillShipList();
  };
  this.initialize();
  this.placeShip = function (shipName, startx, starty) {
    var horizontal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var activeShip = _this.getShipObjFromName(shipName);
    for (var i = 0; i < activeShip.length; i++) {
      if (horizontal === true) {
        _this.board[starty][startx + i] = shipName;
      } else {
        _this.board[starty + i][startx] = shipName;
      }
    }
  };
  this.getShipObjFromName = function (shipName) {
    var activeShip;
    for (var i = 0; i < _this.shipList.length; i++) {
      if (shipName === _this.shipList[i].name) {
        activeShip = _this.shipList[i];
        return activeShip;
      }
    }
  };
  this.receiveAttack = function (x, y) {
    if (_this.board[y][x] === 0) {
      _this.board[y][x] = 3;
      return 3;
    } else if (_this.board[y][x] === 1 || _this.board[y][x] === 2) {
      console.log("double attack at ".concat(y, ", ").concat(x));
      throw console.error('Invalid Attack Bug. Should not be able to attack already attacked square');
    } else {
      var shipName = _this.board[y][x];
      var activeShip = _this.getShipObjFromName(shipName);
      _this.board[y][x] = 1;
      activeShip.hit();
      if (activeShip.isSunk()) {
        for (var i = 0; i < _this.shipList.length; i++) {
          if (shipName === _this.shipList[i].name) {
            _this.shipList.splice(i, 1);
          }
        }
      }
      return 1;
    }
  };
  this.anyShipsLeft = function () {
    if (_this.shipList.length > 0) {
      return true;
    } else {
      return false;
    }
  };
}


/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computer: () => (/* binding */ computer),
/* harmony export */   player: () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");

function Player() {
  this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
}
var player = new Player();
var computer = new Player();


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
function Ship(name, length) {
  var _this = this;
  this.length = length;
  this.hitTimes = 0;
  this.name = name;
  this.sunk = false;
  this.hit = function () {
    _this.hitTimes += 1;
  };
  this.isSunk = function () {
    if (_this.hitTimes >= _this.length) {
      _this.sunk = true;
    }
    return _this.sunk;
  };
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./font/spacec5i-webfont.woff2 */ "./src/font/spacec5i-webfont.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./font/spacec5i-webfont.woff */ "./src/font/spacec5i-webfont.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./font/spacec5e2-webfont.woff2 */ "./src/font/spacec5e2-webfont.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./font/spacec5e2-webfont.woff */ "./src/font/spacec5e2-webfont.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./font/spacec5c2-webfont.woff2 */ "./src/font/spacec5c2-webfont.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./font/spacec5c2-webfont.woff */ "./src/font/spacec5c2-webfont.woff"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

@font-face {
    font-family: 'space_cruiseritalic';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format('woff2'),
         url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format('woff');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'space_cruiser_expandeexpanded';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) format('woff2'),
         url(${___CSS_LOADER_URL_REPLACEMENT_3___}) format('woff');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'space_cruiser_condensedCn';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_4___}) format('woff2'),
         url(${___CSS_LOADER_URL_REPLACEMENT_5___}) format('woff');
    font-weight: normal;
    font-style: normal;

}

html {
    cursor: pointer
}

.main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0f2940;
}

.title {
    font-size: 4rem;
    font-family: 'space_cruiser_expandeexpanded', Helvetica, sans-serif;
    background-image: linear-gradient(#e34e50, #fdfc92, #fefffa);
    color: transparent;
    background-clip: text;
    padding: 1rem;
    margin: 2rem;
}

.game-space {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5vw;
    width: 100vw;
    min-height: 50vh;
}

.board-space {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.board-title {
    margin: 2rem;
    padding: .5rem;
    font-size: 2rem;
    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;
    color: white;
    border-bottom: 2px solid #fdfc92;
    z-index: 2;
}

.title-container {
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.empty, .holder{
    width : 6rem;
    font-size: 4rem;
    color: peru;
}

.holder {
    text-shadow: 0px 0px 4px black;
}

.holder:hover {
    text-shadow: 0px 0px 4px #fdfc92;
}

.players-board, .computers-board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    width: 500px;
    height: 500px
}

.square, .ship-square {
    height: 3rem;
    width: 3rem;
    border: 1px solid white;
    
    background: rgb(103,208,198);
    background: radial-gradient(circle, rgba(103,208,198,1) 0%, rgba(56,147,144,1) 100%);
}

.ship-square {
    background: grey;
}

.ship-set-up {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .75rem;
}

.ship-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .25rem;
    
}
.ship:hover {
    box-shadow: 0px 0px 8px #fdfc92;
}

.ship-name {
    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;
    color: white;
    font-size: 1.5rem;
}

.ship {
    display: flex;
}

.ship-selection, .ship-selected {
    background: grey;
}

.active > .ship > .ship-square {
    background-color: peru;
}

.active > .ship-name {
    color: peru;
}

.conflict {
    background-color: #e34e50;
}

.start-horizontal {
    box-shadow:
     inset  4px  0px  0px black,
     inset  0px  4px  0px black,
     inset  0px  -4px  0px black;
}


.mid-horizontal {
    box-shadow:
     inset  0   0  4px black,
     inset  0  -4px 0 black,
     inset  0   4px 0 black;
}

.end-horizontal {
    box-shadow:
     inset  -4px  0px  0px black,
     inset  0px  4px  0px black,
     inset  0px  -4px  0px black;
}

.start-vertical {
    box-shadow:
     inset  0px  4px  0px black,
     inset  4px  0px  0px black,
     inset  -4px  0px  0px black;
}


.mid-vertical {
    box-shadow:
     inset  0   0  0 black,
     inset  4px 0 0 black,
     inset  -4px 0 0 black;
}

.end-vertical {
    box-shadow:
     inset  0px  -4px  0px black,
     inset  4px  0px  0px black,
     inset  -4px  0px  0px black;
}

.play-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
}

.start-title {
    font-size: 2rem;
    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;
    color: white;
}

.start-button {
    padding: 1rem;
    color: peru;
    font-size: 1.5rem;
    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;
}

.start-button:hover {
    box-shadow: 0px 0px 6px peru;
}

.miss {
    background:white;
    background: radial-gradient(circle, white 0%, grey 100%);
}

.hit {
    background: red;
    background: radial-gradient(circle, red 0%, #e34e50 100%);
}

.play-again {
    padding: 2rem;
    color: peru;
    font-size: 2rem;
    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;
}

.final-message {
    margin: 2rem;
    padding: .5rem;
    font-size: 2rem;
    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;
    color: white;
}`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;;AAEA;IACI,kCAAkC;IAClC;+DACuD;IACvD,mBAAmB;IACnB,kBAAkB;;AAEtB;;AAEA;IACI,4CAA4C;IAC5C;+DACwD;IACxD,mBAAmB;IACnB,kBAAkB;;AAEtB;;AAEA;IACI,wCAAwC;IACxC;+DACwD;IACxD,mBAAmB;IACnB,kBAAkB;;AAEtB;;AAEA;IACI;AACJ;;AAEA;IACI,iBAAiB;IACjB,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,yBAAyB;AAC7B;;AAEA;IACI,eAAe;IACf,mEAAmE;IACnE,4DAA4D;IAC5D,kBAAkB;IAClB,qBAAqB;IACrB,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,QAAQ;IACR,YAAY;IACZ,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,cAAc;IACd,eAAe;IACf,+DAA+D;IAC/D,YAAY;IACZ,gCAAgC;IAChC,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,8BAA8B;AAClC;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,WAAW;AACf;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,aAAa;IACb,sCAAsC;IACtC,YAAY;IACZ;AACJ;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,uBAAuB;;IAEvB,4BAA4B;IAC5B,oFAAoF;AACxF;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;AACf;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,WAAW;;AAEf;AACA;IACI,+BAA+B;AACnC;;AAEA;IACI,+DAA+D;IAC/D,YAAY;IACZ,iBAAiB;AACrB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI;;;gCAG4B;AAChC;;;AAGA;IACI;;;2BAGuB;AAC3B;;AAEA;IACI;;;gCAG4B;AAChC;;AAEA;IACI;;;gCAG4B;AAChC;;;AAGA;IACI;;;0BAGsB;AAC1B;;AAEA;IACI;;;gCAG4B;AAChC;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;IACvB,WAAW;AACf;;AAEA;IACI,eAAe;IACf,+DAA+D;IAC/D,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,WAAW;IACX,iBAAiB;IACjB,+DAA+D;AACnE;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,gBAAgB;IAChB,wDAAwD;AAC5D;;AAEA;IACI,eAAe;IACf,yDAAyD;AAC7D;;AAEA;IACI,aAAa;IACb,WAAW;IACX,eAAe;IACf,+DAA+D;AACnE;;AAEA;IACI,YAAY;IACZ,cAAc;IACd,eAAe;IACf,+DAA+D;IAC/D,YAAY;AAChB","sourcesContent":["html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n\n@font-face {\n    font-family: 'space_cruiseritalic';\n    src: url('./font/spacec5i-webfont.woff2') format('woff2'),\n         url('./font/spacec5i-webfont.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n\n}\n\n@font-face {\n    font-family: 'space_cruiser_expandeexpanded';\n    src: url('./font/spacec5e2-webfont.woff2') format('woff2'),\n         url('./font/spacec5e2-webfont.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n\n}\n\n@font-face {\n    font-family: 'space_cruiser_condensedCn';\n    src: url('./font/spacec5c2-webfont.woff2') format('woff2'),\n         url('./font/spacec5c2-webfont.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n\n}\n\nhtml {\n    cursor: pointer\n}\n\n.main {\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: #0f2940;\n}\n\n.title {\n    font-size: 4rem;\n    font-family: 'space_cruiser_expandeexpanded', Helvetica, sans-serif;\n    background-image: linear-gradient(#e34e50, #fdfc92, #fefffa);\n    color: transparent;\n    background-clip: text;\n    padding: 1rem;\n    margin: 2rem;\n}\n\n.game-space {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5vw;\n    width: 100vw;\n    min-height: 50vh;\n}\n\n.board-space {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.board-title {\n    margin: 2rem;\n    padding: .5rem;\n    font-size: 2rem;\n    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;\n    color: white;\n    border-bottom: 2px solid #fdfc92;\n    z-index: 2;\n}\n\n.title-container {\n    width: 500px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.empty, .holder{\n    width : 6rem;\n    font-size: 4rem;\n    color: peru;\n}\n\n.holder {\n    text-shadow: 0px 0px 4px black;\n}\n\n.holder:hover {\n    text-shadow: 0px 0px 4px #fdfc92;\n}\n\n.players-board, .computers-board {\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    width: 500px;\n    height: 500px\n}\n\n.square, .ship-square {\n    height: 3rem;\n    width: 3rem;\n    border: 1px solid white;\n    \n    background: rgb(103,208,198);\n    background: radial-gradient(circle, rgba(103,208,198,1) 0%, rgba(56,147,144,1) 100%);\n}\n\n.ship-square {\n    background: grey;\n}\n\n.ship-set-up {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: .75rem;\n}\n\n.ship-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: .25rem;\n    \n}\n.ship:hover {\n    box-shadow: 0px 0px 8px #fdfc92;\n}\n\n.ship-name {\n    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;\n    color: white;\n    font-size: 1.5rem;\n}\n\n.ship {\n    display: flex;\n}\n\n.ship-selection, .ship-selected {\n    background: grey;\n}\n\n.active > .ship > .ship-square {\n    background-color: peru;\n}\n\n.active > .ship-name {\n    color: peru;\n}\n\n.conflict {\n    background-color: #e34e50;\n}\n\n.start-horizontal {\n    box-shadow:\n     inset  4px  0px  0px black,\n     inset  0px  4px  0px black,\n     inset  0px  -4px  0px black;\n}\n\n\n.mid-horizontal {\n    box-shadow:\n     inset  0   0  4px black,\n     inset  0  -4px 0 black,\n     inset  0   4px 0 black;\n}\n\n.end-horizontal {\n    box-shadow:\n     inset  -4px  0px  0px black,\n     inset  0px  4px  0px black,\n     inset  0px  -4px  0px black;\n}\n\n.start-vertical {\n    box-shadow:\n     inset  0px  4px  0px black,\n     inset  4px  0px  0px black,\n     inset  -4px  0px  0px black;\n}\n\n\n.mid-vertical {\n    box-shadow:\n     inset  0   0  0 black,\n     inset  4px 0 0 black,\n     inset  -4px 0 0 black;\n}\n\n.end-vertical {\n    box-shadow:\n     inset  0px  -4px  0px black,\n     inset  4px  0px  0px black,\n     inset  -4px  0px  0px black;\n}\n\n.play-game {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 1.5rem;\n}\n\n.start-title {\n    font-size: 2rem;\n    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;\n    color: white;\n}\n\n.start-button {\n    padding: 1rem;\n    color: peru;\n    font-size: 1.5rem;\n    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;\n}\n\n.start-button:hover {\n    box-shadow: 0px 0px 6px peru;\n}\n\n.miss {\n    background:white;\n    background: radial-gradient(circle, white 0%, grey 100%);\n}\n\n.hit {\n    background: red;\n    background: radial-gradient(circle, red 0%, #e34e50 100%);\n}\n\n.play-again {\n    padding: 2rem;\n    color: peru;\n    font-size: 2rem;\n    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;\n}\n\n.final-message {\n    margin: 2rem;\n    padding: .5rem;\n    font-size: 2rem;\n    font-family: 'space_cruiser_condensedCn', Helvetica, sans-serif;\n    color: white;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/font/spacec5c2-webfont.woff":
/*!*****************************************!*\
  !*** ./src/font/spacec5c2-webfont.woff ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "713a6f1100952bff2037.woff";

/***/ }),

/***/ "./src/font/spacec5c2-webfont.woff2":
/*!******************************************!*\
  !*** ./src/font/spacec5c2-webfont.woff2 ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b81dc368bd849b7df650.woff2";

/***/ }),

/***/ "./src/font/spacec5e2-webfont.woff":
/*!*****************************************!*\
  !*** ./src/font/spacec5e2-webfont.woff ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "50793d4ac3ef4b895eaa.woff";

/***/ }),

/***/ "./src/font/spacec5e2-webfont.woff2":
/*!******************************************!*\
  !*** ./src/font/spacec5e2-webfont.woff2 ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d9d41dad78c0daf67792.woff2";

/***/ }),

/***/ "./src/font/spacec5i-webfont.woff":
/*!****************************************!*\
  !*** ./src/font/spacec5i-webfont.woff ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c1d1d5dfb5863654eeca.woff";

/***/ }),

/***/ "./src/font/spacec5i-webfont.woff2":
/*!*****************************************!*\
  !*** ./src/font/spacec5i-webfont.woff2 ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8ee4c40f834be169a1c6.woff2";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _DOMcontrol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMcontrol */ "./src/DOMcontrol.js");



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQsZUFBZSxtQ0FBbUM7QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQsZUFBZSxtQ0FBbUM7QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQsZUFBZSxtQ0FBbUM7QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sNkZBQTZGLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE1BQU0sT0FBTyxhQUFhLGNBQWMsT0FBTyxLQUFLLFlBQVksTUFBTSxPQUFPLGFBQWEsY0FBYyxPQUFPLEtBQUssWUFBWSxNQUFNLE9BQU8sYUFBYSxjQUFjLE9BQU8sS0FBSyxLQUFLLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVks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V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ2MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbmxldCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVycy1ib2FyZFwiKTtcbmxldCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlcnMtYm9hcmRcIik7XG5sZXQgY29tcHV0ZXJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXItdGl0bGVcIik7XG5sZXQgZ2FtZVBsYXlEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXktZ2FtZVwiKTtcblxubGV0IGFjU3RhdGUgPSBmYWxzZTtcbmxldCBic1N0YXRlID0gZmFsc2U7XG5sZXQgZGVTdGF0ZSA9IGZhbHNlO1xubGV0IHNiU3RhdGUgPSBmYWxzZTtcbmxldCBjclN0YXRlID0gZmFsc2U7XG5sZXQgaG9yaXpvbnRhbCA9IHRydWU7XG5sZXQgc2hpcHNQbGFjZWQgPSAwO1xubGV0IGdhbWVTdGFydCA9IGZhbHNlO1xubGV0IGxhc3RBdHRhY2sgXG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkU3F1YXJlcyhib2FyZCwgcGxheWVyQiA9IHRydWUpIHtcbiAgaWYgKHBsYXllckIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGxheWVyLmdhbWVib2FyZC5ib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaG9tZS1zcXVhcmVcIik7XG4gICAgICAgIHNxdWFyZS5kYXRhc2V0LnggPSBqO1xuICAgICAgICBzcXVhcmUuZGF0YXNldC55ID0gaTtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFnYW1lU3RhcnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgYWNTdGF0ZSA9PSBmYWxzZSAmJlxuICAgICAgICAgICAgICBic1N0YXRlID09IGZhbHNlICYmXG4gICAgICAgICAgICAgIGRlU3RhdGUgPT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgc2JTdGF0ZSA9PSBmYWxzZSAmJlxuICAgICAgICAgICAgICBjclN0YXRlID09IGZhbHNlICYmXG4gICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwLXNlbGVjdGVkXCIpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgZWRpdFNoaXBQbGFjZW1lbnQoc3F1YXJlLmRhdGFzZXQubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wdXRlci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGxldCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInBsYXktc3F1YXJlXCIpO1xuICAgICAgICBzcXVhcmUuZGF0YXNldC54ID0gajtcbiAgICAgICAgc3F1YXJlLmRhdGFzZXQueSA9IGk7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29tcHV0ZXJCb2FyZFNxdWFyZUZ1bmN0aW9uKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0Q29sb3JzKCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS14PScke2l9J11bZGF0YS15PScke2p9J11gKTtcbiAgICAgIGlmIChhY3RpdmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcC1zZWxlY3Rpb25cIikpIHtcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwLXNlbGVjdGlvblwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3RpdmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29uZmxpY3RcIikpIHtcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJjb25mbGljdFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hpcEhvdmVyKHNoaXBMZW5ndGgsIGV2ZW50KSB7XG4gIGlmIChob3Jpem9udGFsKSB7XG4gICAgbGV0IHggPSBldmVudC50YXJnZXQuZGF0YXNldC54O1xuICAgIGxldCB4SW50ID0gKHggPSBwYXJzZUludCh4KSk7XG4gICAgaWYgKHhJbnQgKyAoc2hpcExlbmd0aCAtIDEpID4gOSkge1xuICAgICAgeEludCA9IDkgLSAoc2hpcExlbmd0aCAtIDEpO1xuICAgICAgeCA9IFN0cmluZyh4SW50KTtcbiAgICB9XG4gICAgbGV0IHkgPSBldmVudC50YXJnZXQuZGF0YXNldC55O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYCk7XG4gICAgICBpZiAoYWN0aXZlLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXAtc2VsZWN0ZWRcIikpIHtcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoXCJjb25mbGljdFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwic2hpcC1zZWxlY3Rpb25cIik7XG4gICAgICB9XG4gICAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgICB4ICs9IDE7XG4gICAgICB4ID0gU3RyaW5nKHgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgeSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgbGV0IHlJbnQgPSAoeSA9IHBhcnNlSW50KHkpKTtcbiAgICBpZiAoeUludCArIChzaGlwTGVuZ3RoIC0gMSkgPiA5KSB7XG4gICAgICB5SW50ID0gOSAtIChzaGlwTGVuZ3RoIC0gMSk7XG4gICAgICB5ID0gU3RyaW5nKHlJbnQpO1xuICAgIH1cbiAgICBsZXQgeCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lng7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBkaXZbZGF0YS14PScke3h9J11bZGF0YS15PScke3l9J11gKTtcbiAgICAgIGlmIChhY3RpdmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcC1zZWxlY3RlZFwiKSkge1xuICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LmFkZChcImNvbmZsaWN0XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNlbGVjdGlvblwiKTtcbiAgICAgIH1cbiAgICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICAgIHkgKz0gMTtcbiAgICAgIHkgPSBTdHJpbmcoeSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsYWNlbWVudFZhbGlkYXRvcihzaGlwTGVuZ3RoLCBldmVudCkge1xuICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgaWYgKGhvcml6b250YWwpIHtcbiAgICBsZXQgeCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lng7XG4gICAgbGV0IHhJbnQgPSBwYXJzZUludCh4KTtcbiAgICBpZiAoeEludCArIChzaGlwTGVuZ3RoIC0gMSkgPiA5KSB7XG4gICAgICB4SW50ID0gOSAtIChzaGlwTGVuZ3RoIC0gMSk7XG4gICAgICB4ID0gU3RyaW5nKHhJbnQpO1xuICAgIH1cbiAgICBsZXQgeSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eX0nXWApO1xuICAgICAgaWYgKGFjdGl2ZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwLXNlbGVjdGVkXCIpKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgeCA9IHBhcnNlSW50KHgpO1xuICAgICAgeCArPSAxO1xuICAgICAgeCA9IFN0cmluZyh4KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IHkgPSBldmVudC50YXJnZXQuZGF0YXNldC55O1xuICAgIGxldCB5SW50ID0gKHkgPSBwYXJzZUludCh5KSk7XG4gICAgaWYgKHlJbnQgKyAoc2hpcExlbmd0aCAtIDEpID4gOSkge1xuICAgICAgeUludCA9IDkgLSAoc2hpcExlbmd0aCAtIDEpO1xuICAgICAgeSA9IFN0cmluZyh5SW50KTtcbiAgICB9XG4gICAgbGV0IHggPSBldmVudC50YXJnZXQuZGF0YXNldC54O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZGl2W2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYCk7XG4gICAgICBpZiAoYWN0aXZlLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXAtc2VsZWN0ZWRcIikpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB5ID0gcGFyc2VJbnQoeSk7XG4gICAgICB5ICs9IDE7XG4gICAgICB5ID0gU3RyaW5nKHkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBzaGlwUGxhY2Uoc2hpcE5hbWUsIHNoaXBMZW5ndGgsIGV2ZW50KSB7XG4gIGlmIChob3Jpem9udGFsKSB7XG4gICAgbGV0IHggPSBldmVudC50YXJnZXQuZGF0YXNldC54O1xuICAgIGxldCB4SW50ID0gKHggPSBwYXJzZUludCh4KSk7XG4gICAgaWYgKHhJbnQgKyAoc2hpcExlbmd0aCAtIDEpID4gOSkge1xuICAgICAgeEludCA9IDkgLSAoc2hpcExlbmd0aCAtIDEpO1xuICAgICAgeCA9IFN0cmluZyh4SW50KTtcbiAgICB9XG4gICAgbGV0IHkgPSBldmVudC50YXJnZXQuZGF0YXNldC55O1xuICAgIGxldCB5SW50ID0gcGFyc2VJbnQoeSk7XG5cbiAgICBpZiAocGxhY2VtZW50VmFsaWRhdG9yKHNoaXBMZW5ndGgsIGV2ZW50KSkge1xuICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcE5hbWUsIHhJbnQsIHlJbnQsIGhvcml6b250YWwpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYGRpdltkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eX0nXWBcbiAgICAgICAgKTtcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXNlbGVjdGVkXCIpO1xuICAgICAgICBhY3RpdmUuZGF0YXNldC5uYW1lID0gc2hpcE5hbWU7XG4gICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LmFkZChcInN0YXJ0LWhvcml6b250YWxcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PSBzaGlwTGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwiZW5kLWhvcml6b250YWxcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoXCJtaWQtaG9yaXpvbnRhbFwiKTtcbiAgICAgICAgfVxuICAgICAgICB4ID0gcGFyc2VJbnQoeCk7XG4gICAgICAgIHggKz0gMTtcbiAgICAgICAgeCA9IFN0cmluZyh4KTtcbiAgICAgIH1cbiAgICAgIGxldCBzaGlwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY3RpdmVcIik7XG4gICAgICBzaGlwQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIGFjU3RhdGUgPSBic1N0YXRlID0gZGVTdGF0ZSA9IHNiU3RhdGUgPSBjclN0YXRlID0gZmFsc2U7XG4gICAgICBzaGlwc1BsYWNlZCArPSAxO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgeSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgbGV0IHlJbnQgPSAoeSA9IHBhcnNlSW50KHkpKTtcbiAgICBpZiAoeUludCArIChzaGlwTGVuZ3RoIC0gMSkgPiA5KSB7XG4gICAgICB5SW50ID0gOSAtIChzaGlwTGVuZ3RoIC0gMSk7XG4gICAgICB5ID0gU3RyaW5nKHlJbnQpO1xuICAgIH1cbiAgICBsZXQgeCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lng7XG4gICAgbGV0IHhJbnQgPSBwYXJzZUludCh4KTtcblxuICAgIGlmIChwbGFjZW1lbnRWYWxpZGF0b3Ioc2hpcExlbmd0aCwgZXZlbnQpKSB7XG4gICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwTmFtZSwgeEludCwgeUludCwgaG9yaXpvbnRhbCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgZGl2W2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5fSddYFxuICAgICAgICApO1xuICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LmFkZChcInNoaXAtc2VsZWN0ZWRcIik7XG4gICAgICAgIGFjdGl2ZS5kYXRhc2V0Lm5hbWUgPSBzaGlwTmFtZTtcbiAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwic3RhcnQtdmVydGljYWxcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PSBzaGlwTGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwiZW5kLXZlcnRpY2FsXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwibWlkLXZlcnRpY2FsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHkgPSBwYXJzZUludCh5KTtcbiAgICAgICAgeSArPSAxO1xuICAgICAgICB5ID0gU3RyaW5nKHkpO1xuICAgICAgfVxuICAgICAgbGV0IHNoaXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2ZVwiKTtcbiAgICAgIHNoaXBDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgYWNTdGF0ZSA9IGJzU3RhdGUgPSBkZVN0YXRlID0gc2JTdGF0ZSA9IGNyU3RhdGUgPSBmYWxzZTtcbiAgICAgIHNoaXBzUGxhY2VkICs9IDE7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNoaXBzUGxhY2VkID09PSA1KSB7XG4gICAgZG9Zb3VXYW50VG9QbGF5QUdhbWUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldFNoaXAoc2hpcE5hbWUpIHtcbiAgbGV0IGxlbmd0aCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyLmdhbWVib2FyZC5ib2FyZC5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGxheWVyLmdhbWVib2FyZC5ib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGRpdltkYXRhLXg9JyR7aX0nXVtkYXRhLXk9JyR7an0nXWApO1xuICAgICAgaWYgKGFjdGl2ZS5kYXRhc2V0Lm5hbWUgPT0gc2hpcE5hbWUpIHtcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwLXNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwic3RhcnQtdmVydGljYWxcIik7XG4gICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kLXZlcnRpY2FsXCIpO1xuICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcIm1pZC12ZXJ0aWNhbFwiKTtcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJzdGFydC1ob3Jpem9udGFsXCIpO1xuICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImVuZC1ob3Jpem9udGFsXCIpO1xuICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcIm1pZC1ob3Jpem9udGFsXCIpO1xuICAgICAgICBhY3RpdmUuZGF0YXNldC5uYW1lID0gXCJcIjtcbiAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxlbmd0aDtcbn1cblxuZnVuY3Rpb24gZWRpdFNoaXBQbGFjZW1lbnQoc2hpcE5hbWUpIHtcbiAgbGV0IGxlbmd0aCA9IHJlc2V0U2hpcChzaGlwTmFtZSk7XG4gIGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2ZVwiKTtcbiAgaWYgKGFjdGl2ZSkge1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9XG4gIGxldCBmb2N1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3NoaXBOYW1lfWApO1xuXG4gIHBsYWNlU2hpcChzaGlwTmFtZSwgbGVuZ3RoLCBmb2N1cyk7XG4gIGlmIChzaGlwc1BsYWNlZCA9PT0gNSkge1xuICAgIGdhbWVQbGF5RGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuICBzaGlwc1BsYWNlZCAtPSAxO1xufVxuXG5mdW5jdGlvbiBzZXRIb3ZlcihldmVudCkge1xuICBpZiAoYWNTdGF0ZSkge1xuICAgIHNoaXBIb3Zlcig1LCBldmVudCk7XG4gIH0gZWxzZSBpZiAoYnNTdGF0ZSkge1xuICAgIHNoaXBIb3Zlcig0LCBldmVudCk7XG4gIH0gZWxzZSBpZiAoZGVTdGF0ZSkge1xuICAgIHNoaXBIb3ZlcigzLCBldmVudCk7XG4gIH0gZWxzZSBpZiAoc2JTdGF0ZSkge1xuICAgIHNoaXBIb3ZlcigzLCBldmVudCk7XG4gIH0gZWxzZSBpZiAoY3JTdGF0ZSkge1xuICAgIHNoaXBIb3ZlcigyLCBldmVudCk7XG4gIH1cbn1cbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGV2ZW50KSA9PiB7XG4gIG1vdXNlSG92ZXIoZXZlbnQpO1xufSk7XG5cbmZ1bmN0aW9uIG1vdXNlSG92ZXIoZXZlbnQpIHtcbiAgcmVzZXRDb2xvcnMoKTtcbiAgc2V0SG92ZXIoZXZlbnQpO1xufVxuXG5mdW5jdGlvbiBib2FyZFNldHVwQ2xpY2soZXZlbnQpIHtcbiAgcmVzZXRDb2xvcnMoKTtcblxuICBpZiAoYWNTdGF0ZSkge1xuICAgIHNoaXBQbGFjZShcIkFpcmNyYWZ0LUNhcnJpZXJcIiwgNSwgZXZlbnQpO1xuICB9IGVsc2UgaWYgKGJzU3RhdGUpIHtcbiAgICBzaGlwUGxhY2UoXCJCYXR0bGVzaGlwXCIsIDQsIGV2ZW50KTtcbiAgfSBlbHNlIGlmIChkZVN0YXRlKSB7XG4gICAgc2hpcFBsYWNlKFwiRGVzdHJveWVyXCIsIDMsIGV2ZW50KTtcbiAgfSBlbHNlIGlmIChzYlN0YXRlKSB7XG4gICAgc2hpcFBsYWNlKFwiU3VibWFyaW5lXCIsIDMsIGV2ZW50KTtcbiAgfSBlbHNlIGlmIChjclN0YXRlKSB7XG4gICAgc2hpcFBsYWNlKFwiQ3J1aXNlclwiLCAyLCBldmVudCk7XG4gIH1cbn1cblxucGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICBib2FyZFNldHVwQ2xpY2soZXZlbnQpO1xufSk7XG5cbnBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCByZXNldENvbG9ycyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXAobGVuZ3RoKSB7XG4gIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXAtc3F1YXJlXCIpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG4gIHJldHVybiBkaXY7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBEaXYoc2hpcE5hbWUsIGxlbmd0aCkge1xuICBsZXQgc2hpcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXBDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNoaXAtY29udGFpbmVyXCIpO1xuICBzaGlwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUpO1xuICByZXR1cm4gY3JlYXRlU2hpcERpdkNvbnRlbnQoc2hpcE5hbWUsIGxlbmd0aCwgc2hpcENvbnRhaW5lcik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBEaXZDb250ZW50KHNoaXBOYW1lLCBsZW5ndGgsIHNoaXBDb250YWluZXIpIHtcbiAgbGV0IHNoaXBUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgc2hpcFRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW5hbWVcIik7XG4gIHNoaXBUaXRsZS50ZXh0Q29udGVudCA9IHNoaXBOYW1lO1xuXG4gIHNoaXBDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcFRpdGxlKTtcbiAgc2hpcENvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVTaGlwKGxlbmd0aCkpO1xuXG4gIHJldHVybiBzaGlwQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXAoc2hpcE5hbWUsIGxlbmd0aCwgc2hpcENvbnRhaW5lcikge1xuICBsZXQgc2hpcEQgPSBjcmVhdGVTaGlwRGl2Q29udGVudChzaGlwTmFtZSwgbGVuZ3RoLCBzaGlwQ29udGFpbmVyKTtcbiAgc2hpcEQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBhY1N0YXRlID0gYnNTdGF0ZSA9IGRlU3RhdGUgPSBzYlN0YXRlID0gY3JTdGF0ZSA9IGZhbHNlO1xuICAgIGlmIChzaGlwTmFtZSA9PSBcIkRlc3Ryb3llclwiKSB7XG4gICAgICBkZVN0YXRlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNoaXBOYW1lID09IFwiQmF0dGxlc2hpcFwiKSB7XG4gICAgICBic1N0YXRlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNoaXBOYW1lID09IFwiQWlyY3JhZnQtQ2FycmllclwiKSB7XG4gICAgICBhY1N0YXRlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNoaXBOYW1lID09IFwiU3VibWFyaW5lXCIpIHtcbiAgICAgIHNiU3RhdGUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoc2hpcE5hbWUgPT0gXCJDcnVpc2VyXCIpIHtcbiAgICAgIGNyU3RhdGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHRvZ2dsZUFjdGl2ZSgpO1xuICAgIHNoaXBELmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH0pO1xuICByZXR1cm4gc2hpcEQ7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZSgpIHtcbiAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWN0aXZlXCIpO1xuXG4gIGlmIChhY3RpdmUgIT0gbnVsbCkge1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcHMoKSB7XG4gIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LmFkZChcInNoaXAtc2V0LXVwXCIpO1xuICBjb21wdXRlclRpdGxlLnRleHRDb250ZW50ID0gXCJQbGFjZSBTaGlwc1wiO1xuICBsZXQgc2hpcERpcmVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9sZGVyXCIpO1xuICBzaGlwRGlyZWN0aW9uLnRleHRDb250ZW50ID0gXCLinqFcIjtcbiAgc2hpcERpcmVjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICBzaGlwRGlyZWN0aW9uLnRleHRDb250ZW50ID0gXCLirIZcIjtcbiAgICAgIGhvcml6b250YWwgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hpcERpcmVjdGlvbi50ZXh0Q29udGVudCA9IFwi4p6hXCI7XG4gICAgICBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBsZXQgYWMgPSBjb21wdXRlckJvYXJkLmFwcGVuZENoaWxkKGNyZWF0ZVNoaXBEaXYoXCJBaXJjcmFmdC1DYXJyaWVyXCIsIDUpKTtcbiAgbGV0IGJzID0gY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjcmVhdGVTaGlwRGl2KFwiQmF0dGxlc2hpcFwiLCA0KSk7XG4gIGxldCBkZSA9IGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY3JlYXRlU2hpcERpdihcIkRlc3Ryb3llclwiLCAzKSk7XG4gIGxldCBzdWIgPSBjb21wdXRlckJvYXJkLmFwcGVuZENoaWxkKGNyZWF0ZVNoaXBEaXYoXCJTdWJtYXJpbmVcIiwgMykpO1xuICBsZXQgY3IgPSBjb21wdXRlckJvYXJkLmFwcGVuZENoaWxkKGNyZWF0ZVNoaXBEaXYoXCJDcnVpc2VyXCIsIDIpKTtcblxuICBhYy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGFjU3RhdGUgPSBic1N0YXRlID0gZGVTdGF0ZSA9IHNiU3RhdGUgPSBjclN0YXRlID0gZmFsc2U7XG4gICAgYWNTdGF0ZSA9IHRydWU7XG4gICAgdG9nZ2xlQWN0aXZlKCk7XG4gICAgYWMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfSk7XG4gIGJzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgYWNTdGF0ZSA9IGJzU3RhdGUgPSBkZVN0YXRlID0gc2JTdGF0ZSA9IGNyU3RhdGUgPSBmYWxzZTtcbiAgICBic1N0YXRlID0gdHJ1ZTtcbiAgICB0b2dnbGVBY3RpdmUoKTtcbiAgICBicy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9KTtcbiAgZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBhY1N0YXRlID0gYnNTdGF0ZSA9IGRlU3RhdGUgPSBzYlN0YXRlID0gY3JTdGF0ZSA9IGZhbHNlO1xuICAgIGRlU3RhdGUgPSB0cnVlO1xuICAgIHRvZ2dsZUFjdGl2ZSgpO1xuICAgIGRlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH0pO1xuICBzdWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBhY1N0YXRlID0gYnNTdGF0ZSA9IGRlU3RhdGUgPSBzYlN0YXRlID0gY3JTdGF0ZSA9IGZhbHNlO1xuICAgIHNiU3RhdGUgPSB0cnVlO1xuICAgIHRvZ2dsZUFjdGl2ZSgpO1xuICAgIHN1Yi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9KTtcbiAgY3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBhY1N0YXRlID0gYnNTdGF0ZSA9IGRlU3RhdGUgPSBzYlN0YXRlID0gY3JTdGF0ZSA9IGZhbHNlO1xuICAgIGNyU3RhdGUgPSB0cnVlO1xuICAgIHRvZ2dsZUFjdGl2ZSgpO1xuICAgIGNyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYWtlQ29tcHV0ZXJCb2FyZCgpIHtcbiAgY29tcHV0ZXJCb2FyZC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGNvbXB1dGVyQm9hcmQuY2xhc3NMaXN0LnJlbW92ZShcInNoaXAtc2V0LXVwXCIpO1xuICBjcmVhdGVCb2FyZFNxdWFyZXMoY29tcHV0ZXJCb2FyZCwgZmFsc2UpO1xuICBsZXQgc2hpcERpcmVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9sZGVyXCIpO1xuICBzaGlwRGlyZWN0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcbiAgY29tcHV0ZXJUaXRsZS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXIgQm9hcmRcIjtcbn1cblxuZnVuY3Rpb24gZG9Zb3VXYW50VG9QbGF5QUdhbWUoKSB7XG4gIGxldCBxdWVzdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgZ2FtZVBsYXlEaXYuYXBwZW5kQ2hpbGQocXVlc3Rpb24pO1xuICBxdWVzdGlvbi5jbGFzc0xpc3QuYWRkKFwic3RhcnQtdGl0bGVcIik7XG4gIHF1ZXN0aW9uLnRleHRDb250ZW50ID0gXCJTdGFydCBHYW1lP1wiO1xuICBsZXQgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBnYW1lUGxheURpdi5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XG4gIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1idXR0b25cIik7XG4gIHN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5XCI7XG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZ2FtZVN0YXJ0ID0gdHJ1ZTtcbiAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgXCJtb3VzZW1vdmVcIixcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBtb3VzZUhvdmVyKGV2ZW50KTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG4gICAgcGxheWVyQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgYm9hcmRTZXR1cENsaWNrKGV2ZW50KTtcbiAgICB9KTtcbiAgICBwbGF5ZXJCb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcmVzZXRDb2xvcnMpO1xuICAgIG1ha2VDb21wdXRlckJvYXJkKCk7XG4gICAgcGxhY2VDb21wdXRlclNoaXBzKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlckJvYXJkU3F1YXJlRnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKCFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWxyZWFkeS1wbGF5ZWRcIikpIHtcbiAgICBsZXQgeCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnhcbiAgICBsZXQgeSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnlcbiAgICBsZXQgaGl0ID0gY29tcHV0ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCx5KVxuXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhbHJlYWR5LXBsYXllZFwiKTtcblxuICAgIGlmIChoaXQgPT09IDMpIHtcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICB9IGVsc2UgaWYgKGhpdCA9PT0gMSkge1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICB9XG4gICAgaWYgKCFjb21wdXRlci5nYW1lYm9hcmQuYW55U2hpcHNMZWZ0KCkpIHtcbiAgICAgIHdpbkhhbmRsZXIodHJ1ZSk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFwbGF5ZXIuZ2FtZWJvYXJkLmFueVNoaXBzTGVmdCgpKSB7XG4gICAgICB3aW5IYW5kbGVyKGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2luSGFuZGxlcihwbGF5ZXJXaW4pIHtcbiAgbGV0IHNwYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXNwYWNlXCIpO1xuICBzcGFjZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGxldCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJmaW5hbC1tZXNzYWdlXCIpO1xuICBpZiAocGxheWVyV2luKSB7XG4gICAgbWVzc2FnZS50ZXh0Q29udGVudCA9IFwiWW91IFdpbiEgICAgV291bGQgeW91IGxpa2UgdG8gcGxheSBhZ2Fpbj9cIjtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gXCJZb3UgTG9zdCEgICAgV291bGQgeW91IGxpa2UgdG8gcGxheSBhZ2Fpbj9cIjtcbiAgfVxuICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwbGF5LWFnYWluXCIpO1xuICBidXR0b24udGV4dENvbnRlbnQgPSBcIlBsYXkgQWdhaW4/XCI7XG4gIHNwYWNlLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuICBzcGFjZS5hcHBlbmRDaGlsZChidXR0b24pO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVyVHVybigpIHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29tcHV0ZXJTaG90KCk7XG4gIH0sIDUwMCk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVyU2hvdCgpIHtcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIFxuICAgIGxldCB4ID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgIGxldCB5ID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgIGxldCB0aGVmb2N1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgZGl2LnNxdWFyZS5ob21lLXNxdWFyZVtkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eX0nXWBcbiAgICApO1xuICAgIGlmKHRoZWZvY3VzLmNsYXNzTGlzdC5jb250YWlucyhcImFscmVhZHktcGxheWVkXCIpKXtjb250aW51ZX1cbiAgICBsZXQgaGl0ID0gcGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIGlmIChoaXQgPT09IDMpIHtcbiAgICAgIHRoZWZvY3VzLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgIH0gZWxzZSBpZiAoaGl0ID09PSAxKSB7XG4gICAgICB0aGVmb2N1cy5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgIH1cbiAgICB0aGVmb2N1cy5jbGFzc0xpc3QuYWRkKFwiYWxyZWFkeS1wbGF5ZWRcIik7XG4gICAgYnJlYWs7XG4gIH1cbn1cblxuY3JlYXRlQm9hcmRTcXVhcmVzKHBsYXllckJvYXJkKTtcbnBsYWNlU2hpcHMoKTtcblxuZnVuY3Rpb24gcGxhY2VDb21wdXRlclNoaXBzKCkge1xuICBsZXQgc2hpcHMgPSBjb21wdXRlci5nYW1lYm9hcmQuc2hpcExpc3Q7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICBsZXQgZGlyZWN0aW9uID0gcmFuZG9tSW50RnJvbUludGVydmFsKDEsIDIpO1xuICAgICAgZGlyZWN0aW9uID09PSAxID8gKGRpcmVjdGlvbiA9IHRydWUpIDogKGRpcmVjdGlvbiA9IGZhbHNlKTtcbiAgICAgIGxldCB4ID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgbGV0IHkgPSByYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG5cbiAgICAgIGxldCBzaGlwTmFtZSA9IHNoaXBzW2ldLm5hbWU7XG5cbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKHggKyAoc2hpcHNbaV0ubGVuZ3RoIC0gMSkgPiA5KSB7XG4gICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW3ldW3ggKyBqXSAhPSAwKSB7XG4gICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWRpcmVjdGlvbikge1xuICAgICAgICBpZiAoeSArIChzaGlwc1tpXS5sZW5ndGggLSAxKSA+IDkpIHtcbiAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChjb21wdXRlci5nYW1lYm9hcmQuYm9hcmRbeSArIGpdW3hdICE9IDApIHtcbiAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcE5hbWUsIHgsIHksIGRpcmVjdGlvbik7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByYW5kb21JbnRGcm9tSW50ZXJ2YWwobWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gICAgLy8gMCA9IGVtcHR5LCAgMSA9IGFscmVhZHkgaGl0LCAgMiA9IG1pc3MsICAgbmFtZSA9IHNoaXBcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5zaGlwTGlzdCA9IFtdXG5cbiAgICAvLyBmaWxsIGVtcHR5IGJvYXJkIHRvIHN0YXJ0IGdhbWVcbiAgICB0aGlzLmluaXRpYWxpemVCbGFua0JvYXJkID0gKCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeHJvdyA9IFtdIFxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPD0gMTA7IGorKykge1xuICAgICAgICAgICAgICAgIHhyb3cucHVzaCgwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ib2FyZC5wdXNoKHhyb3cpXG4gICAgfX1cblxuICAgIHRoaXMuZmlsbFNoaXBMaXN0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNoaXBMaXN0LnB1c2gobmV3IFNoaXAoJ0Rlc3Ryb3llcicsIDMpKVxuICAgICAgICB0aGlzLnNoaXBMaXN0LnB1c2gobmV3IFNoaXAoJ0JhdHRsZXNoaXAnLCA0KSlcbiAgICAgICAgdGhpcy5zaGlwTGlzdC5wdXNoKG5ldyBTaGlwKCdBaXJjcmFmdC1DYXJyaWVyJywgNSkpXG4gICAgICAgIHRoaXMuc2hpcExpc3QucHVzaChuZXcgU2hpcCgnU3VibWFyaW5lJywgMykpXG4gICAgICAgIHRoaXMuc2hpcExpc3QucHVzaChuZXcgU2hpcCgnQ3J1aXNlcicsIDIpKVxuXG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVCbGFua0JvYXJkKClcbiAgICAgICAgdGhpcy5maWxsU2hpcExpc3QoKVxuICAgIH1cbiAgICBcbiAgICB0aGlzLmluaXRpYWxpemUoKVxuXG5cblxuXG5cblxuICAgIHRoaXMucGxhY2VTaGlwID0gKHNoaXBOYW1lLCBzdGFydHgsIHN0YXJ0eSwgaG9yaXpvbnRhbCA9IHRydWUpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGxldCBhY3RpdmVTaGlwID0gdGhpcy5nZXRTaGlwT2JqRnJvbU5hbWUoc2hpcE5hbWUpXG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYWN0aXZlU2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0eV1bc3RhcnR4ICsgaV0gPSBzaGlwTmFtZVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtzdGFydHkgKyBpXVtzdGFydHhdID0gc2hpcE5hbWVcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICB0aGlzLmdldFNoaXBPYmpGcm9tTmFtZSA9IChzaGlwTmFtZSkgPT4ge1xuICAgICAgICBsZXQgYWN0aXZlU2hpcFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzaGlwTmFtZSA9PT0gdGhpcy5zaGlwTGlzdFtpXS5uYW1lKXtcbiAgICAgICAgICAgICAgICBhY3RpdmVTaGlwID0gdGhpcy5zaGlwTGlzdFtpXVxuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmVTaGlwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt5XVt4XSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt5XVt4XSA9IDNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIDNcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmJvYXJkW3ldW3hdID09PSAxIHx8IHRoaXMuYm9hcmRbeV1beF0gPT09IDIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBkb3VibGUgYXR0YWNrIGF0ICR7eX0sICR7eH1gKVxuICAgICAgICAgICAgdGhyb3cgY29uc29sZS5lcnJvcignSW52YWxpZCBBdHRhY2sgQnVnLiBTaG91bGQgbm90IGJlIGFibGUgdG8gYXR0YWNrIGFscmVhZHkgYXR0YWNrZWQgc3F1YXJlJyk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzaGlwTmFtZSA9IHRoaXMuYm9hcmRbeV1beF1cbiAgICAgICAgICAgIGxldCBhY3RpdmVTaGlwID0gdGhpcy5nZXRTaGlwT2JqRnJvbU5hbWUoc2hpcE5hbWUpXG4gICAgICAgICAgICB0aGlzLmJvYXJkW3ldW3hdID0gMVxuICAgICAgICAgICAgYWN0aXZlU2hpcC5oaXQoKVxuICAgICAgICAgICAgaWYoYWN0aXZlU2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcE5hbWUgPT09IHRoaXMuc2hpcExpc3RbaV0ubmFtZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXBMaXN0LnNwbGljZShpLCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH1cbiAgICB0aGlzLmFueVNoaXBzTGVmdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcExpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIH1cblxuXG5cblxuXG5leHBvcnQge0dhbWVib2FyZH1cbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5mdW5jdGlvbiBQbGF5ZXIoKSB7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbn1cblxubGV0IHBsYXllciA9IG5ldyBQbGF5ZXIoKVxubGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcigpXG5cbmV4cG9ydCB7cGxheWVyLCBjb21wdXRlcn1cbiIsImZ1bmN0aW9uIFNoaXAobmFtZSwgbGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRUaW1lcyA9IDA7XG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuXG4gICAgdGhpcy5oaXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGl0VGltZXMgKz0gMVxuICAgIH1cblxuICAgIHRoaXMuaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5oaXRUaW1lcyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN1bmtcbiAgICB9XG59XG5cbmV4cG9ydCB7U2hpcH0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250L3NwYWNlYzVpLXdlYmZvbnQud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvc3BhY2VjNWktd2ViZm9udC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiLi9mb250L3NwYWNlYzVlMi13ZWJmb250LndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9mb250L3NwYWNlYzVlMi13ZWJmb250LndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvc3BhY2VjNWMyLXdlYmZvbnQud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnQvc3BhY2VjNWMyLXdlYmZvbnQud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBodG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxuYiwgdSwgaSwgY2VudGVyLFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xuXHRtYXJnaW46IDA7XG5cdHBhZGRpbmc6IDA7XG5cdGJvcmRlcjogMDtcblx0Zm9udC1zaXplOiAxMDAlO1xuXHRmb250OiBpbmhlcml0O1xuXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbkBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiAnc3BhY2VfY3J1aXNlcml0YWxpYyc7XG4gICAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSkgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pIGZvcm1hdCgnd29mZicpO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuXG59XG5cbkBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiAnc3BhY2VfY3J1aXNlcl9leHBhbmRlZXhwYW5kZWQnO1xuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KSBmb3JtYXQoJ3dvZmYnKTtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcblxufVxuXG5AZm9udC1mYWNlIHtcbiAgICBmb250LWZhbWlseTogJ3NwYWNlX2NydWlzZXJfY29uZGVuc2VkQ24nO1xuICAgIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fX30pIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX199KSBmb3JtYXQoJ3dvZmYnKTtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcblxufVxuXG5odG1sIHtcbiAgICBjdXJzb3I6IHBvaW50ZXJcbn1cblxuLm1haW4ge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwZjI5NDA7XG59XG5cbi50aXRsZSB7XG4gICAgZm9udC1zaXplOiA0cmVtO1xuICAgIGZvbnQtZmFtaWx5OiAnc3BhY2VfY3J1aXNlcl9leHBhbmRlZXhwYW5kZWQnLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCNlMzRlNTAsICNmZGZjOTIsICNmZWZmZmEpO1xuICAgIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBtYXJnaW46IDJyZW07XG59XG5cbi5nYW1lLXNwYWNlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA1dnc7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIG1pbi1oZWlnaHQ6IDUwdmg7XG59XG5cbi5ib2FyZC1zcGFjZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ib2FyZC10aXRsZSB7XG4gICAgbWFyZ2luOiAycmVtO1xuICAgIHBhZGRpbmc6IC41cmVtO1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICBmb250LWZhbWlseTogJ3NwYWNlX2NydWlzZXJfY29uZGVuc2VkQ24nLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZmRmYzkyO1xuICAgIHotaW5kZXg6IDI7XG59XG5cbi50aXRsZS1jb250YWluZXIge1xuICAgIHdpZHRoOiA1MDBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uZW1wdHksIC5ob2xkZXJ7XG4gICAgd2lkdGggOiA2cmVtO1xuICAgIGZvbnQtc2l6ZTogNHJlbTtcbiAgICBjb2xvcjogcGVydTtcbn1cblxuLmhvbGRlciB7XG4gICAgdGV4dC1zaGFkb3c6IDBweCAwcHggNHB4IGJsYWNrO1xufVxuXG4uaG9sZGVyOmhvdmVyIHtcbiAgICB0ZXh0LXNoYWRvdzogMHB4IDBweCA0cHggI2ZkZmM5Mjtcbn1cblxuLnBsYXllcnMtYm9hcmQsIC5jb21wdXRlcnMtYm9hcmQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgd2lkdGg6IDUwMHB4O1xuICAgIGhlaWdodDogNTAwcHhcbn1cblxuLnNxdWFyZSwgLnNoaXAtc3F1YXJlIHtcbiAgICBoZWlnaHQ6IDNyZW07XG4gICAgd2lkdGg6IDNyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gICAgXG4gICAgYmFja2dyb3VuZDogcmdiKDEwMywyMDgsMTk4KTtcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCByZ2JhKDEwMywyMDgsMTk4LDEpIDAlLCByZ2JhKDU2LDE0NywxNDQsMSkgMTAwJSk7XG59XG5cbi5zaGlwLXNxdWFyZSB7XG4gICAgYmFja2dyb3VuZDogZ3JleTtcbn1cblxuLnNoaXAtc2V0LXVwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IC43NXJlbTtcbn1cblxuLnNoaXAtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IC4yNXJlbTtcbiAgICBcbn1cbi5zaGlwOmhvdmVyIHtcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDhweCAjZmRmYzkyO1xufVxuXG4uc2hpcC1uYW1lIHtcbiAgICBmb250LWZhbWlseTogJ3NwYWNlX2NydWlzZXJfY29uZGVuc2VkQ24nLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG4uc2hpcCB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLnNoaXAtc2VsZWN0aW9uLCAuc2hpcC1zZWxlY3RlZCB7XG4gICAgYmFja2dyb3VuZDogZ3JleTtcbn1cblxuLmFjdGl2ZSA+IC5zaGlwID4gLnNoaXAtc3F1YXJlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBwZXJ1O1xufVxuXG4uYWN0aXZlID4gLnNoaXAtbmFtZSB7XG4gICAgY29sb3I6IHBlcnU7XG59XG5cbi5jb25mbGljdCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2UzNGU1MDtcbn1cblxuLnN0YXJ0LWhvcml6b250YWwge1xuICAgIGJveC1zaGFkb3c6XG4gICAgIGluc2V0ICA0cHggIDBweCAgMHB4IGJsYWNrLFxuICAgICBpbnNldCAgMHB4ICA0cHggIDBweCBibGFjayxcbiAgICAgaW5zZXQgIDBweCAgLTRweCAgMHB4IGJsYWNrO1xufVxuXG5cbi5taWQtaG9yaXpvbnRhbCB7XG4gICAgYm94LXNoYWRvdzpcbiAgICAgaW5zZXQgIDAgICAwICA0cHggYmxhY2ssXG4gICAgIGluc2V0ICAwICAtNHB4IDAgYmxhY2ssXG4gICAgIGluc2V0ICAwICAgNHB4IDAgYmxhY2s7XG59XG5cbi5lbmQtaG9yaXpvbnRhbCB7XG4gICAgYm94LXNoYWRvdzpcbiAgICAgaW5zZXQgIC00cHggIDBweCAgMHB4IGJsYWNrLFxuICAgICBpbnNldCAgMHB4ICA0cHggIDBweCBibGFjayxcbiAgICAgaW5zZXQgIDBweCAgLTRweCAgMHB4IGJsYWNrO1xufVxuXG4uc3RhcnQtdmVydGljYWwge1xuICAgIGJveC1zaGFkb3c6XG4gICAgIGluc2V0ICAwcHggIDRweCAgMHB4IGJsYWNrLFxuICAgICBpbnNldCAgNHB4ICAwcHggIDBweCBibGFjayxcbiAgICAgaW5zZXQgIC00cHggIDBweCAgMHB4IGJsYWNrO1xufVxuXG5cbi5taWQtdmVydGljYWwge1xuICAgIGJveC1zaGFkb3c6XG4gICAgIGluc2V0ICAwICAgMCAgMCBibGFjayxcbiAgICAgaW5zZXQgIDRweCAwIDAgYmxhY2ssXG4gICAgIGluc2V0ICAtNHB4IDAgMCBibGFjaztcbn1cblxuLmVuZC12ZXJ0aWNhbCB7XG4gICAgYm94LXNoYWRvdzpcbiAgICAgaW5zZXQgIDBweCAgLTRweCAgMHB4IGJsYWNrLFxuICAgICBpbnNldCAgNHB4ICAwcHggIDBweCBibGFjayxcbiAgICAgaW5zZXQgIC00cHggIDBweCAgMHB4IGJsYWNrO1xufVxuXG4ucGxheS1nYW1lIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IDEuNXJlbTtcbn1cblxuLnN0YXJ0LXRpdGxlIHtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgZm9udC1mYW1pbHk6ICdzcGFjZV9jcnVpc2VyX2NvbmRlbnNlZENuJywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuLnN0YXJ0LWJ1dHRvbiB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgICBjb2xvcjogcGVydTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBmb250LWZhbWlseTogJ3NwYWNlX2NydWlzZXJfY29uZGVuc2VkQ24nLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG59XG5cbi5zdGFydC1idXR0b246aG92ZXIge1xuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNnB4IHBlcnU7XG59XG5cbi5taXNzIHtcbiAgICBiYWNrZ3JvdW5kOndoaXRlO1xuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChjaXJjbGUsIHdoaXRlIDAlLCBncmV5IDEwMCUpO1xufVxuXG4uaGl0IHtcbiAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmVkIDAlLCAjZTM0ZTUwIDEwMCUpO1xufVxuXG4ucGxheS1hZ2FpbiB7XG4gICAgcGFkZGluZzogMnJlbTtcbiAgICBjb2xvcjogcGVydTtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgZm9udC1mYW1pbHk6ICdzcGFjZV9jcnVpc2VyX2NvbmRlbnNlZENuJywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xufVxuXG4uZmluYWwtbWVzc2FnZSB7XG4gICAgbWFyZ2luOiAycmVtO1xuICAgIHBhZGRpbmc6IC41cmVtO1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICBmb250LWZhbWlseTogJ3NwYWNlX2NydWlzZXJfY29uZGVuc2VkQ24nLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHdoaXRlO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6Qjs7QUFFQTtJQUNJLGtDQUFrQztJQUNsQzsrREFDdUQ7SUFDdkQsbUJBQW1CO0lBQ25CLGtCQUFrQjs7QUFFdEI7O0FBRUE7SUFDSSw0Q0FBNEM7SUFDNUM7K0RBQ3dEO0lBQ3hELG1CQUFtQjtJQUNuQixrQkFBa0I7O0FBRXRCOztBQUVBO0lBQ0ksd0NBQXdDO0lBQ3hDOytEQUN3RDtJQUN4RCxtQkFBbUI7SUFDbkIsa0JBQWtCOztBQUV0Qjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLG1FQUFtRTtJQUNuRSw0REFBNEQ7SUFDNUQsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFFBQVE7SUFDUixZQUFZO0lBQ1osZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osY0FBYztJQUNkLGVBQWU7SUFDZiwrREFBK0Q7SUFDL0QsWUFBWTtJQUNaLGdDQUFnQztJQUNoQyxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtJQUNuQiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsWUFBWTtJQUNaO0FBQ0o7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLHVCQUF1Qjs7SUFFdkIsNEJBQTRCO0lBQzVCLG9GQUFvRjtBQUN4Rjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixXQUFXOztBQUVmO0FBQ0E7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSwrREFBK0Q7SUFDL0QsWUFBWTtJQUNaLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSTs7O2dDQUc0QjtBQUNoQzs7O0FBR0E7SUFDSTs7OzJCQUd1QjtBQUMzQjs7QUFFQTtJQUNJOzs7Z0NBRzRCO0FBQ2hDOztBQUVBO0lBQ0k7OztnQ0FHNEI7QUFDaEM7OztBQUdBO0lBQ0k7OzswQkFHc0I7QUFDMUI7O0FBRUE7SUFDSTs7O2dDQUc0QjtBQUNoQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsK0RBQStEO0lBQy9ELFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsV0FBVztJQUNYLGlCQUFpQjtJQUNqQiwrREFBK0Q7QUFDbkU7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsd0RBQXdEO0FBQzVEOztBQUVBO0lBQ0ksZUFBZTtJQUNmLHlEQUF5RDtBQUM3RDs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsZUFBZTtJQUNmLCtEQUErRDtBQUNuRTs7QUFFQTtJQUNJLFlBQVk7SUFDWixjQUFjO0lBQ2QsZUFBZTtJQUNmLCtEQUErRDtJQUMvRCxZQUFZO0FBQ2hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnc3BhY2VfY3J1aXNlcml0YWxpYyc7XFxuICAgIHNyYzogdXJsKCcuL2ZvbnQvc3BhY2VjNWktd2ViZm9udC53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgICAgICB1cmwoJy4vZm9udC9zcGFjZWM1aS13ZWJmb250LndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcblxcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdzcGFjZV9jcnVpc2VyX2V4cGFuZGVleHBhbmRlZCc7XFxuICAgIHNyYzogdXJsKCcuL2ZvbnQvc3BhY2VjNWUyLXdlYmZvbnQud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXFxuICAgICAgICAgdXJsKCcuL2ZvbnQvc3BhY2VjNWUyLXdlYmZvbnQud29mZicpIGZvcm1hdCgnd29mZicpO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuXFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogJ3NwYWNlX2NydWlzZXJfY29uZGVuc2VkQ24nO1xcbiAgICBzcmM6IHVybCgnLi9mb250L3NwYWNlYzVjMi13ZWJmb250LndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICAgICAgIHVybCgnLi9mb250L3NwYWNlYzVjMi13ZWJmb250LndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcblxcbn1cXG5cXG5odG1sIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyXFxufVxcblxcbi5tYWluIHtcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwZjI5NDA7XFxufVxcblxcbi50aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdzcGFjZV9jcnVpc2VyX2V4cGFuZGVleHBhbmRlZCcsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCNlMzRlNTAsICNmZGZjOTIsICNmZWZmZmEpO1xcbiAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtY2xpcDogdGV4dDtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgbWFyZ2luOiAycmVtO1xcbn1cXG5cXG4uZ2FtZS1zcGFjZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDV2dztcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBtaW4taGVpZ2h0OiA1MHZoO1xcbn1cXG5cXG4uYm9hcmQtc3BhY2Uge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQtdGl0bGUge1xcbiAgICBtYXJnaW46IDJyZW07XFxuICAgIHBhZGRpbmc6IC41cmVtO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnc3BhY2VfY3J1aXNlcl9jb25kZW5zZWRDbicsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2ZkZmM5MjtcXG4gICAgei1pbmRleDogMjtcXG59XFxuXFxuLnRpdGxlLWNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uZW1wdHksIC5ob2xkZXJ7XFxuICAgIHdpZHRoIDogNnJlbTtcXG4gICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICBjb2xvcjogcGVydTtcXG59XFxuXFxuLmhvbGRlciB7XFxuICAgIHRleHQtc2hhZG93OiAwcHggMHB4IDRweCBibGFjaztcXG59XFxuXFxuLmhvbGRlcjpob3ZlciB7XFxuICAgIHRleHQtc2hhZG93OiAwcHggMHB4IDRweCAjZmRmYzkyO1xcbn1cXG5cXG4ucGxheWVycy1ib2FyZCwgLmNvbXB1dGVycy1ib2FyZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGhlaWdodDogNTAwcHhcXG59XFxuXFxuLnNxdWFyZSwgLnNoaXAtc3F1YXJlIHtcXG4gICAgaGVpZ2h0OiAzcmVtO1xcbiAgICB3aWR0aDogM3JlbTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxuICAgIFxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTAzLDIwOCwxOTgpO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCByZ2JhKDEwMywyMDgsMTk4LDEpIDAlLCByZ2JhKDU2LDE0NywxNDQsMSkgMTAwJSk7XFxufVxcblxcbi5zaGlwLXNxdWFyZSB7XFxuICAgIGJhY2tncm91bmQ6IGdyZXk7XFxufVxcblxcbi5zaGlwLXNldC11cCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IC43NXJlbTtcXG59XFxuXFxuLnNoaXAtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAuMjVyZW07XFxuICAgIFxcbn1cXG4uc2hpcDpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggOHB4ICNmZGZjOTI7XFxufVxcblxcbi5zaGlwLW5hbWUge1xcbiAgICBmb250LWZhbWlseTogJ3NwYWNlX2NydWlzZXJfY29uZGVuc2VkQ24nLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi5zaGlwIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnNoaXAtc2VsZWN0aW9uLCAuc2hpcC1zZWxlY3RlZCB7XFxuICAgIGJhY2tncm91bmQ6IGdyZXk7XFxufVxcblxcbi5hY3RpdmUgPiAuc2hpcCA+IC5zaGlwLXNxdWFyZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBlcnU7XFxufVxcblxcbi5hY3RpdmUgPiAuc2hpcC1uYW1lIHtcXG4gICAgY29sb3I6IHBlcnU7XFxufVxcblxcbi5jb25mbGljdCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlMzRlNTA7XFxufVxcblxcbi5zdGFydC1ob3Jpem9udGFsIHtcXG4gICAgYm94LXNoYWRvdzpcXG4gICAgIGluc2V0ICA0cHggIDBweCAgMHB4IGJsYWNrLFxcbiAgICAgaW5zZXQgIDBweCAgNHB4ICAwcHggYmxhY2ssXFxuICAgICBpbnNldCAgMHB4ICAtNHB4ICAwcHggYmxhY2s7XFxufVxcblxcblxcbi5taWQtaG9yaXpvbnRhbCB7XFxuICAgIGJveC1zaGFkb3c6XFxuICAgICBpbnNldCAgMCAgIDAgIDRweCBibGFjayxcXG4gICAgIGluc2V0ICAwICAtNHB4IDAgYmxhY2ssXFxuICAgICBpbnNldCAgMCAgIDRweCAwIGJsYWNrO1xcbn1cXG5cXG4uZW5kLWhvcml6b250YWwge1xcbiAgICBib3gtc2hhZG93OlxcbiAgICAgaW5zZXQgIC00cHggIDBweCAgMHB4IGJsYWNrLFxcbiAgICAgaW5zZXQgIDBweCAgNHB4ICAwcHggYmxhY2ssXFxuICAgICBpbnNldCAgMHB4ICAtNHB4ICAwcHggYmxhY2s7XFxufVxcblxcbi5zdGFydC12ZXJ0aWNhbCB7XFxuICAgIGJveC1zaGFkb3c6XFxuICAgICBpbnNldCAgMHB4ICA0cHggIDBweCBibGFjayxcXG4gICAgIGluc2V0ICA0cHggIDBweCAgMHB4IGJsYWNrLFxcbiAgICAgaW5zZXQgIC00cHggIDBweCAgMHB4IGJsYWNrO1xcbn1cXG5cXG5cXG4ubWlkLXZlcnRpY2FsIHtcXG4gICAgYm94LXNoYWRvdzpcXG4gICAgIGluc2V0ICAwICAgMCAgMCBibGFjayxcXG4gICAgIGluc2V0ICA0cHggMCAwIGJsYWNrLFxcbiAgICAgaW5zZXQgIC00cHggMCAwIGJsYWNrO1xcbn1cXG5cXG4uZW5kLXZlcnRpY2FsIHtcXG4gICAgYm94LXNoYWRvdzpcXG4gICAgIGluc2V0ICAwcHggIC00cHggIDBweCBibGFjayxcXG4gICAgIGluc2V0ICA0cHggIDBweCAgMHB4IGJsYWNrLFxcbiAgICAgaW5zZXQgIC00cHggIDBweCAgMHB4IGJsYWNrO1xcbn1cXG5cXG4ucGxheS1nYW1lIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMS41cmVtO1xcbn1cXG5cXG4uc3RhcnQtdGl0bGUge1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGZvbnQtZmFtaWx5OiAnc3BhY2VfY3J1aXNlcl9jb25kZW5zZWRDbicsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uc3RhcnQtYnV0dG9uIHtcXG4gICAgcGFkZGluZzogMXJlbTtcXG4gICAgY29sb3I6IHBlcnU7XFxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgICBmb250LWZhbWlseTogJ3NwYWNlX2NydWlzZXJfY29uZGVuc2VkQ24nLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5zdGFydC1idXR0b246aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDZweCBwZXJ1O1xcbn1cXG5cXG4ubWlzcyB7XFxuICAgIGJhY2tncm91bmQ6d2hpdGU7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChjaXJjbGUsIHdoaXRlIDAlLCBncmV5IDEwMCUpO1xcbn1cXG5cXG4uaGl0IHtcXG4gICAgYmFja2dyb3VuZDogcmVkO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCByZWQgMCUsICNlMzRlNTAgMTAwJSk7XFxufVxcblxcbi5wbGF5LWFnYWluIHtcXG4gICAgcGFkZGluZzogMnJlbTtcXG4gICAgY29sb3I6IHBlcnU7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdzcGFjZV9jcnVpc2VyX2NvbmRlbnNlZENuJywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4uZmluYWwtbWVzc2FnZSB7XFxuICAgIG1hcmdpbjogMnJlbTtcXG4gICAgcGFkZGluZzogLjVyZW07XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgZm9udC1mYW1pbHk6ICdzcGFjZV9jcnVpc2VyX2NvbmRlbnNlZENuJywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZXMuY3NzJ1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSAnLi9wbGF5ZXJzJztcbmltcG9ydCAnLi9ET01jb250cm9sJyJdLCJuYW1lcyI6WyJwbGF5ZXIiLCJjb21wdXRlciIsInBsYXllckJvYXJkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29tcHV0ZXJCb2FyZCIsImNvbXB1dGVyVGl0bGUiLCJnYW1lUGxheURpdiIsImFjU3RhdGUiLCJic1N0YXRlIiwiZGVTdGF0ZSIsInNiU3RhdGUiLCJjclN0YXRlIiwiaG9yaXpvbnRhbCIsInNoaXBzUGxhY2VkIiwiZ2FtZVN0YXJ0IiwibGFzdEF0dGFjayIsImNyZWF0ZUJvYXJkU3F1YXJlcyIsImJvYXJkIiwicGxheWVyQiIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImkiLCJnYW1lYm9hcmQiLCJfbG9vcCIsInNxdWFyZSIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJ4IiwiaiIsInkiLCJhZGRFdmVudExpc3RlbmVyIiwiY29udGFpbnMiLCJlZGl0U2hpcFBsYWNlbWVudCIsIm5hbWUiLCJldmVudCIsImNvbXB1dGVyQm9hcmRTcXVhcmVGdW5jdGlvbiIsInJlc2V0Q29sb3JzIiwiYWN0aXZlIiwiY29uY2F0IiwicmVtb3ZlIiwic2hpcEhvdmVyIiwic2hpcExlbmd0aCIsInRhcmdldCIsInhJbnQiLCJwYXJzZUludCIsIlN0cmluZyIsInlJbnQiLCJwbGFjZW1lbnRWYWxpZGF0b3IiLCJyZXN1bHQiLCJzaGlwUGxhY2UiLCJzaGlwTmFtZSIsInBsYWNlU2hpcCIsInNoaXBDb250YWluZXIiLCJ0ZXh0Q29udGVudCIsImRvWW91V2FudFRvUGxheUFHYW1lIiwicmVzZXRTaGlwIiwiZm9jdXMiLCJzZXRIb3ZlciIsIm1vdXNlSG92ZXIiLCJib2FyZFNldHVwQ2xpY2siLCJjcmVhdGVTaGlwIiwiZGl2IiwiY3JlYXRlU2hpcERpdiIsImNyZWF0ZVNoaXBEaXZDb250ZW50Iiwic2hpcFRpdGxlIiwic2hpcEQiLCJ0b2dnbGVBY3RpdmUiLCJwbGFjZVNoaXBzIiwic2hpcERpcmVjdGlvbiIsImFjIiwiYnMiLCJkZSIsInN1YiIsImNyIiwibWFrZUNvbXB1dGVyQm9hcmQiLCJxdWVzdGlvbiIsInN0YXJ0QnV0dG9uIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBsYWNlQ29tcHV0ZXJTaGlwcyIsImhpdCIsInJlY2VpdmVBdHRhY2siLCJhbnlTaGlwc0xlZnQiLCJ3aW5IYW5kbGVyIiwiY29tcHV0ZXJUdXJuIiwicGxheWVyV2luIiwic3BhY2UiLCJtZXNzYWdlIiwiYnV0dG9uIiwibG9jYXRpb24iLCJyZWxvYWQiLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJTaG90IiwicmFuZG9tSW50RnJvbUludGVydmFsIiwidGhlZm9jdXMiLCJzaGlwcyIsInNoaXBMaXN0IiwidmFsaWQiLCJkaXJlY3Rpb24iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJTaGlwIiwiR2FtZWJvYXJkIiwiX3RoaXMiLCJpbml0aWFsaXplQmxhbmtCb2FyZCIsInhyb3ciLCJwdXNoIiwiZmlsbFNoaXBMaXN0IiwiaW5pdGlhbGl6ZSIsInN0YXJ0eCIsInN0YXJ0eSIsImFjdGl2ZVNoaXAiLCJnZXRTaGlwT2JqRnJvbU5hbWUiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJpc1N1bmsiLCJzcGxpY2UiLCJQbGF5ZXIiLCJoaXRUaW1lcyIsInN1bmsiXSwic291cmNlUm9vdCI6IiJ9