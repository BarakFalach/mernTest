import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../App.css";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { startGame } from "../../actions/dashboard";
import GameDashboard from "./GameDashboard";

const ControlPanel = ({ name, logout, startGame }) => {
  console.log("ENTER DASH");
  const [gameStarted, setgameStarted] = useState(false);

  const onClick = () => {
    setgameStarted(true);
    startGame();
  };

  if (gameStarted) return <GameDashboard />;

  return (
    <span>
      <h1 className="aaa"> Welcome to the Control Panel {name} </h1>
      <button onClick={logout}>LogOut</button>
      <button onClick={onClick}>StartGame1</button>
    </span>
  );
};
ControlPanel.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, //TODO:: DELETE THIS
  name: state.auth.name,
});

export default connect(mapStateToProps, { logout, startGame })(ControlPanel);
