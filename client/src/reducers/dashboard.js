import {
  START_GAME,
  GAME_PROP,
  CREATE_NEW_GAME_INSTANCE,
} from "../actions/types";

const initialState = {
  phaseList: [],
  Gamekey: "000",
};

export default function dashBoardReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_NEW_GAME_INSTANCE:
      return {
        ...state,
        phaseList: payload.phaseList,
        GameKey: payload.keyGame,
      };
    default:
      return state;
  }
}
