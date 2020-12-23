import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { UserAnswer } from "../../actions/user";
import "../layouts/css/Question.css";
const Question = ({ UserAnswer, questions }) => {
  const startTime = new Date().getTime();
  const ques1 = questions;
  if (ques1 == null) {
    console.log("ques 1 is null");
    return <Fragment></Fragment>;
  }
  const qu = ques1[0];
  const ans1 = ques1[1];
  const ans2 = ques1[2];
  const ans3 = ques1[3];
  const ans4 = ques1[4];
  console.log(questions);

  const onAnswerClick = async (e) => {
    const finishTime = new Date().getTime() - startTime;
    UserAnswer(e.target.value, finishTime);
  };

  return (
    <Fragment>
      <div className='col-centered'>
        <Button
          fullWidth='true'
          size='large'
          href='#text-buttons'
          variant='contained'
          color='secondary'
        >
          {qu}
        </Button>
      </div>
      <div>
        <p className='left-side'>
          <Button
            fullWidth='true'
            variant='contained'
            color='primary'
            value='1'
            onClick={onAnswerClick}
          >
            {ans1}
          </Button>
        </p>
        <p className='right-side'>
          <Button
            fullWidth='true'
            variant='contained'
            color='primary'
            value='2'
            onClick={onAnswerClick}
          >
            {ans2}
          </Button>
        </p>
      </div>
      <div>
        <p className='left-side'>
          <Button
            variant='contained'
            fullWidth='true'
            color='primary'
            value='3'
            onClick={onAnswerClick}
          >
            {ans3}
          </Button>
        </p>
        <p className='right-side'>
          <Button
            fullWidth='true'
            variant='contained'
            color='primary'
            value='4'
            onClick={onAnswerClick}
          >
            {ans4}
          </Button>
        </p>
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
export default connect(mapStateToProps, { UserAnswer })(Question);
