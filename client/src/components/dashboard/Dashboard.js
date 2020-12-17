import React from "react";
import PropTypes from "prop-types";
import "../../App.css";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { startGame } from "../../actions/dashboard";

const Dashboard = ({ isAuthenticated, loading, logout, startGame }) => {
  console.log("ENTER DASH");
  return (
    <span>
      <h1 className='aaa'> Welcome to Dashboard </h1>
      <button onClick={logout}>LogOut</button>
      <button onClick={startGame}>StartGame</button>
    </span>
  );
};
Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout, startGame })(Dashboard);
