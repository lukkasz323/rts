export function updateGameState() {
    // Resource production
    {
        const productionComponents = game.entities.map(e => e.components.get(components.Production))
        for (const production of productionComponents) {
            if (production.progress >= 100) {
                production.progress -= 100;
                game.resources[production.type] += production.gain;
            }
            production.progress += 1;
        }
    }
} 