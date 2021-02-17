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
import React from "react";
import { UserAnswer } from "../../actions/user";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Textfit } from "react-textfit";
import "../layouts/css/Questions.css";
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
    if (this.state.part == "listening") {
      var t0 = performance.now();
    }
    var part = this.state.part;
    var questDiv;
    var allQuestDivs = [];
    var classNames = [];
    const indexes = [];
    let tmp = 0;
    for (let index = 0; index < this.props.answers.length; index++) {
      tmp = index + 1;
      indexes[index] = tmp + "";
    }
    if (part === "animation") {
      classNames = [
        "singleAnswer s1",
        "singleAnswer s2",
        "singleAnswer s3",
        "singleAnswer s4",
      ];
      for (
        let index = 0;
        index < this.props.answers.length;
        index = index + 1
      ) {
        questDiv = (
          <button
            onClick={(e) => onAnswerClick(index)}
            className={classNames[index]}
          >
            <div className={"numberCircle"}>{index + 1}</div>
            <Textfit max={40} min={26} mode='multi'>
              {this.props.answers[index]}
            </Textfit>
          </button>
        );
        allQuestDivs.push(questDiv);
      }
    } else if (part === "answered") {
      /*
      build the part of waiting for moving to next phase.
    */
      classNames = [
        "singleAnswer e1",
        "singleAnswer e2",
        "singleAnswer e3",
        "singleAnswer e4",
      ];
      classNames[this.state.selected] =
        "singleAnswer s" + (this.state.selected + 1);
      for (
        let index = 0;
        index < this.props.answers.length;
        index = index + 1
      ) {
        questDiv = (
          <button disabled={true} className={classNames[index]}>
            <Textfit max={40} min={26} mode='multi'>
              {this.props.answers[index]}
            </Textfit>
          </button>
        );
        allQuestDivs.push(questDiv);
      }
    }

    /*
    Func Declarations :
    
    */
    const onAnswerClick = (ind) => {
      var t1 = performance.now();
      this.setState({ part: "answered", selected: ind });
      console.log("now user answer");
      this.props.UserAnswer(ind, Math.round(t1 - t0));
    };

    const handleKeyDown = (key) => {
      this.setState({ part: "answered", selected: parseInt(key) - 1 });
      var t1 = performance.now();
      console.log("now user answer");
      this.props.UserAnswer(parseInt(key), Math.round(t1 - t0));
    };

    /*
    Components Declareations :
    */

    const listeningQuestion = (
      <div className='flex-container'>
        <div className='question'>{this.props.question}</div>
        <CircularProgress size={100} />
        <audio id='myAudio' autoPlay>
          <source src={this.props.audioUrl} />
        </audio>
      </div>
    );

    const animation = (
      <React.Fragment>
        <div className='question questAnimation'>{this.props.question}</div>
        <div className='circleAnimation'>
          <CircularProgress size={100} />
        </div>
        <div className='quest-container'>{allQuestDivs}</div>
        <KeyboardEventHandler
          handleKeys={indexes}
          onKeyEvent={(key, e) => handleKeyDown(key)}
        />
      </React.Fragment>
    );

    const answeredAndWait = (
      <React.Fragment>
        <div className='quest-container-answered'>{allQuestDivs}</div>
      </React.Fragment>
    );
    if (part === "listening") {
      return listeningQuestion;
    } else if (part === "animation") {
      return animation;
    } else if (part === "answered") {
      return answeredAndWait;
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

export default connect(mapStateToProps, { UserAnswer })(Question);
