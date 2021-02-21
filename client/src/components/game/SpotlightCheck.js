import React from "react";
import Spotlight from 'react-spotlight';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Confetti from 'react-dom-confetti';



export default class SpotlightCheck extends React.Component {

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.state = {
      playing: false,
      x: 0,
      y: 0,
      radius: 0,
      color: 'rgb(0,0,0, 0.80)',
      borderColor: 'rgb(255,255,255)',
      confetti_now: false,
      config: {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: "500",
        dragFriction: 0.15,
        duration: 4500,
        stagger: 4,
        width: "10px",
        height: "10px",
        perspective: "500px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
      }
    };
  }  

  componentDidMount() {
    this.start()
  }

  start() {
    this.setStatePromise({ confetti_now:false, playing: true, ...this.getCoordinates('.playr-third') })
      .then(() => this.sleep(3000))
      .then(() => this.setStatePromise({ confetti_now:true, ...this.getCoordinates('.playr-third'), text:'במקום השלישי', radius: 200, color: 'rgb(216, 49, 25)'}))
      .then(() => this.sleep(4000))
      .then(() => this.setStatePromise({ ...this.getCoordinates('.playr-second'), text:'במקום השני', color: 'rgb(192, 192, 192)' }))
      .then(() => this.sleep(4000))
      .then(() => this.setStatePromise({ ...this.getCoordinates('.playr-first'), text:'במקום הראשון', color: 'rgb(249, 194, 35)', radius: 220}))
      .then(() => this.sleep(4000))
      .then(() => this.setStatePromise({ confetti_now:true, color: 'rgb(255,255,255)', radius: 1000 ,text: ''}))
      .then(() => this.sleep(4000))
      .then(() => this.setStatePromise({ playing: false, color: 'rgb(0,0,0, 0.80)', radius: 0 }));
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setStatePromise(state) {
    this.setState(state);
    return Promise.resolve();
  }

  getCoordinates(selector) {
    const domEl = document.querySelector(selector);
    if (!domEl) return {};

    const rect = document.querySelector(selector).getBoundingClientRect();
    return { x: rect.left + (rect.width / 2), y: rect.top + (rect.height / 2) };
  }

  
  
  render() {
    return(
        <div>
        <Confetti active={ this.state.confetti_now } config={this.state.config}/> 
        {/* <button onClick={this.start} className="btn btn-try">Try it out!</button> */}
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
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
                borderWidth={1}>
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-50px',
                  transform: 'translate(-50%, -100%)',
                  whiteSpace: 'nowrap'
                }}>
                  <h1 style={{ margin: 0, color: "white"}}>{this.state.text}</h1>
                </div>
              </Spotlight>
            </div>
          )}
        </ReactCSSTransitionGroup>
      </div>
    )
  };
};

