import { START_GAME, GAME_PROP } from "../actions/types";

const initialState = {
  videoNames: ["errorVideo"],
  questionNames: ["errorQuestion"],
  Gamekey: "000",
};

export default function dashBoardReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GAME_PROP:
      return {
        ...state,
        videoNames: payload.Video,
        questionNames: payload.Q,
        GameKey: payload.Game_key,
      };
    default:
      return state;
  }
}
