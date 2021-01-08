import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { UserAnswer } from "../../actions/user";
import "../layouts/css/Question.css";
const Question = ({ question, answers, UserAnswer }) => {
  const [buttonDisable, setDisable] = useState(false);

  const ques1 = question;
  if (ques1 == null) {
    console.log("ques 1 is null");
    return <Fragment></Fragment>;
  }

  const onAnswerClick = (e) => UserAnswer(e.target.name, 6);
  return (
    <div className='Questio_Comp'>
      <div className='col-centered'>
        <Button
          color='secondary'
          fullWidth='true'
          size='large'
          href='#text-buttons'
        >
          {question}
        </Button>
      </div>
      <span className='answers'>
        {answers.map((ans, index) => (
          <button
            fullWidth='true'
            variant='contained'
            color='primary'
            style={{ margin: 5 }}
            // disabled={buttonDisable}
            name={index}
            onClick={(e) => onAnswerClick(e)}
          >
            {ans}
          </button>
        ))}
      </span>
    </div>
  );

  //   return (
  //     <Fragment>
  //       <div className="col-centered">
  //         <Button
  //           fullWidth="true"
  //           size="large"
  //           href="#text-buttons"
  //           variant="contained"
  //           color="secondary"
  //         >
  //           {qu}
  //         </Button>
  //       </div>
  //       <div>
  //         <p className="left-side">
  //           <Button
  //             fullWidth="true"
  //             variant="contained"
  //             color="primary"
  //             value="1"
  //             onClick={onAnswerClick}
  //           >
  //             {ans1}
  //           </Button>
  //         </p>
  //         <p className="right-side">
  //           <Button
  //             fullWidth="true"
  //             variant="contained"
  //             color="primary"
  //             value="2"
  //             onClick={onAnswerClick}
  //           >
  //             {ans2}
  //           </Button>
  //         </p>
  //       </div>
  //       <div>
  //         <p className="left-side">
  //           <Button
  //             variant="contained"
  //             fullWidth="true"
  //             color="primary"
  //             value="3"
  //             onClick={onAnswerClick}
  //           >
  //             {ans3}
  //           </Button>
  //         </p>
  //         <p className="right-side">
  //           <Button
  //             fullWidth="true"
  //             variant="contained"
  //             color="primary"
  //             value="4"
  //             onClick={onAnswerClick}
  //           >
  //             {ans4}
  //           </Button>
  //         </p>
  //       </div>
  //       <audio autoPlay>
  //         <source src="https://www.dropbox.com/s/z8qky594e03dyzm/file_example_MP3_700KB.mp3?raw=1" />
  //       </audio>
  //     </Fragment>
  //   );
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
