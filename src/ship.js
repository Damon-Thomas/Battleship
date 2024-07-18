function Ship(name, length) {
    this.length = length;
    this.hitTimes = 0;
    this.name = name
    this.sunk = false;

    this.hit = () => {
        this.hitTimes += 1
    }

    this.isSunk = () => {
        if (this.hitTimes >= this.length) {
            this.sunk = true
        }
        return this.sunk
    }
}

export {Ship}