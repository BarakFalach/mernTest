import {
  START_GAME,
  GAME_PROP,
  CREATE_NEW_GAME_INSTANCE,
} from "../actions/types";

const initialState = {
  videoNames: ["errorVideo"],
  questionNames: ["errorQuestion"],
  Gamekey: "000",
};

export default function dashBoardReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_NEW_GAME_INSTANCE:
      return {
        ...state,
        videoNames: payload.Video,
        questionNames: payload.Q,
        GameKey: payload.keyGame,
      };
    default:
      return state;
  }
}
