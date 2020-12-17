import {
  CHANGE_SCREEN,
  KEYGAME_FAIL,
  KEYGAME_SUCCESS,
  SERVER_FEEDBACK_TO_ANSWER,
} from "../actions/types";
const initialState = {
  id: null,
  keygame: "",
  score: "0",
  isAuthenticated: false,
  screen: null,
  questions: [],
};
//func name Changed from login to userReducer
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case KEYGAME_SUCCESS:
      console.log("User Reducer Fine");
      console.log(payload.questions[0]);
      return {
        ...state,
        isAuthenticated: true,
        questions: payload.questions,
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
    case SERVER_FEEDBACK_TO_ANSWER:
      return {
        score: payload.score,
      };
    default:
      return state;
  }
}
