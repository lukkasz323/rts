import { Components } from "../../components.mjs";

export function renderCanvas(gameState, $canvas) {
    const ctx = $canvas.getContext('2d');

    renderBackground(ctx, $canvas.width, $canvas.height);
    renderEntities(ctx, gameState.entities, gameState.grid);
    renderProduction(ctx, gameState.entities, gameState.grid)
    renderGrid(ctx, gameState.grid.scale, $canvas.width, $canvas.height);
}

function renderProduction(ctx, entities, grid) {
    const productionEntities = entities.filter(e => e.components.get(Components.Production));
    for (const e of productionEntities) {
        const bounds = e.components.get(Components.Bounds);
        const production = e.components.get(Components.Production);

        const padding = 4;
        const x = (bounds.x * grid.getCellW()) + padding;
        const y = (bounds.y * grid.getCellH()) + padding;
        const w = ((production.progress / 100) * ((2 * grid.getCellW()) - (padding * 2)));
        const h = ((production.progress / 100) * ((2 * grid.getCellH()) - (padding * 2)));

        ctx.fillStyle = 'yellow';
        ctx.fillRect(x, y, w, h);
    }
}

function renderEntities(ctx, entities, grid) {
    for (const e of entities) {
        const bounds = e.components.get(Components.Bounds);

        const x = bounds.x * grid.getCellW();
        const y = bounds.y * grid.getCellH();
        const w = bounds.w * grid.getCellW();
        const h = bounds.h * grid.getCellH();

        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, w, h);  
    }
}

function renderGrid(ctx, gridScale, canvasWidth, canvasHeight) {
    const w = canvasWidth / gridScale;
    const h = canvasHeight / gridScale;

    for (let y = 0; y < gridScale; y++) {
        for (let x = 0; x < gridScale; x++) {
            ctx.strokeRect(x * w, y * h, w, h);
        }
    }
}

function renderBackground(ctx, canvasWidth, canvasHeight) {
    ctx.fillStyle = '#0a0';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}