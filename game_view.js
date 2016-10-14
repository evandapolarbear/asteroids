const Game = require('./game.js')

function GameView(ctx) {
  this.ctx = ctx;
  this.game = new Game;
  this.game.addAsteroids()
}


GameView.prototype.start = function () {
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;
