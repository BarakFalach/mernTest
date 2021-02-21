import Webcam from "react-webcam";
import { sendPicture, CameraNotAllowed } from "../../actions/user";
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
    disabledPictue: true,
    notAllowed: false,
    };
	this.start = this.start.bind(this);
  this.allow = this.allow.bind(this);
  // this.checkPermissions = this.checkPermissions.bind(this);
  }
  
  //  componentDidMount(){
  //   setTimeout(() => {
  //     this.checkPermissions();
  //   }, 3000);
  // }

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

  // checkPermissions() {
  //   navigator.permissions.query({name:'camera'}).then(this.hi(result));//function(result){
  //   //     if (result.state == 'granted') {
  //   //       // showLocalNewsWithGeolocation();
  //   //     } else if (result.state == 'prompt') {
  //   //       // showButtonToEnableLocalNews();
  //   //     }
  //   //     else if (result.state == 'denied') {
  //   //       this.setStatePromise({notAllowed: true});
  //   //       alert("Fuck");
  //   //     }
  //   // });
  // };

  notAllowed() {
    this.props.CameraNotAllowed();
  };

  allow(){
    if (this.state.disabledPictue){
      this.setStatePromise(({disabledPictue: false}))
    }
  };

  notAllowed() {
    this.props.CameraNotAllowed();
  };

  render() {    
    
    function updateAllow(state) {
      if(state === 'denied'){
        document.getElementById('passPage').click();
      }
    }
    
    navigator.permissions.query({ name: 'camera' }).then((result) => {
      updateAllow(result.state);
      result.addEventListener('change', () => {
        updateAllow(result.state);
      });
    });

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
                  audio={false}
                  height="350"
                  onUserMedia={this.allow}
                  screenshotFormat="image/jpeg"
                />
              )}
            </div>
            <div className="item">
              {!this.state.disabledPictue &&
			  <button
                className="myButton"
                // disabled={this.state.ShowText}
                onClick={this.start}
                disabled={this.state.disabledPictue}
              >
            	{this.state.ImgExist ? "צלמ/י שוב" : "צלמ/י תמונה"}
              </button>}
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
      <button id="passPage" style={{visibility: "hidden"}} onClick={CameraNotAllowed()}></button>
      </div>
    );
  }
}


WebcamCapture.propTypes = {
  sendPicture: PropTypes.func.isRequired,
  CameraNotAllowed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { sendPicture, CameraNotAllowed })(WebcamCapture);
