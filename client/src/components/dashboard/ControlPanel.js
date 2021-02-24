import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import "../../App.css";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { initGame } from "../../actions/dashboard";
import GameDashboard from "./GameDashboard";
const ControlPanel = ({ name, logout, initGame }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [numOfPlayers, setPlayers] = useState(40);

  const onChange = (e) => setPlayers(e.target.value);
  const onSubmit = async (e) => {
    if (numOfPlayers === "") {
      alert("Please enter number");
    } else {
      setGameStarted(true);
      initGame(numOfPlayers, name);
    }
  };

  // const onClick = () => {
  // 	setGameStarted(true);
  // 	initGame();
  // };

  if (gameStarted) return <GameDashboard controlpanel={setGameStarted} />;

  return (
    <span>
      <h1 className="aaa"> Welcome to the Control Panel {name} </h1>
      <button onClick={logout}>LogOut</button>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="flex-container-user-col">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>Enter Num of Players:</h4>
            <TextField
              type="number"
              placeholder="num of players"
              name="numOfPlayers"
              style={{ padding: 20 }}
              value={numOfPlayers}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <button onClick={onSubmit}>init Game</button>
        </div>
      </form>
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

export default connect(mapStateToProps, { logout, initGame })(ControlPanel);
