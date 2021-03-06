import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Question from "./Question";
import Bars from "./Bars";
import { Answer } from "./Answer";
import Video from "./Video";
import Top3 from "./Top3";
import { Poll } from "./Poll";
import Groups from "./Groups";
import WebcamCapture from "./WebcamCapture";
import Welcome from "./Welcome";
import GoodBye from "./GoodBye";
import DefaultScreen from "./DefaultScreen";
import GenericTrack from "./GenericTrack";
import Reconnect from "./Reconnect";
// import Goodbye from "./GoodBye";

const Phase = ({ phase, keyOfPhase }) => {
  switch (phase) {
    case "question":
      return <Question key={keyOfPhase} />; // Fix the problem of
    case "answer":
      return <Answer />;
    case "video":
      return <Video />;
    case "poll":
      return <Poll />;
    case "top3":
      return <Top3 />;
    case "groups":
      return <Groups />;
    case "bars":
      return <Bars />;
    case "webCam":
      return <WebcamCapture />;
    case "generic":
      return <GenericTrack />;
    case "goodBye":
      return <GoodBye />;
    case "welcome":
      return <Welcome />;
    case "reconnect":
      return <Reconnect />;
    default:
      return <DefaultScreen />;
  }
};

Phase.propTypes = {
  phase: PropTypes.string,
  keyOfPhase: PropTypes.string,
};
const mapStateToProps = (state) => ({
  phase: state.user.userState.phase,
  keyOfPhase: state.user.userState.phaseProp.key,
});

export default connect(mapStateToProps, {})(Phase);
