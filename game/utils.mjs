import { Components } from "./components.mjs";

export const clamp = (x, minVal, maxVal) => Math.min(Math.max(x, minVal), maxVal);

export const pointCollides = (x, y, bounds) => 
    bounds.x <= x && x < bounds.x + bounds.w && 
    bounds.y <= y && y < bounds.y + bounds.h;
    
export const boundsCollide = (bounds1, bounds2) => 
    bounds1.x < bounds2.x + bounds2.w &&
    bounds1.y < bounds2.y + bounds2.h &&
    bounds1.x + bounds1.w > bounds2.x &&
    bounds1.y + bounds1.h > bounds2.y;

export function areaIsEmpty(checkedBounds, entities) {
    let result = true;

    entities.forEach(e => {
        if (boundsCollide(checkedBounds, e.components.get(Components.Bounds))) {
            result = false;
            return;
        }
    });

    return result;
}