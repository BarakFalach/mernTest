import React, { Fragment, useState, useEffect } from "react";
import StarShape from "../../assets/winner_Shape.svg";
import IconPerson from "../../assets/person.jpg";
// import Applause from '../../assets/Applause.mp3';
import Crown from "../../assets/crown.svg";
import SpotlightCheck from "./SpotlightCheck";
import { connect } from "react-redux";
import ReactRoundedImage from "react-rounded-image";

import "../layouts/css/Top3.css";


class Top3 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      
      winner: false,
      Applause: "assets/top3/Applause.mp3",

      place: 4,

      first: false,
      second: false,
      third: false,

      audio1: "assets/top3/1.m4a",
      audio2: "assets/top3/2.m4a",
      audio3: "assets/top3/3.m4a",
      
      firstPlace: false,
      secondPlace: false,
      thirdPlace: false,
      
      firstAudio: "assets/top3/first.m4a",
      secondAudio: "assets/top3/second.m4a",
      thirdAudio: "assets/top3/third.m4a",
    };
  }  

  componentDidMount() {
   this.start();
  }

  start() {
    this.setStatePromise({third: false,})
      .then(() => this.sleep(1000))
      .then(() => this.setStatePromise({thirdPlace: true}))
      .then(() => this.sleep(4000))
      .then(() => this.setStatePromise({thirdPlace: false, third: true, place: 3}))
      .then(() => this.sleep(2000)) 
      .then(() => this.setStatePromise({third: false, secondPlace: true}))
      .then(() => this.sleep(4000)) 
      .then(() => this.setStatePromise({secondPlace: false, second: true, place: 2}))
      .then(() => this.sleep(2000))
      .then(() => this.setStatePromise({ second: false, firstPlace: true}))
      .then(() => this.sleep(4000))
      .then(() => this.setStatePromise({ firstPlace: false, first: true, place: 1}))
      .then(() => this.sleep(2000))
      .then(() => this.setStatePromise({ first: false, winner: true}))
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
    return this.props.users[place-1].userNumber;
  };

  userScore = (place) => {
    if(this.props.users.length<place)
      return ".";
    return this.props.users[place-1].curr_score;
  };

  userPic = (place) => {
    if(this.props.users.length<place || this.state.place>place) 
      return IconPerson;
    return this.props.users[place-1].img;
  }
  
  render() {
    return(
      <div> 
        <div>
          <SpotlightCheck /> 
          {this.state.third && (<audio autoPlay><source src={this.state.audio3}/></audio>)}
          {this.state.second && (<audio autoPlay><source src={this.state.audio2}/></audio>)}
          {this.state.first && (<audio autoPlay><source src={this.state.audio1}/></audio>)}
          {this.state.thirdPlace && (<audio autoPlay><source src={this.state.thirdAudio}/></audio>)}
          {this.state.secondPlace && (<audio autoPlay><source src={this.state.secondAudio}/></audio>)}
          {this.state.firstPlace && (<audio autoPlay><source src={this.state.firstAudio}/></audio>)}
          {this.state.winner && (<audio autoPlay><source src={this.state.Applause} /></audio>)}

        </div>
         
        {/* Users */}
        <div className="flex-container-main-top3">
            {/* Third (3) Place */}
            <div className="flex-container-col-top3 playr-third">
              {/* <div className="empty-rec"/> */}
              <div className="item-not-flex">
                <div class="ellipse">{this.state.place<=3? this.userName(3): "#"}</div>
                <ReactRoundedImage image={this.userPic(3)} roundedSize="0" imageWidth="140" imageHeight="140" />
              </div>

              <div className="score-text inline-block">{this.state.place<=3? this.userScore(3): "#"}</div> 
              <img alt="icon place 3" src={StarShape} width="130px"/>
            </div> 

            {/* First (1) Place */}
            <div className="flex-container-col-top3 playr-first">
              {/* <div className="empty-rec1"/> */}
              <img alt="playerIcon" src={Crown} width="91px" style={{transform: "rotate(10deg)"}}/>
              <div className="item-not-flex">
                <div class="ellipse">{this.state.place<=1? this.userName(1): "#"}</div>
                <ReactRoundedImage image={this.userPic(1)} roundedSize="0" imageWidth="140" imageHeight="140" />

              </div>
              <div className="score-text">{this.state.place<=1? this.userScore(1): "#"}</div> 
              <img alt="icon place 1" src={StarShape} width="180px"/>     
              <div className="empty-rec"/>
            </div> 

            {/* Second Place */}
            <div className="flex-container-col-top3 playr-second">
              {/* <div className="empty-rec"/> */}
              <div className="item-not-flex">
                <div class="ellipse">{this.state.place<=2? this.userName(2): "#"}</div>
                <ReactRoundedImage image={this.userPic(2)} roundedSize="0" imageWidth="140" imageHeight="140" />
              </div>
              <div className="score-text">{this.state.place<=2? this.userScore(2): "#"}</div> 
              <img alt="icon place 2" src={StarShape} width="130px"/>
            </div> 
            </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => ({
  users: state.user.userState.phaseProp.users,
});

export default connect(mapStateToProps, {})(Top3);