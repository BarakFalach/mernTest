import { KEYGAME_SUCCESS, KEYGAME_FAIL, CHANGE_SCREEN } from "./types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { PATH, ServerPORT } from "../utils/ClientUtils";
var client;
//Login User
export const startGame = () => async (dispatch) => {
  try {
    client = new W3CWebSocket(PATH + ":" + ServerPORT);

    client.onopen = () => {
      client.send(
        JSON.stringify({
          type: CHANGE_SCREEN,
        })
      );
    };
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: KEYGAME_FAIL,
    });
  }
};
