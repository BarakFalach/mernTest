import { KEYGAME_SUCCESS, KEYGAME_FAIL } from "./types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PATH, ServerPORT } from "../utils/ClientUtils";
var client;
//Login User
export const login = ({ name, keygame }) => async (dispatch) => {
  try {
    client = new W3CWebSocket(PATH + ":" + ServerPORT);
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
      console.log("got reply! ", dataFromServer);
      if (dataFromServer.type === "message") {
        this.setState((state) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.msg,
              user: dataFromServer.user,
            },
          ],
        }));
      }
    };

    dispatch({
      type: KEYGAME_SUCCESS,
      keygame: keygame,
    });
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

// //LOGOUT Admin
// export const logout = () => (dispatch) => {
//   dispatch({
//     type: LOGOUT,
//   });
// };
