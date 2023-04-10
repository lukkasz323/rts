import { Components } from "../components.mjs";
import { getComponentsOfType} from "../gameState.mjs";

export function updateGame(gameState) {
    updateResourceProduction(gameState.entities, gameState.resources);
}

function updateResourceProduction(entities, resources) {
    const productionComponents = getComponentsOfType(entities, Components.Production)
        
    for (const production of productionComponents) {
        if (production.progress >= 100) {
            production.progress -= 100;
            resources[production.resource] += production.gain;
        }
        production.progress += 1;
    }
}