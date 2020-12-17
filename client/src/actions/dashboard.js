import {
  KEYGAME_SUCCESS,
  KEYGAME_FAIL,
  CHANGE_SCREEN,
  START_GAME,
} from "./types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PATH, ServerPORT } from "../utils/ClientUtils";
var client;
//Start Game Admin
export const startGame = () => async (dispatch) => {
  try {
    client = new W3CWebSocket(PATH + ":" + ServerPORT);

    client.onopen = () => {
      client.send(
        JSON.stringify({
          type: START_GAME,
        })
      );
    };
    // get The Game Properties
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const type = dataFromServer.type;
      if (dataFromServer) {
        dispatch({
          type: type,
          payload: dataFromServer,
        });
      }
    };
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: KEYGAME_FAIL, //TODO:: change to more reasonable Error
    });
  }
};

export const ChangeScreen = (screenType, screenName = "") => async (
  dispatch
) => {
  try {
    client.send(
      JSON.stringify({
        type: CHANGE_SCREEN, //TODO::need to write func in server.
        screen: screenType,
        screenName: screenName,
      })
    );
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: KEYGAME_FAIL, //TODO:: change to more reasonable Error
    });
  }
};
