export const Components = {
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

    Currency: class {
        constructor(price, type) {
            this.price = price;
            this.type = type;
        }
    },

    Production: class {
        constructor(resource, gain) {
            this.resource = resource;
            this.gain = gain;
            this.progress = 0;
        }
    },
}