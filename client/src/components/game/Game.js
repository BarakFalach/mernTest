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

// import { Question } from "./Question";
// document.body.style.backgroundColor = "#2d4059";

const Game = ({ score, name, group, gameKey, login, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/loginUser" />;
  }

  // saveState({ name: "barak", gameKey: 1, isAuthenticated: true });

  saveState({ number: name, gameKey: gameKey });

  return (
    <Fragment>
      <div>
        <Phase />
      </div>

      <div className="bottomBar">
        <h1 className="text">{group}</h1>
        <img className="group" src={groupLogo} />
        <h1 className="text">{name}</h1>
        <img className="icon" src={playerNumLogo} />
        <h1 className="text">{score}</h1>
        <img className="icon" src={scoreLogo} alt="scoreLogo" />
      </div>
    </Fragment>
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

export default connect(mapStateToProps, { login })(Game);
