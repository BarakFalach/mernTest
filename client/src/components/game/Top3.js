import React, { Fragment, useState, useEffect } from "react";
import StarShape from "../../assets/winner_Shape.svg";
import IconPerson from "../../assets/person.jpg";
import PlayerReal from "../../assets/player1.jpg";
import Applause from "../../assets/Applause.mp3";
import Crown from "../../assets/crown.svg";
import SpotlightCheck from "./SpotlightCheck";
import { connect } from "react-redux";
import ReactRoundedImage from "react-rounded-image";
import Confetti from "react-confetti";

import "../layouts/css/Top3.css";


class Top3 extends React.Component {
  
  constructor() {
    super();
    this.state = {
      place: 4,
      third: false,
      second: false,
      first: false,
      winner: false,
      audio3: "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3",
      audio2: "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3",
      audio1: "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3",
    };
  }  

  componentDidMount() {
   this.start();
  }

  start() {
    this.setStatePromise({third: false})
      .then(() => this.sleep(2000))
      .then(() => this.setStatePromise({third: true, place: 3 }))
      .then(() => this.sleep(4500)) 
      .then(() => this.setStatePromise({third: false, second: true, place: 2}))
      .then(() => this.sleep(4000))
      .then(() => this.setStatePromise({ second: false, first: true, place: 1}))
      .then(() => this.sleep(2100))
      .then(() => this.setStatePromise({ first: true, winner: true}))
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setStatePromise(state) {
    this.setState(state);
    return Promise.resolve();
  }

  userExists = (place) => {
    if(this.props.users.length<place)
      return false;
    return true;
  }
  
  userName = (place) => {
    if(this.props.users.length<place)
      return ".";
    return this.props.users[place-1].user_name;
  };

  userScore = (place) => {
    if(this.props.users.length<place)
      return ".";
    return this.props.users[place-1].curr_score;
  };

  userPic = (place) => {
    if(this.props.users.length<place || this.state.place>place) 
      return IconPerson;
    // return this.props.users[place-1].curr_pic
    return PlayerReal;
  }
  
  render() {
    return(
      <Fragment> 
        <div>
          <SpotlightCheck /> 
          {this.state.third && (<audio autoPlay><source src={this.state.audio3}/></audio>)}
          {this.state.second && (<audio autoPlay><source src={this.state.audio2}/></audio>)}
          {this.state.first && (<audio autoPlay><source src={this.state.audio1}/></audio>)}
          {this.state.winner && (<audio autoPlay><source type="audio/mp3" src={Applause} /></audio>)}

        </div>
        {/* Users */}
        <div className="flex-container-main">
            {/* Third (3) Place */}
            <div className="flex-container-col playr-third">
              <div className="empty-rec"/>
              <div className="item-not-flex">
                <div class="ellipse">{this.state.place<=3? this.userName(3): "#"}</div>
                {/* <img alt="playerIcon" src={this.userPic(3)} width="145px"/> */}
                <ReactRoundedImage image={this.userPic(3)} roundedSize="0" imageWidth="140" imageHeight="140" />
              </div>

              <div className="score-text inline-block">{this.state.place<=3? this.userScore(3): "#"}</div> 
              <img alt="icon place 3" src={StarShape} width="130px"/>
            </div> 

            {/* First (1) Place */}
            <div className="flex-container-col playr-first">
              <div className="empty-rec1"/>
              <img alt="playerIcon" src={Crown} width="90px" style={{transform: "rotate(10deg)"}}/>
              <div className="item-not-flex">
                <div class="ellipse">{this.state.place<=1? this.userName(1): "#"}</div>
                {/* <img alt="playerIcon" src={this.userPic(1)} width="145px"/> */}
                <ReactRoundedImage image={this.userPic(1)} roundedSize="0" imageWidth="140" imageHeight="140" />

              </div>
              <div className="score-text">{this.state.place<=1? this.userScore(1): "#"}</div> 
              <img alt="icon place 1" src={StarShape} width="180px"/>     
              <div className="empty-rec"/>
            </div> 

            {/* Second Place */}
            <div className="flex-container-col playr-second">
              <div className="empty-rec"/>
              <div className="item-not-flex">
                <div class="ellipse">{this.state.place<=2? this.userName(2): "#"}</div>
                {/* <img alt="playerIcon" src={this.userPic(2)} width="145px"/> */}
                <ReactRoundedImage image={this.userPic(2)} roundedSize="0" imageWidth="140" imageHeight="140" />
              </div>
              <div className="score-text">{this.state.place<=2? this.userScore(2): "#"}</div> 
              <img alt="icon place 2" src={StarShape} width="130px"/>
            </div> 
        </div>
      </Fragment>
    )
  };
};

const mapStateToProps = (state) => ({
  users: state.user.userState.phaseProp.users,
  audio: state.user.userState.phaseProp.audio,
});

export default connect(mapStateToProps, {})(Top3);