import {
  START_GAME,
  GAME_PROP,
  CREATE_NEW_GAME_INSTANCE,
  USER,
} from "../actions/types";

const initialState = {
  phaseList: [],
  Gamekey: "000",
  usersData: {},
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
    case USER:
      return {
        ...state,
        usersData: payload.usersData,
      };
    default:
      return state;
  }
}
