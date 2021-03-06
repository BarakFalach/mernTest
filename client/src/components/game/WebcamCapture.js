import Webcam from "react-webcam";
import { sendPicture, CameraNotAllowed } from "../../actions/user";
import PropTypes from "prop-types";
import React from "react";
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
      alreadyScreen: false,
      windowVmin: 0,
    };
    this.start = this.start.bind(this);
    this.allow = this.allow.bind(this);
    this.upWinDim = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.upWinDim);
  }

  updateWindowDimensions() {
    this.setState({
      windowVmin: Math.min(window.innerWidth, window.innerHeight) * 0.5,
    });
  }

  start() {
    this.setStatePromise({ alreadyScreen: true });
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
        }).then(() => this.setStatePromise({ alreadyScreen: false }))
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

  allow() {
    if (this.state.disabledPictue) {
      this.setStatePromise({ disabledPictue: false });
    }
  }

  updateAllow(state) {
    if (state === "denied" && document.getElementById("passPage") !== null) {
      document.getElementById("passPage").click();
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.upWinDim);
    navigator.permissions.query({ name: "camera" }).then((result) => {
      this.updateAllow(result.state);
      result.addEventListener("change", () => {
        this.updateAllow(result.state);
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.audio && (
          <audio autoPlay>
            <source type='audio/mp3' src={ScreenshotAudio} />
          </audio>
        )}
        <div className='flex-container-webcam-col'>
          <div className='header-web'>צילום תמונת משתתף</div>
          <div className='header-web-instruction' style={{ marginTop: 5 }}>
            אנא נסו למקם את הפנים במרכז אזור הצילום
          </div>
          <div className='item'>
            {!this.state.ImgExist && <div className='mark' />}
            {this.state.ImgExist ? (
              <ReactRoundedImage
                image={this.state.CaptureImage}
                roundedSize='1'
                imageHeight={this.state.windowVmin}
                imageWidth={this.state.windowVmin}
              />
            ) : (
              <div className='camera-before'>
                <Webcam
                  className='camera-before'
                  ref={this.setRef}
                  audio={false}
                  height='350'
                  onUserMedia={this.allow}
                  screenshotFormat='image/jpeg'
                />
              </div>
            )}
          </div>
          {/* <div className='item'> */}
            <div className='flex-container-webcam-row im-alone'>
                {!this.state.disabledPictue && (
                  <button
                    className='singleAnswer-web e1-web'
                    onClick={this.start}
                    disabled={this.state.alreadyScreen || this.props.flag}
                  >
                    {this.state.ImgExist ? "צלמ/י שוב" : "צלמ/י תמונה"}
                  </button>
                )}
                  <button
                    className='singleAnswer-web e3-web'
                    onClick={CameraNotAllowed()}
                    disabled={this.state.alreadyScreen || this.props.flag}
                  >
                    מעדיפ/ה לוותר
                  </button>
              </div>
              {this.state.ImgExist && (
              <button
                className='singleAnswer-web e2-web'
                onClick={sendPicture(this.state.CaptureImage)}
              >
                אשר/י תמונה
              </button>
            )}
          {/* </div> */}
        </div>
        {this.state.ShowText && (
          <div className='counter-text'>{this.state.Seconds}</div>
        )}
        <button
          id='passPage'
          style={{ visibility: "hidden" }}
          onClick={CameraNotAllowed()}
        ></button>
      </div>
    );
  }
}

WebcamCapture.propTypes = {
  sendPicture: PropTypes.func.isRequired,
  CameraNotAllowed: PropTypes.func.isRequired,
  flag: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  flag: state.user.userState.phaseProp.flag,
});

export default connect(mapStateToProps, { sendPicture, CameraNotAllowed })(
  WebcamCapture
);
