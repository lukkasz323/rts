'using strict';

class Entity {
    constructor() {
        this.components = new WeakMap();
    }
}

const components = {
    Position: class {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    },
    
    Hp: class {
        constructor(hp) {
            this.hp = hp;
        }
    },

    Size: class {
        constructor(size) {
            this.size = size;
        }
    },
} 

const entityFactory = {
    createBuilding: function(x, y, hp) {
        const entity = new Entity();

        entity.components.set(components.Position, new components.Position(x, y));
        entity.components.set(components.Hp, new components.Hp(hp));

        return entity  
    }
}

// Main
{
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const game = {
        mouse: {
            x: null,
            y: null,
        }
    };

    // Mouse updates
    {
        function onMouseMove(e) {
            const canvasBounds = canvas.getBoundingClientRect();
            game.mouse.x = e.x - canvasBounds.x;
            game.mouse.y = e.y - canvasBounds.y;
        }
        canvas.addEventListener('mousemove', onMouseMove, false);
    }

    // Game updates
    setInterval(() => {
        // Logic
        {
            {
                if (game.mouse.x === 0.5)
                {
                    console.log(game.mouse.x);
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

            // Grid
            {
                const w = canvas.width / 20;
                const h = canvas.height / 20;

                for (let y = 0; y < 20; y++) {
                    for (let x = 0; x < 20; x++) {
                        ctx.strokeRect(x * w, y * h, w, h);
                    }
                }
            }
        }
    }, 1000 / 60);
}