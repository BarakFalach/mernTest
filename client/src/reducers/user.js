import {
  KEYGAME_FAIL,
  GAME_KEY_SUCCESS,
  SERVER_FEEDBACK_TO_ANSWER,
  PHASE,
} from "../actions/types";
const initialState = {
  name: "",
  isAuthenticated: false,
  userState: { phaseProp: {} },
  group: "",
  gameKey: 0,
};
//func name Changed from login to userReducer
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GAME_KEY_SUCCESS:
      return {
        ...state,
        name: payload.name,
        group: payload.group,
        isAuthenticated: true,
        userState: payload,
        gameKey: payload.gameKey,
      };
    case KEYGAME_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case PHASE:
      return {
        ...state,
        userState: payload,
        group: payload.group,

        //TODO:: change the screen state to name of the screen and not bool
      };
    case "IMG":
      return {
        ...state,
        userState: payload,
      };
    case SERVER_FEEDBACK_TO_ANSWER:
      return {
        score: payload.score,
      };
    case "GO_DEFUALT":
      return {
        ...state,
        userState: {
          phase: "defult",
          phaseProp: {
            key: "0",
          },
        },
      };
    default:
      return state;
  }
}
