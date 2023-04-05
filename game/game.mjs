import { updateGame } from "./updateLoop/update.mjs";
import { renderGame } from "./updateLoop/render/render.mjs";
import { components } from "./components.mjs";
import { areaIsEmpty } from "./utils.mjs";

class Entity {
    constructor() {
        this.components = new WeakMap();
    }
}

const gameState = {
    mouse: {
        rawX: null,
        rawY: null,
        getX: null,
        getY: null,
    },

    grid: {
        cellSize: 40,
        cellCount: null,
    },

    resources: {},
    
    debug: {},
    
    entities: [],
}

function initGame($canvas, $status) {
    // Game state
    {
        gameState.mouse.getX = () => clamp(Math.floor((gameState.mouse.rawX) / gameState.grid.cellSize), 0, gameState.grid.cellCount - 1);
        gameState.mouse.getY = () => clamp(Math.floor((gameState.mouse.rawY) / gameState.grid.cellSize), 0, gameState.grid.cellCount - 1);

        gameState.grid.cellCount = $canvas.width / gameState.grid.cellSize;
    } 

    // DOM elements
    {
        const types = components.Production.Types;
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
} 

function gameLoop() {
    {
        updateGame();
        renderGame();
    }
    requestAnimationFrame(gameLoop);
} 
``
function addEventListeners() {
    $canvas.onmousemove = (e) => {
        const canvasBounds = $canvas.getBoundingClientRect();

        gameState.mouse.rawX = e.x - canvasBounds.x;
        gameState.mouse.rawY = e.y - canvasBounds.y;
    }

    $canvas.onclick = () => {
        const newEntity = entityFactory.buildings.createMine(gameState.mouse.getX(), gameState.mouse.getY());
        const newEntityBounds = newEntity.components.get(components.Bounds);

        if (areaIsEmpty(newEntityBounds)) {
            gameState.entities.push(newEntity);
        }
    }
} 

export function runGame($canvas, $status, $title) {
    const ctx = $canvas.getContext('2d');

    init($canvas, $status);
    gameLoop();
    addEventListeners();
}