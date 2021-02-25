import React from "react";
import IconPerson from "../../assets/avocado.jpeg";
import Crown from "../../assets/crown.svg";
import SpotlightTop from "./SpotlightTop";
import { connect } from "react-redux";
import ReactRoundedImage from "react-rounded-image";
import "../layouts/css/Top3.css";

class Top3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,

      users: props.users,

      winner: false,
      Applause: "assets/top3/Applause.mp3",

      place: 4,

      first: false,
      second: false,
      third: false,

      audio1: "assets/top3/" + (this.props.users[0]!=null? this.props.users[0].userNumber: "") + ".m4a",
      audio2: "assets/top3/" + (this.props.users[1]!=null? this.props.users[1].userNumber: "") + ".m4a",
      audio3: "assets/top3/" + (this.props.users[2]!=null? this.props.users[2].userNumber: "") + ".m4a",

      firstPlace: false,
      secondPlace: false,
      thirdPlace: false,

      firstAudio: "assets/top3/first.m4a",
      secondAudio: "assets/top3/second.m4a",
      thirdAudio: "assets/top3/third.m4a",
    };
    this.upWinDim = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.upWinDim);
    this.start();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.upWinDim);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  minHeightWidth() {
    return Math.min(this.state.height, this.state.width);
  }

  start() {
    this.setStatePromise({ third: false })
      .then(() => this.sleep(1000))
      .then(() => this.setStatePromise({ thirdPlace: true }))
      .then(() => this.sleep(4000))
      .then(() =>
        this.setStatePromise({ thirdPlace: false, third: true, place: 3 })
      )
      .then(() => this.sleep(2000))
      .then(() => this.setStatePromise({ third: false, secondPlace: true }))
      .then(() => this.sleep(4000))
      .then(() =>
        this.setStatePromise({ secondPlace: false, second: true, place: 2 })
      )
      .then(() => this.sleep(2000))
      .then(() => this.setStatePromise({ second: false, firstPlace: true }))
      .then(() => this.sleep(4000))
      .then(() =>
        this.setStatePromise({ firstPlace: false, first: true, place: 1 })
      )
      .then(() => this.sleep(2000))
      .then(() => this.setStatePromise({ first: false, winner: true }));
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setStatePromise(state) {
    this.setState(state);
    return Promise.resolve();
  }

  userExists = (place) => {
    if (this.props.users.length < place) return false;
    return true;
  };

  userName = (place) => {
    if (this.props.users.length < place) return ".";
    return this.props.users[place - 1].userNumber;
  };

  userScore = (place) => {
    if (this.props.users.length < place) return ".";
    return this.props.users[place - 1].curr_score;
  };

  userPic = (place) => {
    if (
      this.props.users.length < place ||
      this.state.place > place ||
      this.props.users[place - 1].img === "0"
    )
      return IconPerson;
    return this.props.users[place - 1].img;
  };

  getCoordinatesTop(selector) {
    const domEl = document.getElementsByClassName(selector);
    if (!domEl) return {x: 0, y: 0};

    if(document.querySelector(selector)!==null){
      const rect = document.querySelector(selector).getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  }

  render() {
    return (
      <div>
        <div>
          <SpotlightTop coor={this.getCoordinatesTop} />
          {this.state.third && (
            <audio autoPlay>
              <source src={this.state.audio3} />
            </audio>
          )}
          {this.state.second && (
            <audio autoPlay>
              <source src={this.state.audio2} />
            </audio>
          )}
          {this.state.first && (
            <audio autoPlay>
              <source src={this.state.audio1} />
            </audio>
          )}
          {this.state.thirdPlace && (
            <audio autoPlay>
              <source src={this.state.thirdAudio} />
            </audio>
          )}
          {this.state.secondPlace && (
            <audio autoPlay>
              <source src={this.state.secondAudio} />
            </audio>
          )}
          {this.state.firstPlace && (
            <audio autoPlay>
              <source src={this.state.firstAudio} />
            </audio>
          )}
          {this.state.winner && (
            <audio autoPlay>
              <source src={this.state.Applause} />
            </audio>
          )}
        </div>

        {/* Users */}
        <div className="flex-container-main-top3">
          <div className="header-top3">השחקנים המובילים במשחק</div>
          <div className="flex-container-row-top3" style={{ marginTop: "3%" }}>
            {/* Third (3) Place */}
            <div className="flex-container-col-top3 playr-third" id="playr-third">
              <div className="item-not-flex">
                <ReactRoundedImage
                  image={this.userPic(3)}
                  roundedColor="#00000"
                  roundedSize="0"
                  imageWidth={this.minHeightWidth() * 0.2}
                  imageHeight={this.minHeightWidth() * 0.2}
                />
                <div className="ellipse">
                  {this.state.place <= 3 ? this.userName(3) : "#"}
                </div>
              </div>

              <div
                className="score-text inline-block"
                style={{ fontSize: this.minHeightWidth() * 0.04 }}
              >
                {this.state.place <= 3 ? this.userScore(3) : "#"}
              </div>
              <div className="cube-third" />
            </div>

            {/* First (1) Place */}
            <div className="flex-container-col-top3 playr-first">
              <img
                className="icon-crown-top3"
                alt="playerIcon"
                src={Crown}
                style={{ transform: "rotate(10deg)" }}
              />
              <div className="item-not-flex">
                <ReactRoundedImage
                  roundedColor="#00000"
                  image={this.userPic(1)}
                  roundedSize="0"
                  imageWidth={this.minHeightWidth() * 0.2}
                  imageHeight={this.minHeightWidth() * 0.2}
                />
                <div className="ellipse">
                  {this.state.place <= 1 ? this.userName(1) : "#"}
                </div>
              </div>
              <div
                className="score-text"
                style={{ fontSize: this.minHeightWidth() * 0.04 }}
              >
                {this.state.place <= 1 ? this.userScore(1) : "#"}
              </div>
              <div className="cube-winner" />
            </div>

            {/* Second Place */}
            <div className="flex-container-col-top3 playr-second">
              <div className="item-not-flex">
                <ReactRoundedImage
                  roundedColor="#00000"
                  image={this.userPic(2)}
                  roundedSize="0"
                  imageWidth={this.minHeightWidth() * 0.2}
                  imageHeight={this.minHeightWidth() * 0.2}
                />
                <div className="ellipse">
                  {this.state.place <= 2 ? this.userName(2) : "#"}
                </div>
              </div>
              <div
                className="score-text"
                style={{ fontSize: this.minHeightWidth() * 0.04 }}
              >
                {this.state.place <= 2 ? this.userScore(2) : "#"}
              </div>
              <div className="cube-second" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.userState.phaseProp.users,
});

export default connect(mapStateToProps, {})(Top3);
