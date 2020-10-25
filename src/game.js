const games = {};

class Player {
	constructor(name, color, playerID, gameID) {
		this.name = name;
		this.color = color;
		this.playerID = playerID;
		this.gameID = gameID;
	}
}
const addPlayer = ({ gameID, name, playerID }) => {
	if (!games[gameID]) {
		const color = Math.random() <= 0.5 ? 'w' : 'b';
		const player = new Player(name, color, playerID, gameID);
		games[gameID] = [player];
		return {
			message: 'Joined successfully',
			opponent: null,
			player,
		};
	}

	if (games[gameID].length >= 2) {
		return { error: 'This game is full' };
	}

	const opponent = games[gameID][0];
	const color = opponent.color === 'w' ? 'b' : 'w';
	const player = new Player(name, color, playerID, gameID);
	games[gameID].push(player);

	console.log(games);

	return {
		message: 'Added successfully',
		opponent,
		player,
	};
};

const removePlayer = (playerID) => {
	for (const game in games) {
		let players = games[game];
		const index = players.findIndex((pl) => pl.playerID === playerID);
		console.log({ players, index });

		if (index !== -1) {
			return players.splice(index, 1)[0];
		}
	}
};
const game = (id) => games[id];
module.exports = {
	addPlayer,
	game,
	removePlayer,
};
