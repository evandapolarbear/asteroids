const Asteroid = require('./asteroid.js')

function Game() {
  this.DIM_X = 600;
  this.DIM_Y = 600;
  this.NUM_ASTEROIDS = 10;
}

Game.prototype.addAsteroids = function() {
  this.asteroids = []

  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({vel: this.randomVelocity(), pos: this.randomPosition()}));
  }
}

Game.prototype.randomPosition = function() {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y]
}

Game.prototype.randomVelocity = function() {
  let x = Math.random() < .5 ? -1 : 1
  let y = Math.random() < .5 ? -1 : 1
  return [Math.random() * x, Math.random() * y]
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
  this.asteroids.forEach(ast => {
    ast.draw(ctx);
  });
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.asteroids.length; i++) {
    let cur = this.asteroids[i];
    this.asteroids.forEach((ast, idx) => {
      // console.log();
      if (cur.isCollideWith(ast)) {
        this.asteroids.splice(i, 1);
        this.asteroids.splice(this.asteroids.indexOf(ast));
      }
    })
  }
};


module.exports = Game;
