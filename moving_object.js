function MovingObject(opts) {
  this.pos = opts.pos;
  this.vel = opts.vel;
  this.radius = opts.radius;
}


MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath()
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  // ctx.fillStyle = "blue"
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

module.exports = MovingObject;
