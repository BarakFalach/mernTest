import { KEYGAME_FAIL, KEYGAME_SUCCESS } from "../actions/types";
const initialState = {
  id: null,
  keygame: "",
  score: 0,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  const { type, keygame } = action;
  switch (type) {
    case KEYGAME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case KEYGAME_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
