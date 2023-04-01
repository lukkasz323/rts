'using strict';

const clamp = (x, minVal, maxVal) => Math.min(Math.max(x, minVal), maxVal);

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

    Color: class {
        constructor(color) {
            this.color = color;
        }
    }
} 

const entityFactory = {
    createBuilding: function(x, y, w, h, hp, color) {
        const entity = new Entity();

        entity.components.set(components.Bounds, new components.Bounds(x, y, w, h));
        entity.components.set(components.Hp, new components.Hp(hp));
        entity.components.set(components.Color, new components.Color(color));

        return entity  
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
    entities.push(entityFactory.createBuilding(3, 0, 2, 2, 50, 'blue'));
    entities.push(entityFactory.createBuilding(3, 1, 3, 2, 50, 'blue'));
}

// Mouse updates
{
    function onMouseMove(e) {
        const canvasBounds = canvas.getBoundingClientRect();
        mouse.rawX = e.x - canvasBounds.x;
        mouse.rawY = e.y - canvasBounds.y;
    }

    function onClick(e) {
        console.log(e);
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);
}

const pointCollides = (x, y, bounds) => 
    bounds.x <= x && x < bounds.x + bounds.w && 
    bounds.y <= y && y < bounds.y + bounds.h;
    
const boundsCollide = (bounds1, bounds2) => 
    bounds1.x < bounds2.x + bounds2.w &&
    bounds1.y < bounds2.y + bounds2.h &&
    bounds1.x + bounds1.w > bounds2.x &&
    bounds1.y + bounds1.h > bounds2.y;

// Game updates
setInterval(() => {
    // Logic
    {
        // Collision
        {
            if (boundsCollide(entities[0].components.get(components.Bounds), entities[1].components.get(components.Bounds))) {
                console.log('Bounds collide!');
            }
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

                ctx.fillStyle = e.components.get(components.Color).color;
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
}, 1000 / 60);