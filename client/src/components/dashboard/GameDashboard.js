import React from "react";
import PropTypes from "prop-types";
import "../../App.css";
import { connect } from "react-redux";
import { ChangePhase } from "../../actions/dashboard";
import "./GameDashboard.css";
//comme
const Gamedashboard = ({ ChangePhase, phaseList, GameKey }) => {
  console.log("ENTER GameDashBoard");
  const ScreenButton = (e) => ChangePhase(e.target.name);

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
    </div>
  );
};
Gamedashboard.propTypes = {
  ChangePhase: PropTypes.func.isRequired,
  phaseList: PropTypes.array,
  GameKey: PropTypes.string,
};
const mapStateToProps = (state) => ({
  phaseList: state.dashboard.phaseList,
  GameKey: state.dashboard.GameKey,
});
export default connect(mapStateToProps, { ChangePhase })(Gamedashboard);
