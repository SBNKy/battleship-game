import { GameController } from "./controller/game.controller.js";
import { GameView } from "./view/game.view.js";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
    const view = new GameView();

    const game = new GameController(view);
    game.initGame();
});
