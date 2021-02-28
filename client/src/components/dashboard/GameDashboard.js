import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../App.css";
import { connect } from "react-redux";
import {
  ChangePhase,
  resumePause,
  startGame,
  endGame,
} from "../../actions/dashboard";
import PlayersTable from "./PlayersTable";
import "./GameDashboard.css";
//comme
const Gamedashboard = ({
  resumePause,
  ChangePhase,
  phaseList,
  GameKey,
  usersData,
  curPhase,
  numOfPlayers,
  startGame,
  controlpanel,
  endGame,
}) => {
  const [pause, setPause] = useState(false);
  const [started, setStarted] = useState(false);

  const barsKey = [
    "3",
    "65",
    "104",
    "113",
    "121",
    "125",
    "159",
    "163",
    "167",
    "169",
    "171",
    "173",
  ];

  const phaseColor = {
    question: "#264653",
    generic: "#2a9d8f",
    video: "#e9c46a",
    top3: "#f4a261",
    groups: "#e76f51",
  };

  const ScreenButton = (e) => ChangePhase(e.target.name);
  const resumePauseButton = (e) => {
    setPause(!pause);
    resumePause(e.target.name);
  };
  const startGameButton = (e) => {
    setStarted(true);
    startGame();
  };

  const endGameButton = (e) => {
    endGame();
    controlpanel(false);
  };

  return (
    <div className="flex-container-col-dashboard">
      <h1> Welcome to Game </h1>
      <h1> Game key: {GameKey} </h1>
      <h1>Total Players: {numOfPlayers}</h1>
      <h1>connected Players: {Object.keys(usersData).length}</h1>
      <div>
        <button
          name="RESUME"
          disabled={!pause}
          onClick={(e) => resumePauseButton(e)}
        >
          Resume
        </button>
        <button
          name="PAUSE"
          disabled={pause || !started}
          onClick={(e) => resumePauseButton(e)}
        >
          Pause
        </button>

        <button name="endGame" onClick={(e) => endGameButton(e)}>
          End Game
        </button>

        <button
          name="StartGame"
          disabled={started}
          onClick={(e) => startGameButton(e)}
        >
          Start Game
        </button>
      </div>

      <span className="container">
        {phaseList.map((Phase, index) => (
          <button
            key={Phase}
            name={Phase}
            disabled={!started || barsKey.indexOf(Phase) > -1}
            // color={index === curPhase ? 'blue' : 'green'}
            style={index === curPhase ? { color: "blue" } : {}}
            onClick={(e) => ScreenButton(e)}
          >
            {Phase}
          </button>
        ))}
      </span>
      <PlayersTable data={usersData} />
    </div>
  );
};
Gamedashboard.propTypes = {
  ChangePhase: PropTypes.func.isRequired,
  resumePause: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  phaseList: PropTypes.array,
  GameKey: PropTypes.string,
  usersData: PropTypes.object,
  curPhase: PropTypes.number,
  numOfPlayers: PropTypes.number,
};
const mapStateToProps = (state) => ({
  phaseList: state.dashboard.phaseList,
  GameKey: state.dashboard.GameKey,
  usersData: state.dashboard.usersData,
  curPhase: state.dashboard.curPhase,
  numOfPlayers: state.dashboard.numOfPlayers,
});
export default connect(mapStateToProps, {
  resumePause,
  ChangePhase,
  startGame,
  endGame,
})(Gamedashboard);
