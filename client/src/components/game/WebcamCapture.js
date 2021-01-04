import Webcam from "react-webcam";
import React from "react";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamCapture = () => <Webcam />;
export default WebcamCapture;
