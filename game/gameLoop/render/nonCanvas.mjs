import { Components } from "../../components.mjs";
import { ResourceType } from "../../enums.mjs";

export function renderNonCanvas(gameState, $title) {
    renderStatus(gameState.resources);
    renderDebug(gameState.mouse, $title);
}

function renderStatus(resources) {
    for (const enumKey in ResourceType) {
        const enumValue = ResourceType[enumKey];
        
        document.getElementById(enumValue).innerText = resources[enumValue];
    }
}

function renderDebug(mouse, $title) {
    const mouseCoords = mouse.getX() + ', ' + mouse.getY();
    
    $title.innerText = mouseCoords;
}