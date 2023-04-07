import { Components } from "./components.mjs";

export const pointCollides = (x, y, bounds) => 
    bounds.x <= x && x < bounds.x + bounds.w && 
    bounds.y <= y && y < bounds.y + bounds.h;
    
export const boundsCollide = (bounds1, bounds2) => 
    bounds1.x < bounds2.x + bounds2.w &&
    bounds1.y < bounds2.y + bounds2.h &&
    bounds1.x + bounds1.w > bounds2.x &&
    bounds1.y + bounds1.h > bounds2.y;

export const boundsOutOfGrid = (checkedBounds, gridScale) => 
    // Checks only positive coordinates!
    checkedBounds.x + checkedBounds.w > gridScale ||
    checkedBounds.y + checkedBounds.h > gridScale;

export function areaIsAllowed(checkedBounds, entities, gridScale) {
    if (boundsOutOfGrid(checkedBounds, gridScale)) {
        return false;
    }

    for (const e of entities) {
        if (boundsCollide(checkedBounds, e.components.get(Components.Bounds))) {
            return false;
        }
    }

    return true;
}