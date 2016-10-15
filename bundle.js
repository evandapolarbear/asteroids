/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	window.addEventListener("DOMContentLoaded", () => {
	  let canvas = document.getElementById('game-canvas');
	  let ctx = canvas.getContext("2d");
	  let game = new GameView(ctx);
	  game.start();
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2)

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3)
	const Ship = __webpack_require__(6)
	const Util = __webpack_require__(4)

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4)
	const MovingObject = __webpack_require__(5)

	function Asteroid(opts) {
	  this.RADIUS = 20
	  this.COLOR = "green"
	  MovingObject.call(this, {pos: opts.pos, radius: this.RADIUS, vel: opts.vel})
	}

	//
	// Asteroid.prototype.collideWith = function (otherObject) {
	//
	// }


	Util.inherits(MovingObject, Asteroid)
	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits (parent, child) {
	    function Surrogate(){}
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate;
	    child.prototype.constructor = child;
	  },

	  randomPosition (dimX, dimY) {
	    return [Math.random() * dimX, Math.random() * dimY]
	  },

	  randomVelocity () {
	    let x = Math.random() < .5 ? -1 : 1
	    let y = Math.random() < .5 ? -1 : 1
	    return [Math.random() * x, Math.random() * y]
	  }

	}




	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function MovingObject(opts) {
	  this.pos = opts.pos;
	  this.vel = opts.vel;
	  this.radius = opts.radius;
	}


	MovingObject.prototype.draw = function (ctx) {
	  ctx.beginPath()
	  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
	  ctx.fillStyle = this.COLOR
	  ctx.fill();
	}

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	}

	MovingObject.prototype.isCollideWith = function (otherObj) {
	  let xDistance = Math.abs(this.pos[0] - otherObj.pos[0]);
	  let yDistance = Math.abs(this.pos[1] - otherObj.pos[1]);
	  let distance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance))
	  if (this === otherObj) { return false }
	  return (distance < this.radius + otherObj.radius);
	};

	MovingObject.prototype.collideWith = function () {}

	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4)
	const MovingObject = __webpack_require__(5)

	function Ship(opts) {
	  this.RADIUS = 10
	  this.COLOR = "red"
	  MovingObject.call(this, {pos: opts.pos, radius: this.RADIUS, vel: [0,0]})
	}

	Ship.prototype.collideWith = function (dimX, dimY) {
	  this.relocate(dimX, dimY)
	};

	Ship.prototype.relocate = function (dimX, dimY) {
	  this.pos = Util.randomPosition(dimX, dimY)
	};


	Util.inherits(MovingObject, Ship)
	module.exports = Ship;


/***/ }
/******/ ]);