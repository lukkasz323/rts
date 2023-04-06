import { Components } from "../components.mjs";

export function updateGame(gameState) {
    // Resource production
    const productionComponents = gameState.entities.map(e => e.components.get(Components.Production))
    for (const production of productionComponents) {
        if (production.progress >= 100) {
            production.progress -= 100;
            gameState.resources[production.type] += production.gain;
        }
        production.progress += 1;
    }
} 