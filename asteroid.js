const Util = require('./utils.js')
const MovingObject = require('./moving_object.js')

function Asteroid(opts) {
  this.RADIUS = 20
  this.COLOR = "green"
  MovingObject.call(this, {pos: opts.pos, radius: this.RADIUS, vel: opts.vel})

}


Util.inherits(MovingObject, Asteroid)
module.exports = Asteroid;
