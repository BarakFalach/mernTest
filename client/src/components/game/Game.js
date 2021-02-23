import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Phase from "./Phase";
import { Redirect } from "react-router-dom";
import "../layouts/css/Game.css";
import scoreLogo from "../../assets/bottomBar/score.svg";
import playerNumLogo from "../../assets/bottomBar/playerNum.svg";
import groupLogo from "../../assets/bottomBar/group.svg";
const Game = ({ score, name, group }) => {
  return (
    <div>
      <div className='game-fullscreen'>
        <Phase />
      </div>
      <div className='bottomBar'>
        <img className='game-icon' src={scoreLogo} alt='scoreLogo' />
        <h1 className='game-text'>{score}</h1>
        <img className='game-icon' src={playerNumLogo} />
        <h1 className='game-text'>{name}</h1>
        <img className='game-icon' src={groupLogo} />
        <h1 className='game-text'>{group}</h1>
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
};
const mapStateToProps = (state) => ({
  score: state.user.userState.score,
  name: state.user.name,
  group: state.user.group,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Game);
