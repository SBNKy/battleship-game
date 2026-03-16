export class Ship {
    #length;
    #hits = 0;

    constructor(x, y, length) {
        this.#length = length;
    }

    hit() {
        this.#hits += 1;
    }

    isSunk() {
        return this.#hits === this.#length;
    }
}
