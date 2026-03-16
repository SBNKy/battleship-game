export class GameView {
    playerBoardDiv;
    enemyBoardDiv;

    constructor() {
        this.playerBoardDiv = document.querySelector(".player-board");
        this.enemyBoardDiv = document.querySelector(".enemy-board");
    }

    renderView(boardElement, board, isComputer) {}

    updateView() {}

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
