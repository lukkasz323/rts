export const entityFactory = {
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