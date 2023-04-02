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

function areaIsEmpty(checkedBounds, entities) {
    let result = true;

    entities.forEach(e => {
        if (boundsCollide(checkedBounds, e.components.get(components.Bounds))) {
            result = false;
            return;
        }
    });

    return result;
}

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

const mouse = {
    rawX: null,
    rawY: null,
}; 
mouse.getX = () => clamp(Math.floor((mouse.rawX) / grid.cellSize), 0, grid.cellCount - 1);
mouse.getY = () => clamp(Math.floor((mouse.rawY) / grid.cellSize), 0, grid.cellCount - 1);

const grid = {
    cellSize: 40,
};
grid.cellCount = $canvas.width / grid.cellSize;

const entities = [];

const resources = {};

// Setup
{
    // Status DOM
    {
        const types = components.Production.Types;
        for (const key in types) {
            const value = types[key];
    
            var $row = $status.insertRow();
            var $typeCell = $row.insertCell();
            var $gainCell = $row.insertCell();
            $typeCell.innerText = key;
            $gainCell.setAttribute('id', value);
    
            resources[value] = 0;
        }
    }
}

// Events
{
    $canvas.onmousemove = (e) => {
        const canvasBounds = $canvas.getBoundingClientRect();

        mouse.rawX = e.x - canvasBounds.x;
        mouse.rawY = e.y - canvasBounds.y;
    }

    $canvas.onclick = () => {
        const newEntity = entityFactory.buildings.createMine(mouse.getX(), mouse.getY());
        const newEntityBounds = newEntity.components.get(components.Bounds);

        if (areaIsEmpty(newEntityBounds, entities)) {
            entities.push(newEntity);
        }
    }
}

function gameLoop() {
    {
        // Logic
        {
            // Resource production
            {
                const productionComponents = entities.map(e => e.components.get(components.Production))
                for (const production of productionComponents) {
                    if (production.progress >= 100) {
                        production.progress -= 100;
                        resources[production.type] += production.gain;
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
                for (const e of entities) {
                    const bounds = e.components.get(components.Bounds)

                    ctx.fillStyle = 'blue';
                    ctx.fillRect(bounds.x * grid.cellSize, bounds.y * grid.cellSize, bounds.w * grid.cellSize, bounds.h * grid.cellSize);
                }
            }

            // Collisions
            {
                entities.forEach(e => {
                    const bounds = e.components.get(components.Bounds)

                    if (pointCollides(mouse.getX(), mouse.getY(), bounds)) {
                        ctx.fillStyle = 'red';
                        ctx.fillRect(bounds.x * grid.cellSize, bounds.y * grid.cellSize, bounds.w * grid.cellSize, bounds.h * grid.cellSize);
                    }
                });
            }

            // Grid
            {
                const w = $canvas.width / grid.cellCount;
                const h = $canvas.height / grid.cellCount;

                for (let y = 0; y < grid.cellCount; y++) {
                    for (let x = 0; x < grid.cellCount; x++) {
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
                        
                        document.getElementById(value).innerText = resources[value];
                    }
                }

                // Debug
                {
                    $title.innerText = mouse.getX() + ', ' + mouse.getY();
                }
            }
            
        }
    }
    requestAnimationFrame(gameLoop);
} gameLoop();