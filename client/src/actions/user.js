import { KEYGAME_SUCCESS, KEYGAME_FAIL, CHANGE_SCREEN } from "./types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PATH, ServerPORT } from "../utils/ClientUtils";
var client;
//Login User
export const login = ({ name, keygame }) => async (dispatch) => {
  try {
    console.log("Baraka");
    client = new W3CWebSocket(PATH + ":" + ServerPORT);
    console.log("Baraka2");

    client.onopen = () => {
      console.log("WebSocket Client Connected");
      console.log("name is" + name);
      console.log("keygame is" + keygame);
      client.send(
        JSON.stringify({
          type: "REQ_USER_LOGIN",
          name: name,
          keygame: keygame,
        })
      );
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const type = dataFromServer.type;
      console.log("got reply! ", dataFromServer);
      if (dataFromServer) {
        dispatch({
          type: type,
          payload: dataFromServer,
        });
      }
    };
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
    console.log(err.message);
    dispatch({
      type: KEYGAME_FAIL,
    });
  }
};

export const UserAnswer = (res) => async (dispatch) => {
  const ansAsJSON = JSON.stringify({
    type: "USER_ANSWER",
    answer: res,
    time: 3,
  });
  dispatch({});
  client.send(ansAsJSON);
};

// //LOGOUT Admin
// export const logout = () => (dispatch) => {
//   dispatch({
//     type: LOGOUT,
//   });
// };
