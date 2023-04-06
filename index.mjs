import { Game } from './game/game.mjs';
import { GameState } from './game/gameState.mjs';

const $canvas = document.querySelector('canvas');
const $status = document.getElementById('status');
const $title = document.getElementById('title');

const game = new Game($canvas, $status, $title);
game.run();