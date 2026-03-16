export class Gameboard {
    static BOARD_SIZE = 10;

    #board = Array(10)
        .fill()
        .map(() => Array(10).fill({ ship: null, isAttacked: false }));
    #ships = [];

    placeShip(ship, x, y, isVertical) {
        if (!this.#validateCoords) return false;
        if (this.#board[x][y].ship) return false;

        if (!this.#canPlace(ship, x, y, isVertical)) {
            throw Error("Unable to place the ship in given coords");
        }

        for (let i = 0; i < ship.length; i++) {
            if (isVertical) {
                this.#board[x + i][y].ship = ship;
            } else {
                this.#board[x][y + i].ship = ship;
            }
        }

        this.#ships.push(ship);
        return true;
    }

    #canPlace(ship, x, y, isVertical) {
        const endRow = isVertical ? x + ship.length - 1 : x;
        const endCol = isVertical ? y : y + ship.length - 1;

        if (!this.#validateCoords(endRow, endCol)) return false;

        const startX = Math.max(0, x - 1);
        const startY = Math.max(0, y - 1);
        const stopX = Math.min(Gameboard.BOARD_SIZE - 1, endRow + 1);
        const stopY = Math.min(Gameboard.BOARD_SIZE - 1, endCol + 1);

        for (let x = startX; x <= stopX; x++) {
            for (let y = startY; y <= stopY; y++) {
                if (this.#board[x][y].ship) {
                    return false;
                }
            }
        }

        return true;
    }

    receiveAttack(x, y) {
        if (!this.#validateCoords(x, y)) throw Error("Invalid coords");

        const cell = this.#board[x][y];

        if (cell.isAttacked === true) throw Error("Cell already attacked");

        cell.isAttacked = true;
        if (cell.ship) {
            cell.ship.hit();
            return true;
        }

        return false;
    }

    #allShipsSunk() {
        return this.#ships.every((ship) => ship.isSunk());
    }

    get board() {
        return structuredClone(this.#board);
    }

    #validateCoords(x, y) {
        return (
            x >= 0 &&
            x < Gameboard.BOARD_SIZE &&
            y >= 0 &&
            y < Gameboard.BOARD_SIZE
        );
    }
}
