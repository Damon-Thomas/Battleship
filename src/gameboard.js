import { Ship } from "./ship";

function Gameboard() {
    // 0 = empty,  1 = already hit,  2 = miss,   name = ship
    this.board = [];
    this.shipList = []

    // fill empty board to start game
    this.initializeBlankBoard = () => {
        for (let i = 1; i <= 10; i++) {
            let xrow = [] 
            for (let j = 1; j <= 10; j++) {
                xrow.push(0)
            }
            this.board.push(xrow)
    }}

    this.fillShipList = () => {
        this.shipList.push(new Ship('Destroyer', 3))
        this.shipList.push(new Ship('Battleship', 4))
        this.shipList.push(new Ship('Aircraft Carrier', 5))
        this.shipList.push(new Ship('Submarine', 3))
        this.shipList.push(new Ship('Cruiser', 2))

    }

    this.initialize = () => {
        this.initializeBlankBoard()
        this.fillShipList()
    }
    
    this.initialize()






    this.placeShip = (shipName, startx, starty, horizontal = true) => {
        let activeShip = this.getShipObjFromName(shipName)
        for(let i = 0; i < activeShip.length; i++) {
            if (horizontal === true) {
                this.board[starty][startx + i] = shipName
                
            }
            else {
                this.board[starty + i][startx] = shipName
                
            }
        }
        
    }

    this.getShipObjFromName = (shipName) => {
        let activeShip
        for (let i = 0; i < this.shipList.length; i++) {
            if (shipName === this.shipList[i].name){
                activeShip = this.shipList[i]
                return activeShip
            }
        }
    }

    this.receiveAttack = (x, y) => {
        if (this.board[x][y] === 0) {
            this.board[x][y] = 3
        }
        else if (this.board[x][y] === 1 || this.board[x][y] === 2) {
            throw console.error('Invalid Attack Bug. Should not be able to attack already attacked square');

        }
        else {
            let shipName = this.board[x][y]
            let activeShip = this.getShipObjFromName(shipName)
            this.board[x][y] = 1
            activeShip.hit()
            if(activeShip.isSunk()) {
                for (let i = 0; i < this.shipList.length; i++) {
                    if (shipName === this.shipList[i].name){
                        this.shipList.splice(i, 1)
                        console.log(this.shipList)
                        //ship sunk and list upated. check if any ships left somewhere
                    }
                }
            }
        
        }
        }
    this.anyShipsLeft = () => {
        if (this.shipList.length > 0) {
            return true
        }
        else {
            return false
        }
    }
    }





export {Gameboard}
