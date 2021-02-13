import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { UserAnswer } from "../../actions/user";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Typography from "@material-ui/core/Typography";
import KeyboardEventHandler from "react-keyboard-event-handler";
import "../layouts/css/Question.css";
const Question = ({ question, answers, time, UserAnswer }) => {
  var t0 = performance.now();
  const indexes = [];
  let tmp = 0;
  for (let index = 0; index < answers.length; index++) {
    tmp = index + 1;
    indexes[index] = tmp + "";
  }
  const [isDisabled, setDisable] = useState(false);
  const onAnswerClick = (num) => {
    var t1 = performance.now();
    setDisable(true);
    UserAnswer(num, Math.round(t1 - t0));
  };

  const handleKeyDown = React.useCallback((key) => {
    var t1 = performance.now();
    setDisable(true);
    UserAnswer(parseInt(key), Math.round(t1 - t0));
  });

  return (
    <React.Fragment>
      <div className='col-centered'>
        <CountdownCircleTimer
          size={300}
          isPlaying
          duration={time}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>
      <div className='col-centered'>
        <Typography variant='h2'>{question}</Typography>
      </div>
      <div className='answers'>
        {answers.map((ans, index) => (
          <Button
            className={index % 2 == 0 ? "left-sideBut" : "right-sideBut"}
            key={index + 1}
            variant='contained'
            color='primary'
            style={{ margin: 5 }}
            disabled={isDisabled}
            onClick={(e) => onAnswerClick(index + 1)}
          >
            {ans}
          </Button>
        ))}
        <KeyboardEventHandler
          handleKeys={indexes}
          onKeyEvent={(key, e) => handleKeyDown(key)}
        />
      </div>
    </React.Fragment>
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
export default connect(mapStateToProps, { UserAnswer })(Question);
