import Webcam from "react-webcam";
import { sendPicture } from "../../actions/user";
import PropTypes from "prop-types";
import React, { Component, useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import ReactRoundedImage from "react-rounded-image";
import ScreenshotAudio from "../../assets/Screenshot.mp3";
import "../layouts/css/WebcamCapture.css";

class WebcamCapture extends React.Component {
  constructor() {
    super();
    this.state = {
      webcamRef: null,
      ShowText: false,
      Seconds: 1,
      ImgExist: false,
      CaptureImage: null,
      audio: false,
    };
    this.start = this.start.bind(this);
  }

  start() {
    this.setStatePromise({
      ImgExist: false,
      ShowText: true,
      Seconds: 3,
      audio: false,
    })
      .then(() => this.sleep(1100))
      .then(() => this.setStatePromise({ Seconds: 2 }))
      .then(() => this.sleep(1000))
      .then(() => this.setStatePromise({ Seconds: 1 }))
      .then(() => this.sleep(1000))
      .then(() => this.setStatePromise({ ShowText: false, audio: true }))
      .then(() => this.sleep(500))
      .then(() =>
        this.setStatePromise({
          ImgExist: true,
          CaptureImage: this.webcamRef.getScreenshot(),
        })
      );
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setStatePromise(state) {
    this.setState(state);
    return Promise.resolve();
  }

  setRef = (webcam) => {
    this.webcamRef = webcam;
  };

  render() {
    return (
      <div>
        {this.state.audio && (
          <audio autoPlay>
            <source type="audio/mp3" src={ScreenshotAudio} />
          </audio>
        )}
        {!this.state.ImgExist && <div className="mark" />}
        <div className="flex-container-webcam-main">
          <div className="flex-container-webcam-col">
            <Typography variant="h2">צילום תמונת משתתף</Typography>
            <Typography variant="h9" style={{ marginTop: 5 }}>
              אנא נסו למקם את הפנים במרכז האזור המסומן בעיגול
            </Typography>
            {/* </div> */}
            <div className="item">
              {this.state.ImgExist ? (
                <ReactRoundedImage
                  className="img"
                  image={this.state.CaptureImage}
                  roundedSize="1"
                  imageWidth="350"
                  imageHeight="350"
                />
              ) : (
                <Webcam
                  ref={this.setRef}
                  height="350"
                  screenshotFormat="image/jpeg"
                />
              )}
            </div>
            <div className="item">
              <button
                className="myButton"
                disabled={this.state.ShowText}
                onClick={this.start}
              >
                {this.state.ImgExist ? "צלמ/י שוב" : "צלמ/י תמונה"}
              </button>
              {this.state.ImgExist && (
                <button
                  className="myButton"
                  onClick={sendPicture(this.state.CaptureImage)}
                >
                  אשר/י תמונה
                </button>
              )}
            </div>
          </div>
        </div>
        {this.state.ShowText && (
          <div className="counter-text">{this.state.Seconds}</div>
        )}
      </div>
    );
  }
}
WebcamCapture.propTypes = {
  sendPicture: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { sendPicture })(WebcamCapture);
