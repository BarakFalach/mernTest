import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/user";

const Game = ({ screen }) => {
  // switch (screen) {
  //   case "question":
  //     return <Question />;
  //   case "answer":
  //     return <Answer />;
  //   case "video":
  //     return <Video />;
  //   case "poll":
  //     return <Poll />;
  //   case "top3":
  //     return <Top3 />;
  //   default:
  //     return <h1>error</h1>;
  // }
  return <div></div>;
};

Game.propTypes = {
  screen: PropTypes.string,
};
const mapStateToProps = (state) => ({
  screen: state.user.screen,
});

export default connect(mapStateToProps, { login })(Game);
