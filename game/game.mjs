import { GameState } from "./gameState.mjs";
import { updateGame } from "./gameLoop/update.mjs";
import { renderGame } from "./gameLoop/render/render.mjs";
import { addEventListeners } from "./eventListeners.mjs";
import { ResourceType } from "./enums.mjs";

export class Game {
    constructor(gridScale, $canvas, $status, $title) {
        this.gameState = new GameState(gridScale, $canvas);
        this.$canvas = $canvas;
        this.$status = $status;
        this.$title = $title;

        $canvas.getContext('2d').lineWidth = 2;
    }

    run() {
        initDOM(this.$status);
        startGameLoop(this.gameState, this.$canvas, this.$title);
        addEventListeners(this.gameState, this.$canvas);
    }
}

function startGameLoop(gameState, $canvas, $title) {
    {
        updateGame(gameState);
        renderGame(gameState, $canvas, $title);
    }   
    requestAnimationFrame(() => startGameLoop(gameState, $canvas, $title));
} 

function initDOM($status) {
    for (const enumKey in ResourceType) {
        const enumValue = ResourceType[enumKey];
        
        const $row = $status.insertRow();
        const $typeCell = $row.insertCell();
        const $gainCell = $row.insertCell();
        $typeCell.innerText = enumKey;
        $gainCell.setAttribute('id', enumValue);
    }
}