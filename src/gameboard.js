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
        this.shipList.push(new Ship('Aircraft-Carrier', 5))
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
        if (this.board[y][x] === 0) {
            this.board[y][x] = 3
            
            return 3
        }
        else if (this.board[y][x] === 1 || this.board[y][x] === 2) {
            console.log(`double attack at ${y}, ${x}`)
            throw console.error('Invalid Attack Bug. Should not be able to attack already attacked square');

        }
        else {
            let shipName = this.board[y][x]
            let activeShip = this.getShipObjFromName(shipName)
            this.board[y][x] = 1
            activeShip.hit()
            if(activeShip.isSunk()) {
                for (let i = 0; i < this.shipList.length; i++) {
                    if (shipName === this.shipList[i].name){
                        this.shipList.splice(i, 1)
                        
                        
                    }
                }
            }
            
            return 1
        
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
