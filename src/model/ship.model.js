export class Ship {
    #length;
    #hits = 0;

    constructor(length) {
        this.#length = length;
    }

    get length() {
        return this.#length;
    }

    hit() {
        this.#hits += 1;
    }

    isSunk() {
        return this.#hits === this.#length;
    }
}
