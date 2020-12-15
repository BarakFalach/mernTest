import { CHANGE_SCREEN, KEYGAME_FAIL, KEYGAME_SUCCESS } from "../actions/types";
const initialState = {
  id: null,
  keygame: "",
  score: 0,
  isAuthenticated: false,
  screen: null,
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  console.log("userReduce" + type);
  switch (type) {
    case KEYGAME_SUCCESS:
      return {
        ...state,
        id: payload.id,
        isAuthenticated: true,
        keygame: payload.keygame,
        score: 1,
      };
    case KEYGAME_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case CHANGE_SCREEN:
      return {
        ...state,
        screen: true,
        //TODO:: change the screen state to name of the screen and not bool
      };
    default:
      return state;
  }
}
