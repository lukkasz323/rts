'using strict';

const clamp = (x, minVal, maxVal) => Math.min(Math.max(x, minVal), maxVal);

const pointCollides = (x, y, bounds) => 
    bounds.x <= x && x < bounds.x + bounds.w && 
    bounds.y <= y && y < bounds.y + bounds.h;
    
const boundsCollide = (bounds1, bounds2) => 
    bounds1.x < bounds2.x + bounds2.w &&
    bounds1.y < bounds2.y + bounds2.h &&
    bounds1.x + bounds1.w > bounds2.x &&
    bounds1.y + bounds1.h > bounds2.y;

class Entity {
    constructor() {
        this.components = new WeakMap();
    }
}

const components = {
    Bounds: class {        
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
    },
    
    Hp: class {
        constructor(hp) {
            this.hp = hp;
        }
    },

    Production: class {
        static Types = {
            GOLD: 'gold',
        }

        constructor(type, gain) {
            this.type = type;
            this.gain = gain;
            this.progress = 0;
        }
    }
}

const entityFactory = {
    buildings: {
        createMine: function(x, y) {
            const entity = new Entity();
    
            entity.components.set(components.Bounds, new components.Bounds(x, y, 2, 2));
            entity.components.set(components.Hp, new components.Hp(50));
            entity.components.set(components.Production, new components.Production(components.Production.Types.GOLD, 5));
    
            return entity  
        }
    }
}


const $canvas = document.querySelector('canvas');
const $status = document.getElementById('status');
const $title = document.getElementById('title');

const ctx = $canvas.getContext('2d');

const game = {
    mouse: {
        rawX: null,
        rawY: null,
        getX: null,
        getY: null,
    },

    grid: {
        cellSize: 40,
        cellCount: null,
    },

    resources: {},
    
    debug: {},
    
    entities: [],
}

// Setup
{
    // Game
    {
        game.mouse.getX = () => clamp(Math.floor((game.mouse.rawX) / game.grid.cellSize), 0, game.grid.cellCount - 1);
        game.mouse.getY = () => clamp(Math.floor((game.mouse.rawY) / game.grid.cellSize), 0, game.grid.cellCount - 1);

        game.grid.cellCount = $canvas.width / game.grid.cellSize;
    }

    // Status DOM
    {
        const types = components.Production.Types;
        for (const key in types) {
            const value = types[key];
    
            const $row = $status.insertRow();
            const $typeCell = $row.insertCell();
            const $gainCell = $row.insertCell();
            $typeCell.innerText = key;
            $gainCell.setAttribute('id', value);
    
            game.resources[value] = 100;
        }
    }
}

function gameLoop() {
    {
        // Logic
        {
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

        //Draw
        {
            // Background
            {
                ctx.fillStyle = '#0a0';
                ctx.fillRect(0, 0, $canvas.width, $canvas.height);
            }

            // Entities
            {
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

            // // Collisions
            // {
            //     game.entities.forEach(e => {
            //         const bounds = e.components.get(components.Bounds)

            //         if (pointCollides(game.mouse.getX(), game.mouse.getY(), bounds)) {
            //             ctx.fillStyle = 'red';
            //             ctx.fillRect(bounds.x * game.grid.cellSize, bounds.y * game.grid.cellSize, bounds.w * game.grid.cellSize, bounds.h * game.grid.cellSize);
            //         }
            //     });
            // }

            // Grid
            {
                const w = $canvas.width / game.grid.cellCount;
                const h = $canvas.height / game.grid.cellCount;

                for (let y = 0; y < game.grid.cellCount; y++) {
                    for (let x = 0; x < game.grid.cellCount; x++) {
                        ctx.strokeRect(x * w, y * h, w, h);
                    }
                }
            }

            // Non-canvas
            {
                // Status
                {
                    const types = components.Production.Types;
                    for (const key in types) {
                        const value = types[key];
                        
                        document.getElementById(value).innerText = game.resources[value];
                    }
                }
            }
        }

        // Debug
        {
            const mouseCoords = game.mouse.getX() + ', ' + game.mouse.getY();
            
            $title.innerText = mouseCoords;
        }
    }
    requestAnimationFrame(gameLoop);
} gameLoop();

// Events
{
    $canvas.onmousemove = (e) => {
        const canvasBounds = $canvas.getBoundingClientRect();

        game.mouse.rawX = e.x - canvasBounds.x;
        game.mouse.rawY = e.y - canvasBounds.y;
    }

    $canvas.onclick = () => {
        function areaIsEmpty(checkedBounds) {
            let result = true;
        
            game.entities.forEach(e => {
                if (boundsCollide(checkedBounds, e.components.get(components.Bounds))) {
                    result = false;
                    return;
                }
            });
        
            return result;
        }

        const newEntity = entityFactory.buildings.createMine(game.mouse.getX(), game.mouse.getY());
        const newEntityBounds = newEntity.components.get(components.Bounds);

        if (areaIsEmpty(newEntityBounds)) {
            game.entities.push(newEntity);
        }
    }
}