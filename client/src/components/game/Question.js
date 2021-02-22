import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { UserAnswer } from '../../actions/user';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Textfit } from 'react-textfit';
import '../layouts/css/Questions.css';
import { ScaleLoader } from 'react-spinners';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// Didnt finished Timing !!! not heard is correct
class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      part: "listening q",
      calledTime: new Date(),
      quesDuration: 0,
      selected: -1, // start from 0 . for present the currect answer
      key: 0,
    };
    this.classNames = null;
    this.indexes = [props.answers.length];
    this.clocktimer = null;
    this.remainTime = null;
    this.createIndexes(props.answers.length);
    this.audioPathQuestion = "assets/question/" + this.props.quesNum + "_1.m4a";
    this.audioPathAnswers = "assets/question/" + this.props.quesNum + "_2.m4a";
  }

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
      (this.state.quesDuration + this.state.ansAudio.duration) * 1000 +
      this.props.time * 1000 -
      new Date().getTime();
    return remainTime;
  };

  renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div dir='ltr'>!</div>;
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
      return <div dir='ltr'>!</div>;
    }
    return <div>{remainingTime}</div>;
  };

  componentDidMount() {
    const self = this;
    if (this.state.part === "listening q") {
      var audioElement = document.getElementById("myAudioQues");
      if (audioElement != null) {
        audioElement.addEventListener(
          "ended",
          function () {
            self.setState({ part: "animation" });
          },
          false
        );
      }
      audioElement.addEventListener("loadedmetadata", (e) => {
        self.state.quesDuration = e.target.duration;
      });
      window.addEventListener("focus", () => {
        if (self.state.part === "choosing") {
          self.setState({ key: self.state.key + 1 });
        }
      });
    }
  }

  render() {
    let allQuestDivs = [];
    const part = this.state.part;
    console.log("render part  ----> " + this.state.part);
    if (part === "listening q") {
      let ansAudio = new Audio(this.audioPathAnswers);
      ansAudio.addEventListener("ended", () =>
        this.setState({ part: "choosing" })
      );
      this.state.ansAudio = ansAudio;
    } else if (part === "animation") {
      this.state.ansAudio.play();
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
          <div>
            <button className={classNames[index]} disabled={true}>
              <div className={"numberCircle"}>{index + 1}</div>
              <Textfit max={40} min={26} mode='multi'>
                {this.props.answers[index]}
              </Textfit>
            </button>
          </div>
        );
        allQuestDivs.push(questDiv);
      }
      this.clocktimer = (
        <div className='clockCenter'>
          <CountdownCircleTimer
            isPlaying={false}
            size={80}
            // duration={() => getRemainTime()}
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
        </div>
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
            className={classNames[index]}
            onClick={() => this.onAnswerClick(index + 1)}
          >
            <div className={"numberCircle"}>{index + 1}</div>
            <Textfit max={40} min={26} mode='multi'>
              {this.props.answers[index]}
            </Textfit>
          </button>
        );
        allQuestDivs.push(questDiv);
      }
      let remainTime = this.remainTimeFunc();
      remainTime = remainTime > 500 ? remainTime : 0;
      this.clocktimer = (
        <div className='clockCenter'>
          <CountdownCircleTimer
            key={this.state.key}
            size={80}
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
        </div>
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
          <button disabled={true} className={classNames[index]}>
            <Textfit max={40} min={26} mode='multi'>
              {this.props.answers[index]}
            </Textfit>
          </button>
        );
        allQuestDivs.push(questDiv);
      }
      let remainTime = this.remainTimeFunc();
      remainTime = remainTime > 500 ? remainTime : 0;

      this.clocktimer = (
        <div className='clockCenter'>
          <CountdownCircleTimer
            size={80}
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
        </div>
      );
    }

    /*
    Components Declareations :
    */

    const listeningQuestion = (
      <div className='wholescreen'>
        <div className='flex-container'>
          <div dir='rtl' className='question'>
            {this.props.question}
          </div>
          <audio id='myAudioQues' autoPlay>
            <source src={this.audioPathQuestion} />
          </audio>
          <div style={{ marginTop: "20px" }}>
            <ScaleLoader />
          </div>
        </div>
      </div>
    );

    const animation = (
      <div className='wholescreen-col'>
        <div dir='rtl' className='questAnimation'>
          {this.props.question}
        </div>
        <div className='clock-animation clockCenter'>{this.clocktimer}</div>
        <div className='quest-container'>{allQuestDivs}</div>
      </div>
    );

    const listeningAnswers = (
      <div className='wholescreen-col'>
        <div
          dir='rtl'
          style={{ position: "absolute", top: "10%", fontSize: "48px" }}
        >
          {this.props.question}
        </div>
        <div className='clockCenter'>{this.clocktimer}</div>
        <div className='quest-container-answered'>{allQuestDivs}</div>
        <KeyboardEventHandler
          handleKeys={this.indexes}
          onKeyEvent={(key) => this.handleKeyDown(key)}
        />
        {/* <audio id='click' autoPlay>
          <source src={clickSound} />
        </audio> */}
      </div>
    );

    const answeredAndWait = (
      <div className='wholescreen-col'>
        <div
          dir='rtl'
          style={{ position: "absolute", top: "10%", fontSize: "48px" }}
        >
          {this.props.question}
        </div>
        <div className='clockCenter'>{this.clocktimer}</div>
        <div className='quest-container-answered'>{allQuestDivs}</div>
        <div className='waitUsers'>wait for your last friends...</div>
        {/* <audio id='click' autoPlay>
          <source src={clickSound} />
        </audio> */}
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

// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import React from "react";
// import { UserAnswer } from "../../actions/user";
// import KeyboardEventHandler from "react-keyboard-event-handler";
// import { Textfit } from "react-textfit";
// import "../layouts/css/Questions.css";
// import { ScaleLoader } from "react-spinners";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// // Didnt finished Timing !!! not heard is correct
// class Question extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       part: "listening q",
//       calledTime: new Date(),
//       quesDuration: 0,
//       selected: -1, // start from 0 . for present the currect answer
//       key: 0,
//     };
//   }

//   remainTimeFunc = () => {
//     var remainTime =
//       this.state.calledTime.getTime() +
//       (this.state.quesDuration + this.state.ansAudio.duration) * 1000 +
//       this.props.time * 1000 -
//       new Date().getTime();
//     return remainTime;
//   };

//   onAnswerClick = (ind) => {
//     this.setState({ part: "answered", selected: ind - 1 });
//     this.props.UserAnswer(
//       ind,
//       Math.round(this.remainTimeFunc()),
//       this.props.quesNum
//     );
//   };

//   handleKeyDown = (key) => {
//     this.setState({
//       part: "answered",
//       selected: parseInt(key) - 1,
//     });
//     this.props.UserAnswer(
//       parseInt(key),
//       Math.round(this.remainTimeFunc()),
//       this.props.quesNum
//     );
//   };

//   componentDidMount() {
//     const self = this;
//     if (this.state.part === "listening q") {
//       var audioElement = document.getElementById("myAudioQues");
//       if (audioElement != null) {
//         audioElement.addEventListener(
//           "ended",
//           function () {
//             self.setState({ part: "animation" });
//           },
//           false
//         );
//       }
//       audioElement.addEventListener("loadedmetadata", (e) => {
//         self.state.quesDuration = e.target.duration;
//       });
//       window.addEventListener("focus", () => {
//         if (self.state.part === "choosing") {
//           self.setState({ key: self.state.key + 1 });
//         }
//       });
//     }
//   }

//   render() {
//     console.log("render part  ----> " + this.state.part);
//     var part = this.state.part;
//     var questDiv;
//     var allQuestDivs = [];
//     var classNames = [];
//     const indexes = [];
//     var clocktimer;
//     let tmp = 0;
//     var remainTime;
//     const renderTime = ({ remainingTime }) => {
//       if (remainingTime === 0) {
//         return <div dir='ltr'>!</div>;
//       }
//       return <div>{remainingTime}</div>;
//     };
//     const audioPathQuestion =
//       "assets/question/" + this.props.quesNum + "_1.m4a";
//     const audioPathAnswers = "assets/question/" + this.props.quesNum + "_2.m4a";
//     // const clickSound = "assets/sample/mouseclick.m4a";
//     for (let index = 0; index < this.props.answers.length; index++) {
//       tmp = index + 1;
//       indexes[index] = tmp + "";
//     }

//     /* Defining Components */

//     if (part === "listening q") {
//       var ansAudio = new Audio(audioPathAnswers);
//       ansAudio.addEventListener("ended", () =>
//         this.setState({ part: "choosing" })
//       );
//       this.state.ansAudio = ansAudio;
//     } else if (part === "animation") {
//       this.state.ansAudio.play();
//       classNames = [
//         "hovering singleAnswer e1",
//         "hovering singleAnswer e2",
//         "hovering singleAnswer e3",
//         "hovering singleAnswer e4",
//       ];
//       for (
//         let index = 0;
//         index < this.props.answers.length;
//         index = index + 1
//       ) {
//         questDiv = (
//           <div>
//             <button className={classNames[index]} disabled={true}>
//               <div className={"numberCircle"}>{index + 1}</div>
//               <Textfit max={40} min={26} mode='multi'>
//                 {this.props.answers[index]}
//               </Textfit>
//             </button>
//           </div>
//         );
//         allQuestDivs.push(questDiv);
//       }
//       clocktimer = (
//         <div className='clockCenter'>
//           <CountdownCircleTimer
//             isPlaying={false}
//             size={80}
//             // duration={() => getRemainTime()}
//             duration={this.props.time}
//             colors={[
//               ["#004777", 0.33],
//               ["#F7B801", 0.33],
//               ["#A30000", 0.33],
//             ]}
//             // onComplete={() => {
//             //   this.setState({ part: "answered" });
//             // }}
//           >
//             {({ remainingTime }) => remainingTime}
//           </CountdownCircleTimer>
//         </div>
//       );
//     } else if (part === "choosing") {
//       classNames = [
//         "singleAnswer s1",
//         "singleAnswer s2",
//         "singleAnswer s3",
//         "singleAnswer s4",
//       ];
//       for (
//         let index = 0;
//         index < this.props.answers.length;
//         index = index + 1
//       ) {
//         questDiv = (
//           <button
//             className={classNames[index]}
//             onClick={() => this.onAnswerClick(index + 1)}
//           >
//             <div className={"numberCircle"}>{index + 1}</div>
//             <Textfit max={40} min={26} mode='multi'>
//               {this.props.answers[index]}
//             </Textfit>
//           </button>
//         );
//         allQuestDivs.push(questDiv);
//       }
//       remainTime = this.remainTimeFunc();
//       remainTime = remainTime > 500 ? remainTime : 0;
//       clocktimer = (
//         <div className='clockCenter'>
//           <CountdownCircleTimer
//             key={this.state.key}
//             size={80}
//             isPlaying={true}
//             duration={this.props.time} // should be Time Left !
//             initialRemainingTime={remainTime / 1000}
//             colors={[
//               ["#004777", 0.33],
//               ["#F7B801", 0.33],
//               ["#A30000", 0.33],
//             ]}
//           >
//             {renderTime}
//           </CountdownCircleTimer>
//         </div>
//       );
//     } else if (part === "answered") {
//       classNames = [
//         "singleAnswer e1",
//         "singleAnswer e2",
//         "singleAnswer e3",
//         "singleAnswer e4",
//       ];
//       if (this.state.selected >= 0) {
//         classNames[this.state.selected] =
//           "singleAnswer s" + (this.state.selected + 1);
//       }
//       for (
//         let index = 0;
//         index < this.props.answers.length;
//         index = index + 1
//       ) {
//         questDiv = (
//           <button disabled={true} className={classNames[index]}>
//             <Textfit max={40} min={26} mode='multi'>
//               {this.props.answers[index]}
//             </Textfit>
//           </button>
//         );
//         allQuestDivs.push(questDiv);
//       }
//       remainTime = this.remainTimeFunc();
//       remainTime = remainTime > 500 ? remainTime : 0;
//       const renderTime = ({ remainingTime }) => {
//         if (remainingTime === 0) {
//           return <div dir='ltr'>!</div>;
//         }
//         return <div>{remainingTime}</div>;
//       };

//       clocktimer = (
//         <div className='clockCenter'>
//           <CountdownCircleTimer
//             size={80}
//             isPlaying
//             duration={this.props.time} // should be Time Left !
//             initialRemainingTime={remainTime / 1000}
//             colors={[
//               ["#004777", 0.33],
//               ["#F7B801", 0.33],
//               ["#A30000", 0.33],
//             ]}
//           >
//             {renderTime}
//           </CountdownCircleTimer>
//         </div>
//       );
//     }

//     /*
//     Func Declarations :
//     */

//     /*
//     Components Declareations :
//     */

//     const listeningQuestion = (
//       <div className='wholescreen'>
//         <div className='flex-container'>
//           <div dir='rtl' className='question'>
//             {this.props.question}
//           </div>
//           <audio id='myAudioQues' autoPlay>
//             <source src={audioPathQuestion} />
//           </audio>
//           <div style={{ marginTop: "20px" }}>
//             <ScaleLoader />
//           </div>
//         </div>
//       </div>
//     );

//     const animation = (
//       <div className='wholescreen-col'>
//         <div dir='rtl' className='questAnimation'>
//           {this.props.question}
//         </div>
//         <div className='clock-animation clockCenter'>{clocktimer}</div>
//         <div className='quest-container'>{allQuestDivs}</div>
//       </div>
//     );

//     const listeningAnswers = (
//       <div className='wholescreen-col'>
//         <div
//           dir='rtl'
//           style={{ position: "absolute", top: "10%", fontSize: "48px" }}
//         >
//           {this.props.question}
//         </div>
//         <div className='clockCenter'>{clocktimer}</div>
//         <div className='quest-container-answered'>{allQuestDivs}</div>
//         <KeyboardEventHandler
//           handleKeys={indexes}
//           onKeyEvent={(key, e) => this.handleKeyDown(key)}
//         />
//         {/* <audio id='click' autoPlay>
//           <source src={clickSound} />
//         </audio> */}
//       </div>
//     );

//     const answeredAndWait = (
//       <div className='wholescreen-col'>
//         <div
//           dir='rtl'
//           style={{ position: "absolute", top: "10%", fontSize: "48px" }}
//         >
//           {this.props.question}
//         </div>
//         <div className='clockCenter'>{clocktimer}</div>
//         <div className='quest-container-answered'>{allQuestDivs}</div>
//         <div className='waitUsers'>wait for your last friends...</div>
//         {/* <audio id='click' autoPlay>
//           <source src={clickSound} />
//         </audio> */}
//       </div>
//     );
//     if (part === "listening q") {
//       return listeningQuestion;
//     } else if (part === "animation") {
//       return animation;
//     } else if (part === "choosing") {
//       return listeningAnswers;
//     } else if (part === "answered") {
//       return answeredAndWait;
//     }
//   }
// }

// Question.propTypes = {
//   question: PropTypes.string.isRequired,
//   answers: PropTypes.array,
//   time: PropTypes.number,
//   UserAnswer: PropTypes.func.isRequired,
//   quesNum: PropTypes.string.isRequired,
// };

// const mapStateToProps = (state) => ({
//   question: state.user.userState.phaseProp.question,
//   answers: state.user.userState.phaseProp.answers,
//   time: state.user.userState.phaseProp.time,
//   quesNum: state.user.userState.phaseProp.key,
// });

// export default connect(mapStateToProps, { UserAnswer })(Question);
