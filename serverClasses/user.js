class User {
  constructor(gameKey, group, userNumber) {
    this.gameKey = gameKey;
    this.group = group;
    this.curr_score = 0;
    this.last_answer_correctness = false;
    this.last_answer;
    this.connection;
    this.userNumber = userNumber;
    this.img;
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
      img: this.img,
    };
  }
}
module.exports = User;
