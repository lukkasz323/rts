import { clamp } from "./utils.mjs";

export class GameState {
    constructor(canvasWidth) {
        this.mouse = {
            rawX: null,
            rawY: null, 
            getX: null,
            getY: null,
        };

        this.grid = {
            cellSize: 40,
            cellCount: null,
        };

        this.resources = {};
        
        this.debug = {};
        
        this.entities = [];

        // Init
        this.mouse.getX = () => clamp(Math.floor((this.mouse.rawX) / this.grid.cellSize), 0, this.grid.cellCount - 1);
        this.mouse.getY = () => clamp(Math.floor((this.mouse.rawY) / this.grid.cellSize), 0, this.grid.cellCount - 1);
        this.grid.cellCount = canvasWidth / this.grid.cellSize;
    } 
} 