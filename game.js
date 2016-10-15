const Asteroid = require('./asteroid.js')
const Ship = require('./ship.js')
const Util = require('./utils.js')

function Game() {
  this.DIM_X = 2000;
  this.DIM_Y = 2000;
  this.NUM_ASTEROIDS = 100;
  this.ship = new Ship({pos: Util.randomPosition(this.DIM_X, this.DIM_Y)});
}

Game.prototype.addAsteroids = function() {
  this.asteroids = []

  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({vel: Util.randomVelocity(),
              pos: Util.randomPosition(this.DIM_X, this.DIM_Y)}));
  }
}
Game.prototype.allObjects = function() {
  return [...this.asteroids, this.ship]
}

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions()
};

Game.prototype.wrap = function (pos) {
  if (pos[0] > this.DIM_X) {
    return [0, pos[1]]
  } else if (pos[0] < 0) {
    return [this.DIM_X, pos[1]]
  } else if (pos[1] > this.DIM_Y) {
    return [pos[0], 0]
  } else if (pos[1] < 0) {
    return [pos[0], this.DIM_Y]
  }
  return pos;
}


Game.prototype.moveObjects = function () {

  this.asteroids.forEach(ast => {
    this.checkCollisions()
    ast.pos = this.wrap(ast.pos);
    ast.move();
  });
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y)
  this.allObjects().forEach(ast => {
    ast.draw(ctx);
  });
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.asteroids.length; i++) {
    let cur = this.asteroids[i];
    if (cur.isCollideWith(this.ship)) {
      this.ship.collideWith(this.DIM_X, this.DIM_Y)
        // this.asteroids.splice(i, 1);
        // this.asteroids.splice(this.asteroids.indexOf(ast));
    }
  }
};


module.exports = Game;
