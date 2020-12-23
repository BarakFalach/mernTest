import {
  KEYGAME_SUCCESS,
  KEYGAME_FAIL,
  PHASE,
  CREATE_NEW_GAME_INSTANCE,
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
          type: CREATE_NEW_GAME_INSTANCE,
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

export const ChangePhase = (phaseType, phaseName = "") => async (dispatch) => {
  try {
    client.send(
      JSON.stringify({
        type: PHASE, //TODO::need to write func in server.
        phase: phaseType,
        phaseName: phaseName,
      })
    );
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: KEYGAME_FAIL, //TODO:: change to more reasonable Error
    });
  }
};
