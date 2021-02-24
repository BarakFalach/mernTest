import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Phase from "./Phase";
import { Redirect } from "react-router-dom";
import "../layouts/css/Game.css";
import scoreLogo from "../../assets/bottomBar/score.svg";
import playerNumLogo from "../../assets/bottomBar/playerNum.svg";
import groupLogo from "../../assets/bottomBar/group.svg";
import { login } from "../../actions/user";
import { saveState } from "../../localStorage.js";
import { BrandingWatermark } from "@material-ui/icons";

const Game = ({ score, name, group, gameKey, login, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/loginUser" />;
  }

  saveState({ number: name, gameKey: gameKey });

  return (
    <div>
      <div className="game-fullscreen">
        <Phase />
      </div>
      <div className="bottomBar">
        <img className="game-icon" src={scoreLogo} alt="scoreLogo" />
        <h1 className="game-text">{score}</h1>
        <img className="game-icon" src={playerNumLogo} />
        <h1 className="game-text">{name}</h1>
        <img className="game-icon" src={groupLogo} />
        <h1 className="game-text">{group}</h1>
      </div>
    </div>
  );
};
Game.propTypes = {
  isAuthenticated: PropTypes.bool,
  score: PropTypes.number,
  name: PropTypes.number,
  group: PropTypes.string,
  login: PropTypes.func,
  gameKey: PropTypes.number,
};
const mapStateToProps = (state) => ({
  score: state.user.userState.score,
  name: state.user.name,
  group: state.user.group,
  gameKey: state.user.gameKey,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, {})(Game);
