class Controller {
  constructor() {
    this.timer;
    this.runingGame;
  }
  changePhase(time) {
    console.log(time);
    if (typeof this.timer !== "undefined") clearTimeout(this.timer);
    var that = this;
    this.timer = setTimeout(function () {
      that.runingGame.scheduler();
    }, time * 1000);
  }
  clear() {
    clearTimeout(this.timer);
  }
}
module.exports = Controller;
