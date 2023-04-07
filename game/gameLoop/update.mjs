import { Components } from "../components.mjs";

export function updateGame(gameState) {
    updateResourceProduction(gameState.entities, gameState.resources)
}

function updateResourceProduction(entities, resources) {
    const productionComponents = entities.map(e => e.components.get(Components.Production))
    for (const production of productionComponents) {
        if (production.progress >= 100) {
            production.progress -= 100;
            resources[production.resource] += production.gain;
        }
        production.progress += 1;
    }
}