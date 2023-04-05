function background() {
    ctx.fillStyle = '#0a0';
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);
}

function entities() {
    for (const e of game.entities) {
        const bounds = e.components.get(components.Bounds);
        const production = e.components.get(components.Production);

        // Bounds
        {
            const x = bounds.x * game.grid.cellSize;
            const y = bounds.y * game.grid.cellSize;
            const w = bounds.w * game.grid.cellSize;
            const h = bounds.h * game.grid.cellSize;

            ctx.fillStyle = 'blue';
            ctx.fillRect(x, y, w, h);
        }

        //  Progress
        {
            const padding = 4;
            const x = (bounds.x * game.grid.cellSize) + padding;
            const y = (bounds.y * game.grid.cellSize) + padding;
            const w = ((production.progress / 100) * ((game.grid.cellSize * 2) - (padding * 2)));
            const h = w;

            ctx.fillStyle = 'yellow';
            ctx.fillRect(x, y, w, h)
        }
    }
}

function grid() {
    const w = $canvas.width / game.grid.cellCount;
    const h = $canvas.height / game.grid.cellCount;

    for (let y = 0; y < game.grid.cellCount; y++) {
        for (let x = 0; x < game.grid.cellCount; x++) {
            ctx.strokeRect(x * w, y * h, w, h);
        }
    }
}

export function canvas(params) {
    background();
    entities();
    grid();
}