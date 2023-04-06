import { EntityFactory } from "./entities.mjs";
import { areaIsEmpty } from "./utils.mjs";

export function addEventListeners(gameState, $canvas) {
    $canvas.onmousemove = (e) => {
        const canvasBounds = $canvas.getBoundingClientRect();

        gameState.mouse.rawX = e.x - canvasBounds.x;
        gameState.mouse.rawY = e.y - canvasBounds.y;    
    }

    $canvas.onclick = () => {
        const newEntity = EntityFactory.buildings.createMine(gameState.mouse.getX(), gameState.mouse.getY());
        const newEntityBounds = newEntity.components.get(Components.Bounds);

        if (areaIsEmpty(newEntityBounds, gameState.entities)) {
            gameState.entities.push(newEntity);
        }
    }
}