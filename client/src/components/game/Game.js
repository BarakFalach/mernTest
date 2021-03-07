import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Phase from "./Phase";
import { Redirect } from "react-router-dom";
import "../layouts/css/Game.css";
import scoreLogo from "../../assets/bottomBar/score.svg";
import playerNumLogo from "../../assets/bottomBar/playerNum.svg";
import groupLogo from "../../assets/bottomBar/group.svg";
import { saveState } from "../../localStorage.js";

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
        <img alt="Player Number" className="game-icon" src={playerNumLogo} />
        <h1 className="game-text" style={{ marginLeft: 6 }}>
          מספר משתתף:
        </h1>
        <h1 className="game-text">{name}</h1>
        <img alt="Your Score" className="game-icon" src={scoreLogo} />
        <h1 className="game-text" style={{ marginLeft: 6 }}>
          ניקודך:
        </h1>
        <h1 className="game-text">{score}</h1>

        <img alt="Group" className="game-icon" src={groupLogo} />
        <h1 className="game-text" style={{ marginLeft: 6 }}>
          קבוצתך:
        </h1>
        <h1 className="game-text">{group}</h1>
        <h1 className="game-text" style={{ marginLeft: 6 }}>
          ניקוד קבוצתך:
        </h1>
        <h1 className="game-text">4526</h1>
      </div>
    </div>
  );
};
Game.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.number.isRequired,
  group: PropTypes.string.isRequired,
  gameKey: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  score: state.user.userState.score,
  name: state.user.name,
  group: state.user.group,
  gameKey: state.user.gameKey,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, {})(Game);
