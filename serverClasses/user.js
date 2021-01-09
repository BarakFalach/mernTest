class User {
  constructor(name, gameKey, group) {
    this.name = name;
    this.gameKey = gameKey;
    this.group = group;
    this.curr_score = 0;
    this.last_answer_correctness = false;
    this.connection;
  }
  setConnection(connection) {
    this.connection = connection;
  }
  toJSON() {
    return {
      user_name: this.name,
      game_key: this.gameKey,
      group_num: this.group,
      curr_score: this.curr_score,
      last_answer_correctness: this.last_answer_correctness,
    };
  }
}
module.exports = User;
