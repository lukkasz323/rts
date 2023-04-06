import { renderCanvas } from './canvas.mjs';
import { renderNonCanvas } from "./nonCanvas.mjs";

export function renderGame(gameState, $canvas, $title) {
    renderCanvas(gameState, $canvas);
    renderNonCanvas(gameState, $title);
} 