const GameView = require('./game_view.js');

window.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('game-canvas');
  let ctx = canvas.getContext("2d");
  let game = new GameView(ctx);
  game.start();
})
