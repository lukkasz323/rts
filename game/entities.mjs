import { Components } from "./components.mjs";
import { ResourceType } from "./enums.mjs";

export const EntityFactory = {
    buildings: {
        createMine: function(x, y, idContainer) {
            const entity = new Entity(idContainer);
    
            entity.components.set(Components.Bounds, new Components.Bounds(x, y, 2, 2));
            entity.components.set(Components.Currency, new Components.Currency(10, ResourceType.GOLD));
            entity.components.set(Components.Production, new Components.Production(ResourceType.GOLD, 5));
            entity.components.set(Components.Hp, new Components.Hp(50));
    
            return entity;
        }
    },

    units: {
        createMelee: function(x, y, idContainer) {
            const entity = new Entity(idContainer);

            entity.components.set(Components.Bounds, new Components.Bounds(x, y, 1, 1));
            entity.components.set(Components.Currency, new Components.Currency(2, ResourceType.GOLD));
            entity.components.set(Components.Hp, new Components.Hp(10));
            entity.components.set(Components.Combat, new Components.Combat(8));

            return entity;
        }
    }
}

class Entity {
    constructor(idContainer) {
        this.id = idContainer.id++;
        this.components = new WeakMap();
    }
}