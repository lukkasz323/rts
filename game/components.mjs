export const components = {
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