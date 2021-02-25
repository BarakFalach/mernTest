import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { UserAnswer } from "../../actions/user";
import KeyboardEventHandler from "react-keyboard-event-handler";
import "../layouts/css/Questions.css";
import { ScaleLoader } from "react-spinners";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part: "listening q",
      calledTime: new Date(),
      selected: -1, // start from 0 . for present the currect answer
      key: 0,
    };
    this.quesDuration = 0;
    this.classNames = null;
    this.indexes = [props.answers.length];
    this.clocktimer = null;
    this.clockSize = null;
    this.strokeClockWidth = null;
    this.remainTime = null;
    this.createIndexes(props.answers.length);
    this.audioPathQuestion = "assets/question/" + this.props.quesNum + "_1.m4a";
    this.audioPathAnswers = "assets/question/" + this.props.quesNum + "_2.m4a";
    this.ansAudio = null;
    this.audioElement = null;
    this.firstL = this.firstAudioListener.bind(this);
    this.secondL = this.secondAudioListener.bind(this);
    this.windowL = this.windowListener.bind(this);
    this.ansL = this.ansAudioListener.bind(this);
    this.upWinDim = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    this.setState({ clockSize: Math.min(window.innerWidth, window.innerHeight) * 0.17,
                    strokeClockWidth: Math.min(window.innerWidth, window.innerHeight) * 0.01});
  };

  createIndexes = (numOfAnswers) => {
    let tmp = 0;
    for (let index = 0; index < numOfAnswers; index++) {
      tmp = index + 1;
      this.indexes[index] = tmp + "";
    }
  };

  remainTimeFunc = () => {
    var remainTime =
      this.state.calledTime.getTime() +
      (this.quesDuration + this.ansAudio.duration) * 1000 +
      this.props.time * 1000 -
      new Date().getTime();
    return remainTime;
  };

  renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div>!</div>;
    }
    return <div>{remainingTime}</div>;
  };

  onAnswerClick = (ind) => {
    this.setState({ part: "answered", selected: ind - 1 });
    this.props.UserAnswer(
      ind,
      Math.round(this.remainTimeFunc()),
      this.props.quesNum
    );
  };

  handleKeyDown = (key) => {
    this.setState({
      part: "answered",
      selected: parseInt(key) - 1,
    });
    this.props.UserAnswer(
      parseInt(key),
      Math.round(this.remainTimeFunc()),
      this.props.quesNum
    );
  };
  renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div>!</div>;
    }
    return <div>{remainingTime}</div>;
  };

  firstAudioListener(e) {
    this.setState({ part: "animation" });
  }
  secondAudioListener(e) {
    this.quesDuration = e.target.duration;
  }
  ansAudioListener(e) {
    this.setState({ part: "choosing" });
  }
  windowListener(e) {
    if (this.state.part === "choosing") {
      this.setState({ key: this.state.key + 1 });
    }
  }

  componentDidMount() {
    console.log("enterd did mount...");
    this.updateWindowDimensions();
    window.addEventListener("resize", this.upWinDim);
    if (this.state.part === "listening q") {
      this.audioElement = document.getElementById("myAudioQues");
      if (this.audioElement != null) {
        this.audioElement.addEventListener("ended", this.firstL);
      }
      this.audioElement.addEventListener("loadedmetadata", this.secondL);
      window.addEventListener("focus", this.windowL);
    }
  }

  componentWillUnmount() {
    console.log("enterd unmount");
    this.audioElement.removeEventListener("ended", this.firstL);
    this.audioElement.removeEventListener("loadedmetadata", this.secondL);
    this.ansAudio.removeEventListener("ended", this.ansL);
    if (!this.audioElement.ended) {
      console.log("questions audio stopped in the middle");
      this.audioElement.pause();
    }
    if (!this.ansAudio.ended) {
      this.ansAudio.pause();
      console.log("answers audio stopped in the middle");
    }
    window.removeEventListener("focus", this.windowL);
    window.removeEventListener("resize", this.upWinDim);
  }

  render() {
    let allQuestDivs = [];
    const part = this.state.part;
    if (part === "listening q") {
      this.ansAudio = new Audio(this.audioPathAnswers);
      this.ansAudio.addEventListener("ended", this.ansL);
    } else if (part === "animation") {
      this.ansAudio.play();
      const classNames = [
        " singleAnswer e1",
        " singleAnswer e2",
        " singleAnswer e3",
        " singleAnswer e4",
      ];
      for (
        let index = 0;
        index < this.props.answers.length;
        index = index + 1
      ) {
        let questDiv = (
          <div key={index}>
            <button className={classNames[index]} disabled={true}>
              <div className='flexbox-row-single-ques'>
                <div className={"numberCircle"}>{index + 1}</div>
                <div className='text-inside-ans'>
                  {this.props.answers[index]}
                </div>
              </div>
            </button>
          </div>
        );
        allQuestDivs.push(questDiv);
      }
      this.clocktimer = (
          <CountdownCircleTimer
            isPlaying={false}
            size={this.state.clockSize}
            strokeWidth={this.state.strokeClockWidth}
            duration={this.props.time}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
            onComplete={() => {
              this.setState({ part: "answered" });
            }}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
      );
    } else if (part === "choosing") {
      const classNames = [
        "hovering singleAnswer s1",
        "hovering singleAnswer s2",
        "hovering singleAnswer s3",
        "hovering singleAnswer s4",
      ];
      for (
        let index = 0;
        index < this.props.answers.length;
        index = index + 1
      ) {
        let questDiv = (
          <button
            key={index}
            className={classNames[index]}
            onClick={() => this.onAnswerClick(index + 1)}
          >
            <div className='flexbox-row-single-ques'>
              <div className={"numberCircle"}>{index + 1}</div>
              <div className='text-inside-ans'>{this.props.answers[index]}</div>
            </div>
          </button>
        );
        allQuestDivs.push(questDiv);
      }
      let remainTime = this.remainTimeFunc();
      remainTime = remainTime > 500 ? remainTime : 0;
      this.clocktimer = (
          <CountdownCircleTimer
            key={this.state.key}
            size={this.state.clockSize}
            strokeWidth={this.state.strokeClockWidth}
            isPlaying={true}
            duration={this.props.time} // should be Time Left !
            initialRemainingTime={remainTime / 1000}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
          >
            {(remainingTime) => this.renderTime(remainingTime)}
          </CountdownCircleTimer>
      );
    } else if (part === "answered") {
      const classNames = [
        "singleAnswer e1",
        "singleAnswer e2",
        "singleAnswer e3",
        "singleAnswer e4",
      ];
      if (this.state.selected >= 0) {
        classNames[this.state.selected] =
          "singleAnswer s" + (this.state.selected + 1);
      }
      for (
        let index = 0;
        index < this.props.answers.length;
        index = index + 1
      ) {
        let questDiv = (
          <button key={index} disabled={true} className={classNames[index]}>
            <div className='flexbox-row-single-ques'>
              <div className={"numberCircle"}>{index + 1}</div>
              <div className='text-inside-ans'>{this.props.answers[index]}</div>
            </div>
          </button>
        );
        allQuestDivs.push(questDiv);
      }
      let remainTime = this.remainTimeFunc();
      remainTime = remainTime > 500 ? remainTime : 0;

      this.clocktimer = (
          <CountdownCircleTimer
            size={this.state.clockSize}
            strokeWidth={this.state.strokeClockWidth}
            isPlaying
            duration={this.props.time} // should be Time Left !
            initialRemainingTime={remainTime / 1000}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
          >
            {(remainingTime) => this.renderTime(remainingTime)}
          </CountdownCircleTimer>
      );
    }

    /*
    Components Declareations :
    */

    const listeningQuestion = (
      <div className='flex-container-q'>
        <div className='question'>{this.props.question}</div>
        <div>
          <ScaleLoader />
        </div>
        <audio id='myAudioQues' autoPlay>
          <source src={this.audioPathQuestion} />
        </audio>
      </div>
    );

    const animation = (
      <div className='flex-container-q'>
        <div className='quest-animation'>{this.props.question}</div>
        <div className='clock-animation clockCenter'>{this.clocktimer}</div>
        <div className='quest-container-answered'>{allQuestDivs}</div>
      </div>
    );

    const listeningAnswers = (
      <div className='flex-container-q'>
        <div className='quest-listen-answers'>{this.props.question}</div>
        <div className='clockCenter'>{this.clocktimer}</div>
        <div className='quest-container-answered'>{allQuestDivs}</div>
        <KeyboardEventHandler
          handleKeys={this.indexes}
          onKeyEvent={(key) => this.handleKeyDown(key)}
        />
      </div>
    );

    const answeredAndWait = (
      <div className='flex-container-q'>
        <div className='quest-listen-answers'>{this.props.question}</div>
        <div className='clockCenter'>{this.clocktimer}</div>
        <div className='quest-container-answered'>{allQuestDivs}</div>
        <div className='wait-users'>תשובתך נקלטה.. ממתין לשאר החברים </div>
      </div>
    );
    if (part === "listening q") {
      return listeningQuestion;
    } else if (part === "animation") {
      return animation;
    } else if (part === "choosing") {
      return listeningAnswers;
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
  quesNum: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.user.userState.phaseProp.question,
  answers: state.user.userState.phaseProp.answers,
  time: state.user.userState.phaseProp.time,
  quesNum: state.user.userState.phaseProp.key,
});

export default connect(mapStateToProps, { UserAnswer })(Question);
