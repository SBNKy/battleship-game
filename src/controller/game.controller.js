import { Gameboard } from "../model/gameboard.model";
import { Ship } from "../model/ship.model";

export class GameController {
    #view;
    #playerBoard;
    #enemyBoard;
    #isGameOver = false;

    constructor(view) {
        this.#view = view;
        this.#playerBoard = new Gameboard();
        this.#enemyBoard = new Gameboard();

        this.#initGame();
    }

    #initGame() {
        this.#randomizeFleet(this.#playerBoard, [5, 4, 3, 3, 2]);
        this.#randomizeFleet(this.#enemyBoard, [5, 4, 3, 3, 2]);

        this.#view.bindAttack(this.handleBoardClick.bind(this));
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

    handleBoardClick(x, y) {
        if (this.#isGameOver) return;

        try {
            const isHit = this.#enemyBoard.receiveAttack(x, y);
            this.#updateUI();

            if (this.#enemyBoard.allShipsSunk()) {
                this.#isGameOver = true;
                alert("Human won");
            }

            if (!isHit) {
                this.#computerTurn();
                this.#updateUI();
            }
        } catch {
            console.warn("You already attacked this cell");
        }
    }

    #updateUI() {
        this.#view.renderView(
            this.#view.playerBoardDiv,
            this.#playerBoard,
            false,
        );

        this.#view.renderView(this.#view.enemyBoardDiv, this.#enemyBoard, true);
    }

    #computerTurn() {
        return;
    }
}
