import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { UserAnswer } from "../../actions/user";
const Question = ({ question, answers, UserAnswer }) => {
  const ques1 = question;
  if (ques1 == null) {
    console.log("ques 1 is null");
    return <Fragment></Fragment>;
  }
  const qu = question;
  const ans1 = answers[0];
  const ans2 = answers[1];
  const ans3 = answers[2];
  const ans4 = answers[3];

  const onAnswerClick = async (e) => {
    e.preventDefault();
    console.log("Question accomplished");
    UserAnswer(e.target.value);
  };

  return (
    <Fragment>
      <div>{qu}</div>
      <div value="1" onClick={onAnswerClick}>
        {ans1}
      </div>
      <div value="2" onClick={onAnswerClick}>
        {ans2}
      </div>
      <div value="3" onClick={onAnswerClick}>
        {ans3}
      </div>
      <div value="4" onClick={onAnswerClick}>
        {ans4}
      </div>
    </Fragment>
  );
};
Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array,
  time: PropTypes.number,
  UserAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.user.userState.phaseProp.question,
  answers: state.user.userState.phaseProp.answers,
  time: state.user.userState.phaseProp.time,
});

// export default connect(mapStateToProps, { UserAnswer })(Question);
export default connect(mapStateToProps, { UserAnswer })(Question);
