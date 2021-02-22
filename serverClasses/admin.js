class Admin {
	constructor(id, gameKey) {
		this.id = id;
		this.gameKey = gameKey;
		this.connection;
		this.active = true;
		this.currentActiveGames;
	}
	setConnection(connection) {
		this.connection = connection;
	}
}
module.exports = Admin;
