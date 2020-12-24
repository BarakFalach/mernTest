import React from "react";
import PropTypes from "prop-types";
import "../../App.css";
import { connect } from "react-redux";
import { ChangePhase } from "../../actions/dashboard";
import "./GameDashboard.css";
//comme
const Gamedashboard = ({ ChangePhase, questionNames, videoNames, GameKey }) => {
  console.log("ENTER GameDashBoard");
  const ScreenButton = (e) => ChangePhase(e.target.className, e.target.name);
  return (
    <div className="out">
      <h1> Welcome to Game </h1>
      <h1> Game key: {GameKey} </h1>
      <span className="container">
        {questionNames.map((Q) => (
          <button
            key={Q}
            className="Question"
            name={Q}
            onClick={(e) => ScreenButton(e)}
          >
            {Q}
          </button>
        ))}
      </span>
      <span className="container">
        {videoNames.map((video) => (
          <button
            key={video}
            className="video"
            name={video}
            onClick={(e) => ScreenButton(e)}
          >
            {video}
          </button>
        ))}
      </span>
    </div>
  );
};
Gamedashboard.propTypes = {
  ChangePhase: PropTypes.func.isRequired,
  videoNames: PropTypes.array,
  questionNames: PropTypes.array,
  GameKey: PropTypes.string,
};
const mapStateToProps = (state) => ({
  videoNames: state.dashboard.videoNames,
  questionNames: state.dashboard.questionNames,
  GameKey: state.dashboard.GameKey,
});
export default connect(mapStateToProps, { ChangePhase })(Gamedashboard);
