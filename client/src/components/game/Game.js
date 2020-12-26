import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Phase from "./Phase";
// import { Question } from "./Question";

const Game = ({ score, name }) => {
  return (
    <Fragment>
      <h1>
        {" "}
        welcome {name} you current score is: {score}
      </h1>
      <div>
        <Phase />
      </div>
    </Fragment>
  );
};
Game.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
};
const mapStateToProps = (state) => ({
  score: state.user.score,
  name: state.user.name,
});

export default connect(mapStateToProps, {})(Game);
