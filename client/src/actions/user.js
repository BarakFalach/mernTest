import { KEYGAME_SUCCESS, KEYGAME_FAIL, CHANGE_SCREEN } from "./types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PATH, ServerPORT } from "../utils/ClientUtils";
var client;
//Login User
export const login = ({ name, keygame }) => async (dispatch) => {
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

//TODO MIGHT NEED =>async dispatch
export const UserAnswer = (answerNum, time) => async () => {
  console.log("ua " + answerNum + " t " + time);
  client.send(
    JSON.stringify({
      type: "USER_ANSWER",
      answer: answerNum,
      time: time,
    })
  );
};

export const videoEnd = () => async () => {
  client.send(
    JSON.stringify({
      type: "VIDEO_END",
    })
  );
};
