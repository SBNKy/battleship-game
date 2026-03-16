import { Ship } from "../model/ship.model";

export class GameController {
    #playerBoard;
    #enemyBoard;
    #playerTurn = true;
    #isGameOver = false;

    constructor(playerBoard, enemyBoard) {
        this.#playerBoard = playerBoard;
        this.#enemyBoard = enemyBoard;

        this.#randomizeFleet(this.#playerBoard, [5, 4, 3, 3, 2]);
        this.#randomizeFleet(this.#enemyBoard, [5, 4, 3, 3, 2]);
    }

    #randomizeFleet(board, shipsLength) {
        for (const shipLength in shipsLength) {
            let isPlaced = false;

            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const isVertical = Math.random() < 0.5 ? true : false;

            const ship = new Ship(shipLength);
            while (!isPlaced) {
                if (board.placeShip(ship, x, y, isVertical)) {
                    isPlaced = true;
                }
            }
        }
    }

    #computerTurn() {
        return;
    }
}
