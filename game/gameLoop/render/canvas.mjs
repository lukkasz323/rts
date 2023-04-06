import { Components } from "../../components.mjs";

export function renderCanvas(gameState, $canvas) {
    const ctx = $canvas.getContext('2d');

    renderBackground(ctx, $canvas.width, $canvas.height);
    renderEntities(ctx, gameState.entities, gameState.grid);
    renderGrid(ctx, gameState.grid, $canvas.width, $canvas.height);
}

function renderBackground(ctx, canvasWidth, canvasHeight) {
    ctx.fillStyle = '#0a0';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function renderEntities(ctx, entities, grid) {
    for (const e of entities) {
        const bounds = e.components.get(Components.Bounds);
        const production = e.components.get(Components.Production);

        // Bounds
        {
            const x = bounds.x * grid.cellSize;
            const y = bounds.y * grid.cellSize;
            const w = bounds.w * grid.cellSize;
            const h = bounds.h * grid.cellSize;

            ctx.fillStyle = 'blue';
            ctx.fillRect(x, y, w, h);
        }

        //  Progress
        {
            const padding = 4;
            const x = (bounds.x * grid.cellSize) + padding;
            const y = (bounds.y * grid.cellSize) + padding;
            const w = ((production.progress / 100) * ((grid.cellSize * 2) - (padding * 2)));
            const h = w;

            ctx.fillStyle = 'yellow';
            ctx.fillRect(x, y, w, h)
        }
    }
}

function renderGrid(ctx, grid, canvasWidth, canvasHeight) {
    const w = canvasWidth / grid.cellCount;
    const h = canvasHeight / grid.cellCount;

    for (let y = 0; y < grid.cellCount; y++) {
        for (let x = 0; x < grid.cellCount; x++) {
            ctx.strokeRect(x * w, y * h, w, h);
        }
    }
}