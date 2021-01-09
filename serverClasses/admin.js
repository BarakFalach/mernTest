class Admin {
  constructor(id, gameKey) {
    this.id = id;
    this.gameKey = gameKey;
    this.connection;
  }
  setConnection(connection) {
    this.connection = connection;
  }
}
module.exports = Admin;
