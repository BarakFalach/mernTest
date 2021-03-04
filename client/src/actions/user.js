import { KEYGAME_FAIL, PHASE } from "./types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PATH, ServerPORT } from "../utils/ClientUtils";
var client;
//Login User
export const login = ({ number, gameKey }) => async (dispatch) => {
  try {
    client = new W3CWebSocket(PATH + ":" + ServerPORT);

    client.onopen = () => {
      client.send(
        JSON.stringify({
          type: number ? "USER_RECONNECT" : "REQ_USER_LOGIN",
          playerNumber: number,
          gameKey: gameKey,
        })
      );
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const type = dataFromServer.type;
      // console.log("got reply! ", dataFromServer);
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

export const UserAnswer = (answerNum, time, quesNum) => async () => {
  // console.log(answerNum, time, quesNum);
  client.send(
    JSON.stringify({
      type: "USER_ANSWER",
      answer: answerNum,
      time: time,
      key: quesNum,
    })
  );
};

export const videoEnd = () => async (dispatch) => {
  dispatch({
    type: "GO_DEFUALT",
  });
};

export const sendPicture = (imgSrc) => async () => {
  client.send(
    JSON.stringify({
      type: "IMG",
      img: imgSrc,
    })
  );
};

export const CameraNotAllowed = () => async () => {
  client.send(
    JSON.stringify({
      type: "CAMERA_NOT_ALLOWED",
    })
  );
};
