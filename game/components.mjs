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

    Production: class {
        static ResourceType = {
            GOLD: 'gold',
        }

        constructor(price, priceResource, producedResource, gain) {
            this.price = price;
            this.priceResource = priceResource;
            this.producedResource = producedResource;
            this.gain = gain;
            this.progress = 0;
        }
    }
}