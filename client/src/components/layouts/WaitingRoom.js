import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/user";
import Question from "../game/Question";

const WaitingRoom = ({ id, login, screen, isAuthenticated }) => {
  if (screen) {
    return <Question />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Waiting Room</h1>
      <h2>welocome {id} </h2>
    </Fragment>
  );
};

WaitingRoom.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  id: PropTypes.number,
  screen: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  id: state.user.id,
  screen: state.user.screen,
});

export default connect(mapStateToProps, { login })(WaitingRoom);
