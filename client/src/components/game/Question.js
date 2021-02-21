import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { UserAnswer } from "../../actions/user";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Textfit } from "react-textfit";
import "../layouts/css/Questions.css";
import { ScaleLoader } from "react-spinners";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// Didnt finished Timing !!! not heard is correct
class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      part: "listening",
      calledTime: new Date(),
      audioDuration: 0,
      selected: -1, // start from 0 . for present the currect answer
      key: 0,
    };
  }

  componentDidMount() {
    const self = this;
    if (this.state.part === "listening") {
      var audioElement = document.getElementById("myAudio");
      if (audioElement != null) {
        audioElement.addEventListener(
          "ended",
          function () {
            self.setState({
              part: "animation",
            });
          },
          false
        );
      }
      audioElement.addEventListener("loadedmetadata", (e) => {
        self.state.audioDuration = e.target.duration;
      });
    }
    window.addEventListener("focus", () => {
      if (self.state.part === "animation") {
        self.setState({ key: self.state.key + 1 });
      }
    });
  }

  render() {
    var part = this.state.part;
    var questDiv;
    var allQuestDivs = [];
    var classNames = [];
    const indexes = [];
    var clocktimer;
    let tmp = 0;
    const audioPathQuestion =
      "assets/question/" + this.props.quesNum + "_1.m4a";
    for (let index = 0; index < this.props.answers.length; index++) {
      tmp = index + 1;
      indexes[index] = tmp + "";
    }
    if (part === "animation") {
      classNames = [
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
        questDiv = (
          <div>
            <button
              onClick={() => onAnswerClick(index + 1)}
              className={classNames[index]}
            >
              <div className={"numberCircle"}>{index + 1}</div>
              <Textfit max={40} min={26} mode='multi'>
                {this.props.answers[index]}
              </Textfit>
            </button>
          </div>
        );
        allQuestDivs.push(questDiv);
      }
      var remainTime =
        this.state.calledTime.getTime() +
        this.state.audioDuration * 1000 +
        this.props.time * 1000 -
        new Date().getTime();
      if (remainTime < 500) {
        this.setState({ part: "answered" });
        remainTime = 0;
      }
      clocktimer = (
        <div className='clockCenter'>
          <CountdownCircleTimer
            style={{
              fontSize: "30px",
            }}
            key={this.state.key}
            initialRemainingTime={remainTime / 1000}
            isPlaying={true}
            size={120}
            // duration={() => getRemainTime()}
            duration={this.props.time}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
            // onComplete={() => {
            //   this.setState({ part: "answered" });
            // }}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      );
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
      if (this.state.selected >= 0) {
        classNames[this.state.selected] =
          "singleAnswer s" + (this.state.selected + 1);
      }
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
      var remainTime =
        this.state.calledTime.getTime() +
        this.state.audioDuration * 1000 +
        this.props.time * 1000 -
        new Date().getTime();
      if (remainTime < 500) {
        remainTime = 0;
      }

      const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div dir='ltr'>!הזמן אזל</div>;
        }

        return <div>{remainingTime}</div>;
      };

      clocktimer = (
        <div className='clockCenter'>
          <CountdownCircleTimer
            size={120}
            isPlaying
            duration={this.props.time} // should be Time Left !
            initialRemainingTime={remainTime / 1000}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      );
    }

    /*
    Func Declarations :
    */
    const onAnswerClick = (ind) => {
      const DeltaTime =
        this.state.calledTime.getTime() +
        this.state.audioDuration * 1000 +
        this.props.time * 1000 -
        new Date().getTime();
      console.log("time is " + DeltaTime);
      this.setState({ part: "answered", selected: ind - 1 });
      this.props.UserAnswer(ind, Math.round(DeltaTime));
    };

    const handleKeyDown = (key) => {
      const DeltaTime =
        this.state.calledTime.getTime() +
        this.state.audioDuration * 1000 +
        this.props.time * 1000 -
        new Date().getTime();
      console.log("time is " + DeltaTime);
      this.setState({
        part: "answered",
        selected: parseInt(key) - 1,
      });
      this.props.UserAnswer(parseInt(key), Math.round(DeltaTime));
    };
    /*
    Components Declareations :
    */

    const listeningQuestion = (
      <div className='wholescreen'>
        <div className='flex-container'>
          <div dir='rtl' className='question'>
            {this.props.question}
          </div>
          <audio id='myAudio' autoPlay>
            <source src={audioPathQuestion} />
          </audio>
          <div style={{ marginTop: "20px" }}>
            <ScaleLoader />
          </div>
        </div>
      </div>
    );

    const animation = (
      <div className='wholescreen-col'>
        <div className='quest-and-watch'>
          <div>{clocktimer}</div>
          <div className='questAnimation'>{this.props.question}</div>
        </div>
        <div className='quest-container'>{allQuestDivs}</div>
        <KeyboardEventHandler
          handleKeys={indexes}
          onKeyEvent={(key, e) => handleKeyDown(key)}
        />
      </div>
    );

    const answeredAndWait = (
      <div className='wholescreen-col'>
        <div style={{ position: "absolute", top: "20px", fontSize: "36px" }}>
          {this.props.question}
        </div>
        <div className='quest-container-answered'>{allQuestDivs}</div>
        <div className='waitUsers'>wait for your last friends...</div>
        <div className='clockAnimation'>{clocktimer}</div>
      </div>
    );

    const timeOut = <div>TIMEOUT !!!</div>;
    if (part === "listening") {
      return listeningQuestion;
    } else if (part === "animation") {
      return animation;
    } else if (part === "answered") {
      return answeredAndWait;
    } else if (part === "timeout") {
      return timeOut;
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
