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
