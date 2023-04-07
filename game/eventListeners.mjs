import { Components } from "./components.mjs";
import { EntityFactory } from "./entities.mjs";
import { areaIsAllowed } from "./collision.mjs";

export function addEventListeners(gameState, $canvas) {
    $canvas.onmousemove = (e) => {
        const canvasBounds = $canvas.getBoundingClientRect();

        gameState.mouse.rawX = e.x - canvasBounds.x;
        gameState.mouse.rawY = e.y - canvasBounds.y;    
    }

    $canvas.onclick = () => {
        tryPlaceMine(gameState);
    }
}

function tryPlaceMine(gameState) {
    const newMine = EntityFactory.buildings.createMine(gameState.mouse.getX(), gameState.mouse.getY());
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