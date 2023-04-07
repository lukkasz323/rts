import { Components } from "../../components.mjs";

export function renderNonCanvas(gameState, $title) {
    renderStatus(gameState.resources);
    renderDebug(gameState.mouse, $title);
}

function renderStatus(resources) {
    const types = Components.Production.ResourceType;
    for (const key in types) {
        const value = types[key];
        
        document.getElementById(value).innerText = resources[value];
    }
}

function renderDebug(mouse, $title) {
    const mouseCoords = mouse.getX() + ', ' + mouse.getY();
    
    $title.innerText = mouseCoords;
}