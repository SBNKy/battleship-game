export class GameView {
    playerBoardDiv;
    enemyBoardDiv;

    constructor() {
        this.playerBoardDiv = document.querySelector(".player-board");
        this.enemyBoardDiv = document.querySelector(".enemy-board");
    }

    renderView(BOARD_SIZE) {
        const boards = [this.playerBoardDiv, this.enemyBoardDiv];

        boards.forEach((boardElement) => {
            for (let x = 0; x < BOARD_SIZE; x++) {
                for (let y = 0; y < BOARD_SIZE; y++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");

                    cell.dataset.x = x;
                    cell.dataset.y = y;

                    boardElement.appendChild(cell);
                }
            }
        });
    }

    updateView(boardElement, board, isEnemy) {
        console.log(board.length);
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board.length; y++) {
                const cellData = board[x][y];
                console.log("drawing for ", x, y);
                const cell = boardElement.querySelector(
                    `[data-x="${x}"][data-y="${y}"]`,
                );

                cell.className = "cell";
                console.log(cellData);
                if (cellData.ship && !isEnemy) {
                    cell.classList.add("ship");
                }

                if (cellData.isAttacked) {
                    if (cellData.ship) {
                        cell.classList.add("hit");
                    } else {
                        cell.classList.add("miss");
                    }
                }
            }
        }
    }

    bindAttack(handler) {
        this.enemyBoardDiv.addEventListener("click", (e) => {
            const cell = e.target.closest(".cell");
            if (!cell) return;

            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);

            handler(x, y);
        });
    }
}
