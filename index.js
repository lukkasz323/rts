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
} 

const entityFactory = {
    buildings: {
        createMine: function(x, y) {
            const entity = new Entity();
    
            entity.components.set(components.Bounds, new components.Bounds(x, y, 2, 2));
            entity.components.set(components.Hp, new components.Hp(50));
    
            return entity  
        }
    }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const mouse = {
    rawX: null,
    rawY: null,
};
mouse.getX = () => clamp(Math.floor((mouse.rawX) / grid.cellSize), 0, grid.cellCount - 1);
mouse.getY = () => clamp(Math.floor((mouse.rawY) / grid.cellSize), 0, grid.cellCount - 1);

const grid = {
    cellSize: 64,
};
grid.cellCount = canvas.width / grid.cellSize;

const entities = [];

// Setup
{

}

// Events
{
    canvas.onmousemove = (e) => {
        const canvasBounds = canvas.getBoundingClientRect();

        mouse.rawX = e.x - canvasBounds.x;
        mouse.rawY = e.y - canvasBounds.y;
    }

    canvas.onclick = () => {
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
            // Collisions
            {
            }
        }

        //Draw
        {
            // Background
            {
                ctx.fillStyle = '#0a0';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Entities
            {
                entities.forEach(e => {
                    const bounds = e.components.get(components.Bounds)

                    ctx.fillStyle = 'blue';
                    ctx.fillRect(bounds.x * grid.cellSize, bounds.y * grid.cellSize, bounds.w * grid.cellSize, bounds.h * grid.cellSize);
                });
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
                const w = canvas.width / grid.cellCount;
                const h = canvas.height / grid.cellCount;

                for (let y = 0; y < grid.cellCount; y++) {
                    for (let x = 0; x < grid.cellCount; x++) {
                        ctx.strokeRect(x * w, y * h, w, h);
                    }
                }
            }

            // Debug
            {
                document.querySelector('h1').innerText = mouse.getX() + ', ' + mouse.getY();
            }
        }
    }
    requestAnimationFrame(gameLoop);
} gameLoop();