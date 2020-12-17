import { KEYGAME_FAIL } from "./types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PATH, ServerPORT } from "../utils/ClientUtils";
var client;
//Login User
export const UserLogin = ({ name, keygame }) => async (dispatch) => {
  try {
    client = new W3CWebSocket(PATH + ":" + ServerPORT);
    client.onopen = () => {
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
      if (dataFromServer) {
        console.log("Data type from server is " + type);
        dispatch({
          type: type,
          payload: dataFromServer,
        });
      }
    };
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: KEYGAME_FAIL,
    });
  }
};

//Question Answered by user, res is int from 1 to 4
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
