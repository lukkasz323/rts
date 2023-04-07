import { Components } from "./components.mjs";
import { EntityFactory } from "./entities.mjs";
import { areaIsAllowed, pointCollides } from "./collision.mjs";

export function addEventListeners(gameState, $canvas) {
    window.onkeydown = (e) =>  {
        if (e.key === '`') {
            console.log(gameState);
        }
    }

    $canvas.onmousemove = (e) => {
        const canvasBounds = $canvas.getBoundingClientRect();

        gameState.mouse.rawX = e.x - canvasBounds.x;
        gameState.mouse.rawY = e.y - canvasBounds.y;    
    }

    $canvas.onclick = (e) => {
        if (e.shiftKey) {
            tryPlaceMine(gameState);
        } else if (e.altKey) {
            tryDestroyBuilding(gameState);
        }
    }
}

function tryDestroyBuilding(gameState) {
    for (const e of gameState.entities) {
        if (pointCollides(gameState.mouse.getX(), gameState.mouse.getY(), e.components.get(Components.Bounds))) {
            gameState.entities.splice(gameState.entities.findIndex((ee) => ee.id === e.id), 1);
        }
    }
}

function tryPlaceMine(gameState) {
    const newMine = EntityFactory.buildings.createMine(gameState.mouse.getX(), gameState.mouse.getY(), gameState.idContainer);
    tryPlaceBuilding(newMine, gameState);
}

function tryPlaceBuilding(building, gameState) {
    const currency = building.components.get(Components.Currency);

    if (!enoughResource(currency.price, currency.type, gameState.resources)) {
        return false;
    }

    if (!areaIsAllowed(building.components.get(Components.Bounds), gameState.entities, gameState.grid.scale)) {
        return false;
    }

    gameState.resources[currency.type] -= currency.price;
    gameState.entities.push(building);
    return true;
}

const enoughResource = (price, resourceType, resources) => 
    resources[resourceType] >= price;