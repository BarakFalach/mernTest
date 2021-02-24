import React from "react";
import Spotlight from "react-spotlight";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Confetti from "react-dom-confetti";

export default class SpotlightCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      x: 0,
      y: 0,
      radius: 0,
      color: "rgb(0,0,0, 0.80)",
      borderColor: "rgb(255,255,255)",
      confetti_now: false,
      config: {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: "250",
        dragFriction: 0.15,
        duration: 4500,
        stagger: 4,
        width: "10px",
        height: "10px",
        perspective: "500px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
      },
      starting: false,
      winner: false,
      radiusNormal: 220,
      radiusWinner: 220,
      width: 0,
      height: 0,
      placeText: ".playr-third",
    };
    this.start = this.start.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getRadius = this.getRadius.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.start();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setStatePromise({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.setStatePromise({
      radiusNormal: Math.min(window.innerWidth, window.innerHeight) * 0.25,
    });
    this.setStatePromise({
      radiusWinner: Math.min(window.innerWidth, window.innerHeight) * 0.3,
    });
    this.setStatePromise({ radius: this.getRadius() });
    this.setStatePromise({ ...this.getCoordinates(this.state.placeText) });
  }

  getRadius() {
    let starting = this.state.starting;
    let winner = this.state.winner;
    let radiusWinner = this.state.radiusWinner;
    let radiusNormal = this.state.radiusNormal;
    return starting ? (winner ? radiusWinner : radiusNormal) : 0;
  }

  start() {
    this.setStatePromise({
      confetti_now: false,
      playing: true,
      ...this.getCoordinates(".playr-third"),
      placeText: ".playr-third",
    })
      .then(() => this.sleep(5000))
      .then(() =>
        this.setStatePromise({
          ...this.getCoordinates(".playr-third"),
          text: "במקום השלישי",
          radius: this.state.radiusNormal,
          color: "#273043",
          starting: true,
        })
      )
      .then(() => this.sleep(6000))
      .then(() =>
        this.setStatePromise({
          ...this.getCoordinates(".playr-second"),
          text: "במקום השני",
          placeText: ".playr-second",
        })
      )
      .then(() => this.sleep(6000))
      .then(() =>
        this.setStatePromise({
          ...this.getCoordinates(".playr-first"),
          text: "במקום הראשון",
          radius: this.state.radiusWinner,
          winner: true,
          placeText: ".playr-first",
        })
      )
      .then(() => this.sleep(3000))
      .then(() =>
        this.setStatePromise({
          confetti_now: true,
          color: "rgb(255,255,255)",
          radius: 1000,
          text: "",
        })
      )
      .then(() => this.sleep(4000))
      .then(() =>
        this.setStatePromise({
          playing: false,
          color: "rgb(0,0,0, 0.80)",
          radius: 0,
          winner: false,
          starting: false,
        })
      );
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setStatePromise(state) {
    this.setState(state);
    return Promise.resolve();
  }

  getCoordinates(selector) {
    return this.props.coor(selector);
  }

  render() {
    return (
      <div>
        <div dir="rtl">
          <Confetti
            active={this.state.confetti_now}
            config={this.state.config}
          />
        </div>
        <div dir="ltr">
          <Confetti
            active={this.state.confetti_now}
            config={this.state.config}
          />
        </div>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.state.playing && (
            <div key="1">
              <Spotlight
                x={this.state.x}
                y={this.state.y}
                radius={this.state.radius}
                color={this.state.color}
                outerStyles={{ zIndex: 0 }}
                responsive
                animSpeed={1000}
                borderColor={this.state.borderColor}
                borderWidth={1}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "-50px",
                    transform: "translate(-50%, -100%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <h1 style={{ margin: 0, color: "white" }}>
                    {this.state.text}
                  </h1>
                </div>
              </Spotlight>
            </div>
          )}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
