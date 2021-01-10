import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../App.css";
import { connect } from "react-redux";
import { ChangePhase, resumePause } from "../../actions/dashboard";
import PlayersTable from "./PlayersTable";
import "./GameDashboard.css";
//comme
const Gamedashboard = ({
  resumePause,
  ChangePhase,
  phaseList,
  GameKey,
  usersData,
}) => {
  const [pause, setPause] = useState(false);

  console.log("ENTER GameDashBoard");
  const ScreenButton = (e) => ChangePhase(e.target.name);
  const resumePauseButton = (e) => {
    setPause(!pause);
    resumePause(e.target.name);
  };

  return (
    <div className="out">
      <h1> Welcome to Game </h1>
      <h1> Game key: {GameKey} </h1>
      <span className="container">
        {phaseList.map((Phase) => (
          <button key={Phase} name={Phase} onClick={(e) => ScreenButton(e)}>
            {Phase}
          </button>
        ))}
      </span>
      <span>
        <button
          name="RESUME"
          disabled={!pause}
          onClick={(e) => resumePauseButton(e)}
        >
          Resume
        </button>
        <button
          name="PAUSE"
          disabled={pause}
          onClick={(e) => resumePauseButton(e)}
        >
          Pause
        </button>
      </span>
      <PlayersTable data={usersData} />
    </div>
  );
};
Gamedashboard.propTypes = {
  ChangePhase: PropTypes.func.isRequired,
  resumePause: PropTypes.func.isRequired,
  phaseList: PropTypes.array,
  GameKey: PropTypes.string,
  usersData: PropTypes.object,
};
const mapStateToProps = (state) => ({
  phaseList: state.dashboard.phaseList,
  GameKey: state.dashboard.GameKey,
  usersData: state.dashboard.usersData,
});
export default connect(mapStateToProps, { resumePause, ChangePhase })(
  Gamedashboard
);
