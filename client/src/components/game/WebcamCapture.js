import Webcam from "react-webcam";
import { connect } from "react-redux";
import { sendPicture } from "../../actions/user";
import PropTypes from "prop-types";

import React, { Component, useState, useEffect } from "react";

const WebcamCapture = ({ sendPicture, img }) => {
  const [toCapture, setToCapture] = useState(false);

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    sendPicture(imageSrc);
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
      {img && <img src={img} />}
    </>
  );
};
WebcamCapture.prototype = {
  sendPicture: PropTypes.func.isRequired,
  img: PropTypes.string,
};
const mapStateToProps = (state) => ({
  img: state.user.userState.img,
});
export default connect(mapStateToProps, { sendPicture })(WebcamCapture);
