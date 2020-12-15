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
      console.log("name is " + name);
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
    };

    dispatch({
      type: KEYGAME_SUCCESS,
      keygame: keygame,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: KEYGAME_FAIL,
    });
  }
};


export const raiseScore = ({ score }) => async (dispatch) => {
  if (client != null && client.readyState === WebSocket.OPEN){  
      try {
        client.send(
          JSON.stringify({
            type: "RAISE_SCORE",
            score: score,
          })
        );
    
        client.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);
          console.log("got reply! ", dataFromServer);
        };
    
        dispatch({
          type: KEYGAME_SUCCESS,
        });
      } catch (err) {
        console.log(err.message);
        dispatch({
          type: KEYGAME_FAIL,
        });
      }
  }
};
