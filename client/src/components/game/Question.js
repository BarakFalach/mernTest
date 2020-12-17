import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
// import { UserAnswer } from "../../actions/user";
const Question = ({ questions }) => {
  const ques1 = questions;
  if (ques1 == null) {
    console.log("ques 1 is null");
    return <Fragment></Fragment>;
  }
  console.log("got all QUESTIONS ");
  console.log(ques1);
  const qu = ques1[0];
  const ans1 = ques1[1];
  const ans2 = ques1[2];
  const ans3 = ques1[3];
  const ans4 = ques1[4];
  console.log(questions);

  const onAnswerClick = async (e) => {
    e.preventDefault();
    console.log("Question accomplished");
    // UserAnswer(e.target.value);
  };

  return (
    <Fragment>
      <div>{qu}</div>
      <div value='1' onClick={onAnswerClick}>
        {ans1}
      </div>
      <div value='2' onClick={onAnswerClick}>
        {ans2}
      </div>
      <div value='3' onClick={onAnswerClick}>
        {ans3}
      </div>
      <div value='4' onClick={onAnswerClick}>
        {ans4}
      </div>
    </Fragment>
  );
};
Question.propTypes = {
  questions: PropTypes.array.isRequired,
  UserAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.user.questions,
});

// export default connect(mapStateToProps, { UserAnswer })(Question);
export default connect(mapStateToProps, {})(Question);
