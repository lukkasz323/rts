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
    const types = Components.Production.ResourceType;
    for (const enumKey in types) {
        const enumValue = types[enumKey];
        
        const $row = $status.insertRow();
        const $typeCell = $row.insertCell();
        const $gainCell = $row.insertCell();
        $typeCell.innerText = enumKey;
        $gainCell.setAttribute('id', enumValue);
    }
}