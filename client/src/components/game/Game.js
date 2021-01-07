import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Phase from "./Phase";
// import { Question } from "./Question";
// document.body.style.backgroundColor = "#2d4059";

const Game = ({ score, name, group }) => {
  return (
    <Fragment>
      <h1>
        {" "}
        welcome {name} you current score is: {score} groupNumer : {group}
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
  group: PropTypes.string,
};
const mapStateToProps = (state) => ({
  score: state.user.userState.score,
  name: state.user.name,
  group: state.user.group,
});

export default connect(mapStateToProps, {})(Game);
