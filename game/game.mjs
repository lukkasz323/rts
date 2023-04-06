import { GameState } from "./gameState.mjs";
import { updateGame } from "./gameLoop/update.mjs";
import { renderGame } from "./gameLoop/render/render.mjs";
import { addEventListeners } from "./eventListeners.mjs";
import { Components } from "./components.mjs";

export class Game {
    constructor(gridScale, $canvas, $status, $title) {
        this.gameState = new GameState(gridScale, $canvas);
        this.$canvas = $canvas;
        this.$status = $status;
        this.$title = $title;
    }

    run() {
        initDOM(this.gameState, this.$status);
        addEventListeners(this.gameState, this.$canvas);
        startGameLoop(this.gameState, this.$canvas, this.$title);
    }
}

function startGameLoop(gameState, $canvas, $title) {
    {
        updateGame(gameState);
        renderGame(gameState, $canvas, $title);
    }   
    requestAnimationFrame(() => startGameLoop(gameState, $canvas, $title));
} 

function initDOM(gameState, $status) {
    const types = Components.Production.Types;
    for (const key in types) {
        const value = types[key];
        
        const $row = $status.insertRow();
        const $typeCell = $row.insertCell();
        const $gainCell = $row.insertCell();
        $typeCell.innerText = key;
        $gainCell.setAttribute('id', value);

        gameState.resources[value] = 100;
    }
}