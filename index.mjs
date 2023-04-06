import { Game } from './game/game.mjs';

const $canvas = document.querySelector('canvas');
const $status = document.getElementById('status');
const $title = document.getElementById('title');

const game = new Game(16, $canvas, $status, $title);
game.run();