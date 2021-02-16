// Worked 15 -2 -21

// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import React, { Fragment, useState } from "react";
// import Button from "@material-ui/core/Button";
// import { UserAnswer } from "../../actions/user";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import Typography from "@material-ui/core/Typography";
// import KeyboardEventHandler from "react-keyboard-event-handler";
// import "../layouts/css/Question.css";
// const Question = ({ question, answers, time, UserAnswer }) => {
//   var t0 = performance.now();
//   const indexes = [];
//   let tmp = 0;
//   for (let index = 0; index < answers.length; index++) {
//     tmp = index + 1;
//     indexes[index] = tmp + "";
//   }
//   const [isDisabled, setDisable] = useState(false);
//   const onAnswerClick = (num) => {
//     var t1 = performance.now();
//     setDisable(true);
//     UserAnswer(num, Math.round(t1 - t0));
//   };

//   const handleKeyDown = React.useCallback((key) => {
//     var t1 = performance.now();
//     setDisable(true);
//     UserAnswer(parseInt(key), Math.round(t1 - t0));
//   });

//   return (
//     <React.Fragment>
//       <div className='col-centered'>
//         <CountdownCircleTimer
//           size={300}
//           isPlaying
//           duration={time}
//           colors={[
//             ["#004777", 0.33],
//             ["#F7B801", 0.33],
//             ["#A30000", 0.33],
//           ]}
//         >
//           {({ remainingTime }) => remainingTime}
//         </CountdownCircleTimer>
//       </div>
//       <div className='col-centered'>
//         <Typography variant='h2'>{question}</Typography>
//       </div>
//       <div className='answers'>
//         {answers.map((ans, index) => (
//           <Button
//             className={index % 2 == 0 ? "left-sideBut" : "right-sideBut"}
//             key={index + 1}
//             variant='contained'
//             color='primary'
//             style={{ margin: 5 }}
//             disabled={isDisabled}
//             onClick={(e) => onAnswerClick(index + 1)}

//           >
//             {ans}
//           </Button>
//         ))}
//         <KeyboardEventHandler
//           handleKeys={indexes}
//           onKeyEvent={(key, e) => handleKeyDown(key)}
//         />
//       </div>
//     </React.Fragment>
//   );
// };

// Question.propTypes = {
//   question: PropTypes.string.isRequired,
//   answers: PropTypes.array,
//   time: PropTypes.number,
//   UserAnswer: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   question: state.user.userState.phaseProp.question,
//   answers: state.user.userState.phaseProp.answers,
//   time: state.user.userState.phaseProp.time,
// });
// export default connect(mapStateToProps, { UserAnswer })(Question);

import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, setState } from "react";
import Button from "@material-ui/core/Button";
import { UserAnswer } from "../../actions/user";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Typography from "@material-ui/core/Typography";
import KeyboardEventHandler from "react-keyboard-event-handler";
// import "../layouts/css/Question.css";
import "../layouts/css/EdenQuestions.css";
import CircularProgress from "@material-ui/core/CircularProgress";
class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      part: "listening",
    };
  }

  componentDidMount() {
    if (this.state.part === "listening") {
      var audioElement = document.getElementById("myAudio");
      if (audioElement != null) {
        console.log(this.props.audioUrl);
        const self = this;
        audioElement.addEventListener(
          "ended",
          function () {
            self.setState({ part: "animation" });
          },
          false
        );
      }
    }
  }
  render() {
    var part = this.state.part;
    var questDiv;
    var allQuestDivs = [];
    for (let index = 0; index < this.props.answers.length; index = index + 2) {
      if (index < this.props.answers.length - 1) {
        questDiv = (
          <div className='lineAnswer'>
            <div className='singleAnswer'>{this.props.answers[index]}</div>
            <div className='singleAnswer'>{this.props.answers[index + 1]}</div>
          </div>
        );

        allQuestDivs.push(questDiv);
      } else {
        questDiv = (
          <div className='lineAnswer'>
            <div className='singleAnswer'>{this.props.answers[index]}</div>
          </div>
        );
        allQuestDivs.push(questDiv);
      }
    }
    const listeningQuestion = (
      <div className='flex-container'>
        <div className='empty'></div>
        <div className='question'>{this.props.question}</div>
        <div height='10%'></div>
        <CircularProgress size={100} />
        <audio id='myAudio' autoPlay>
          <source src={this.props.audioUrl} />
        </audio>
      </div>
    );
    const animation = (
      <div>
        <div className='empty'></div>
        <div className='question questAnimation'>{this.props.question}</div>
        <div className='circleAnimation'>
          <CircularProgress size={100} />
        </div>
        <div className='quest-container'>
          <div>{allQuestDivs}</div>
        </div>
      </div>
    );
    if (part === "listening") {
      return <div>{listeningQuestion}</div>;
    } else if (part === "animation") {
      return <div>{animation}</div>;
    }
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array,
  time: PropTypes.number,
  UserAnswer: PropTypes.func.isRequired,
  audioUrl: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.user.userState.phaseProp.question,
  answers: state.user.userState.phaseProp.answers,
  time: state.user.userState.phaseProp.time,
  audioUrl: state.user.userState.phaseProp.audioUrl,
});

const AppContainer = connect(mapStateToProps, { UserAnswer })(Question);
export default AppContainer;
