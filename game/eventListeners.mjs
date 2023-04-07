import { Components } from "./components.mjs";
import { EntityFactory } from "./entities.mjs";
import { areaIsEmpty } from "./utils.mjs";

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
    const production = building.components.get(Components.Production);

    if (!enoughResource(production.price, production.priceResource, gameState.resources)) {
        return false;
    }

    if (!areaIsEmpty(building.components.get(Components.Bounds), gameState.entities)) {
        return false;
    }

    gameState.resources[production.producedResource] -= production.price;
    gameState.entities.push(building);
    return true;
}

const enoughResource = (price, resourceType, resources) => 
    resources[resourceType] >= price;