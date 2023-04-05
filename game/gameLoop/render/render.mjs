import { renderCanvas } from './canvas.mjs';
import { renderNonCanvas } from "./nonCanvas.mjs";

export function renderGame() {
    renderCanvas();
    renderNonCanvas();
} 