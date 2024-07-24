import { Gameboard } from "./gameboard";

let tester = new Gameboard()

test('Initialize Board', () => {
    expect(tester.board).toEqual([
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]]
    )
})

test('Place Ships', () => {
    tester.placeShip('Destroyer', 2, 2)
    tester.placeShip('Aircraft-Carrier', 5, 5)
    tester.placeShip('Cruiser', 0, 3, false)
    expect(tester.board).toEqual([
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,'Destroyer','Destroyer','Destroyer',0,0,0,0,0],
        ['Cruiser',0,0,0,0,0,0,0,0,0],
        ['Cruiser',0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,'Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier'],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]]
    )
})

test('Ship List Working', () => {
    expect(tester.shipList.length).toEqual(5)
})

test('Miss Shots', () => {
    tester.receiveAttack(0, 0)
    tester.receiveAttack(9, 9)
    tester.receiveAttack(9, 3)
    tester.receiveAttack(4, 5)
    expect(tester.board).toEqual([
        [3,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,'Destroyer','Destroyer','Destroyer',0,0,0,0,0],
        ['Cruiser',0,0,0,0,0,0,0,0,0],
        ['Cruiser',0,0,0,0,3,0,0,0,0],
        [0,0,0,0,0,'Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier'],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,3,0,0,0,0,0,3]]
    )
})

test('Attack Ship', () => {
    tester.receiveAttack(2, 2)
    expect(tester.board).toEqual([
        [3,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,1,'Destroyer','Destroyer',0,0,0,0,0],
        ['Cruiser',0,0,0,0,0,0,0,0,0],
        ['Cruiser',0,0,0,0,3,0,0,0,0],
        [0,0,0,0,0,'Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier','Aircraft-Carrier'],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,3,0,0,0,0,0,3]]
    )
})

test('Sink Ship', () => {
    tester.receiveAttack(2, 3)
    tester.receiveAttack(2, 4)
    expect(tester.shipList.length).toEqual(4)
})

test('Sink Ship', () => {
    tester.shipList = []
    expect(tester.anyShipsLeft()).toEqual(false)
})