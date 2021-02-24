import { KEYGAME_FAIL, PHASE, CREATE_NEW_GAME_INSTANCE } from "./types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PATH, ServerPORT } from "../utils/ClientUtils";
var client;
//Start Game Admin
export const initGame = (numOfPlayers = 40, name) => async (dispatch) => {
  try {
    client = new W3CWebSocket(PATH + ":" + ServerPORT);
    client.onopen = () => {
      client.send(
        JSON.stringify({
          type: CREATE_NEW_GAME_INSTANCE,
          numOfPlayers: numOfPlayers,
          name: name,
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

export const ChangePhase = (phaseName = "") => async (dispatch) => {
  try {
    client.send(
      JSON.stringify({
        type: PHASE,
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

export const resumePause = (resumeOrPause) => async (dispatch) => {
  console.log(resumeOrPause);
  try {
    client.send(
      JSON.stringify({
        type: resumeOrPause, //TODO::need to write func in server.
      })
    );
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: KEYGAME_FAIL, //TODO:: change to more reasonable Error
    });
  }
};
export const startGame = () => async () => {
  try {
    client.send(
      JSON.stringify({
        type: "START_GAME",
      })
    );
  } catch (err) {
    console.log(err);
  }
};
export const endGame = () => async () => {
  try {
    client.send(
      JSON.stringify({
        type: "END_GAME",
      })
    );
  } catch (err) {
    console.log(err);
  }
};
