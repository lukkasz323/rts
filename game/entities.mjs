import { Components } from "./components.mjs";

export const EntityFactory = {
    buildings: {
        createMine: function(x, y) {
            const entity = new Entity();
    
            entity.components.set(Components.Bounds, new Components.Bounds(x, y, 2, 2));
            entity.components.set(Components.Hp, new Components.Hp(50));
            entity.components.set(Components.Production, new Components.Production(
                10, 
                Components.Production.ResourceType.GOLD, 
                Components.Production.ResourceType.GOLD,
                5));
    
            return entity;
        }
    }
}

class Entity {
    constructor() {
        this.components = new WeakMap();
    }
}