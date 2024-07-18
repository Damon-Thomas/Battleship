import { Gameboard } from "./gameboard";

function Player() {
    this.gameboard = new Gameboard()
}

let player = new Player()
let computer = new Player()

export {player, computer}
