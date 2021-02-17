import Webcam from "react-webcam";

import React, { Component, useState, useEffect } from "react";

const WebcamCapture = () => {
  const [toCapture, setToCapture] = useState(false);

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  // if (toCapture){capture()}

  useEffect(() => {
    setTimeout(() => {
      capture();
    }, 10000);
  });
  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      {/* <button onClick={capture}>Capture photo</button> */}
      {imgSrc && <img src={imgSrc} />}
    </>
  );
};
export default WebcamCapture;

// https://www.npmjs.com/package/react-webcam
