class User {
  constructor(gameKey, group, userNumber) {
    this.gameKey = gameKey;
    this.group = group;
    this.curr_score = 0;
    this.last_answer_correctness = false;
    this.last_answer = 0;
    this.last_time;
    this.connection;
    this.userNumber = userNumber;
    this.img = "0";
    this.webCam = false;
  }
  setConnection(connection) {
    this.connection = connection;
  }
  toJSON() {
    return {
      userNumber: this.userNumber,
      game_key: this.gameKey,
      group_num: this.group,
      curr_score: this.curr_score,
      last_answer_correctness: this.last_answer_correctness,
    };
  }
  topToJSON() {
    return {
      userNumber: this.userNumber,
      curr_score: this.curr_score,
      img: this.img,
    };
  }
}
module.exports = User;
