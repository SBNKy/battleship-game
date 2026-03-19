import { Gameboard } from "../model/gameboard.model.js";
import { Ship } from "../model/ship.model.js";

export class GameController {
    #view;
    #playerBoard;
    #enemyBoard;
    #playerTurn = true;
    #isGameOver = false;

    constructor(view) {
        this.#view = view;
        this.#playerBoard = new Gameboard();
        this.#enemyBoard = new Gameboard();
    }

    initGame() {
        const shipsLength = [5, 4, 3, 3, 2, 1];
        this.#randomizeFleet(this.#playerBoard, shipsLength);
        this.#randomizeFleet(this.#enemyBoard, shipsLength);

        this.#view.bindAttack(this.handleBoardClick.bind(this));
        this.#view.renderView(Gameboard.BOARD_SIZE);
        this.#updateUI();
    }

    #randomizeFleet(board, shipsLength) {
        for (const shipLength of shipsLength) {
            let isPlaced = false;
            const ship = new Ship(shipLength);

            while (!isPlaced) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const isVertical = Math.random() < 0.5;

                try {
                    board.placeShip(ship, x, y, isVertical);
                    isPlaced = true;
                } catch {}
            }
        }
    }

    handleBoardClick(x, y) {
        if (this.#isGameOver || !this.#playerTurn) return;

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
            console.warn(`You already attacked this cell: x:${x},y:${y}`);
        }
    }

    #updateUI() {
        this.#view.updateView(
            this.#view.playerBoardDiv,
            this.#playerBoard.board,
            false,
        );

        this.#view.updateView(
            this.#view.enemyBoardDiv,
            this.#enemyBoard.board,
            true,
        );
    }

    #computerTurn() {
        return;
    }
}
