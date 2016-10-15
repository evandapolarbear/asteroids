const Util = require('./utils.js')
const MovingObject = require('./moving_object.js')

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
