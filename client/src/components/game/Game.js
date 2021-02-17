import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Phase from "./Phase";
import "../layouts/css/Game.css";
import scoreLogo from "../../assets/bottomBar/score.svg";
import playerNumLogo from "../../assets/bottomBar/playerNum.svg";
import groupLogo from "../../assets/bottomBar/group.svg";

// import { Question } from "./Question";
// document.body.style.backgroundColor = "#2d4059";

const Game = ({ score, name, group }) => {
  return (
    <Fragment>
      <div>
        <Phase/>
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
  score: PropTypes.number,
  name: PropTypes.string,
  group: PropTypes.string,
};
const mapStateToProps = (state) => ({
  score: state.user.userState.score,
  name: state.user.name,
  group: state.user.group,
});

export default connect(mapStateToProps, {})(Game);
