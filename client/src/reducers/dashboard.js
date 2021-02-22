import { CREATE_NEW_GAME_INSTANCE, USER, PHASE } from '../actions/types';

const initialState = {
	phaseList: [],
	Gamekey: '000',
	usersData: {},
	numOfPlayers: 0,
	curPhase: -1,
};

export default function dashBoardReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CREATE_NEW_GAME_INSTANCE:
			return {
				...state,
				phaseList: payload.phaseList,
				GameKey: payload.keyGame,
				numOfPlayers: payload.numOfPlayers,
			};
		case USER:
			return {
				...state,
				usersData: payload.usersData,
			};
		case PHASE:
			return {
				...state,
				curPhase: payload.phaseIndex,
			};
		default:
			return state;
	}
}
