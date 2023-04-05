import { runGame } from './game';

const $canvas = document.querySelector('canvas');
const $status = document.getElementById('status');
const $title = document.getElementById('title');

runGame($canvas, $status, $title);