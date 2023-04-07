import { ResourceType } from "./enums.mjs";
import { clamp } from "./utils.mjs";

export class GameState {
    constructor(gridScale, $canvas) {
        this.mouse = {
            rawX: null,
            rawY: null, 
            getX: () => clamp(Math.floor((this.mouse.rawX) / this.grid.getCellW()), 0, this.grid.scale - 1),
            getY: () => clamp(Math.floor((this.mouse.rawY) / this.grid.getCellH()), 0, this.grid.scale - 1),
        };

        this.grid = {
            scale: clamp(gridScale, 2, 128),
            getCellW: () => $canvas.width / this.grid.scale,
            getCellH: () => $canvas.height / this.grid.scale,
        };

        this.resources = {};
        this.resources[ResourceType.GOLD] = 10;
        
        this.debug = {};
        
        this.entities = [];
    } 
} 