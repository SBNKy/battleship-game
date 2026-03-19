import { Gameboard } from "../model/gameboard.model.js";
import { Ship } from "../model/ship.model.js";

export class GameController {
    #view;
    #playerBoard;
    #enemyBoard;
    #playerTurn;
    #isGameOver;

    constructor(view) {
        this.#view = view;
    }

    initGame() {
        this.#view.bindAttack(this.handleBoardClick.bind(this));

        this.resetGame();
    }

    resetGame() {
        this.#playerBoard = new Gameboard();
        this.#enemyBoard = new Gameboard();
        this.#playerTurn = true;
        this.#isGameOver = false;

        const shipsLength = [5, 4, 3, 3, 2, 1];
        this.#randomizeFleet(this.#playerBoard, shipsLength);
        this.#randomizeFleet(this.#enemyBoard, shipsLength);

        this.#view.clearBoards();
        this.#view.renderView(Gameboard.BOARD_SIZE);
        this.#updateUI();
    }

    randomizeFleetPlacement(shipsLength = [5, 4, 3, 3, 2, 1]) {
        this.#playerBoard = new Gameboard();
        this.#randomizeFleet(this.#playerBoard, shipsLength);
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
                return;
            }

            if (!isHit) {
                this.#playerTurn = false;
                this.#computerTurn();
                this.#updateUI();
            }
        } catch {
            console.warn(`You already attacked this cell: x:${x},y:${y}`);
        }
    }

    #updateUI() {
        this.#view.updateBoards(
            this.#playerBoard.board,
            this.#enemyBoard.board,
        );
    }

    #computerTurn() {
        setTimeout(() => {
            try {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                const isHit = this.#playerBoard.receiveAttack(x, y);
                this.#updateUI();

                if (this.#playerBoard.allShipsSunk()) {
                    this.#isGameOver = true;
                    alert("Computer Won");
                    return;
                }

                if (isHit) {
                    this.#computerTurn();
                } else {
                    this.#playerTurn = true;
                }
            } catch {
                this.#computerTurn();
            }
        }, 600);
    }
}
