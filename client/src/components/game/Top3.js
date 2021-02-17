import React, { Fragment } from "react";
import WinnerShapeSVG from "../../assets/winner_Shape.svg";
import IconPerson from "../../assets/person.jpg";
import Crown from "../../assets/crown.svg";
import audio_example from "../../assets/audio_example.mp3"
import Spotlight from 'react-spotlight';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactAudioPlayer from 'react-audio-player';


import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FaceIcon from "@material-ui/icons/Face";
import Confetti from "react-confetti";
import "../layouts/css/Top3.css";


// const users = {
//   first: {id: 13, place: 1, score: 754},
//   second: {id: 6, place: 2, score: 654},
//   third: {id: 23, place: 3, score: 651}
// };


export const Top3 = ({ users, audio }) => {

  console.log(users);
  
  return (

    <Fragment>
      
      {/* Beautiful things */}
      <Confetti
          run={true}
          friction={1}
          numberOfPieces={400}
          width={5000}
          height={1000}
        ></Confetti>
      
      <Spotlight
        x={70}
        y={55}
        color= 'rgb(0,0,0, 0.60)'
        radius={180}
        responsive
        usePercentage
        animSpeed={200}
        borderColor="#ddd"
        borderWidth={10}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '-50px',
          transform: 'translate(-50%, -100%)',
          whiteSpace: 'nowrap'
        }}>
        </div>
      </Spotlight>

    {/* Users */}
    <div className="flex-container-main">
        
        {/* Third Place */}
        <div className="flex-container-col">
          <div className="empty-rec"/>
          <div className="item-not-flex">
            <div class="ellipse">{users[0].user_name}</div>
            <img alt="playerIcon" src={IconPerson} width="145px"/>
          </div>

          <div className="score-text inline-block">{users[0].curr_score}</div> 
          <img className="item" alt="icon place 3" src={WinnerShapeSVG} width="130px"/>
        </div> 

        {/* First Place */}
        <div className="flex-container-col">
          <div className="empty-rec"/>
          <img alt="playerIcon" src={Crown} width="90px" style={{transform: "rotate(10deg)"}}/>
          <div className="item-not-flex">
            <div class="ellipse">{users[0].user_name}</div>
            <img alt="playerIcon" src={IconPerson} width="145px"/>
          </div>
          <div className="score-text">{users[0].curr_score}</div> 
          <img className="item big-item" alt="icon place 1" src={WinnerShapeSVG} width="180px"/>     
          <div className="empty-rec"/>
        </div> 

        {/* Second Place */}
        <div className="flex-container-col">
          <div className="empty-rec"/>
          <div className="item-not-flex">
            <div class="ellipse">{users[0].user_name}</div>
            <img alt="playerIcon" src={IconPerson} width="145px"/>
          </div>
          <div className="score-text">{users[0].curr_score}</div> 
          <img className="item" alt="icon place 2" src={WinnerShapeSVG} width="130px"/>
        </div> 

    </div>
    </Fragment>
  );
};

Top3.prototype = {
  users: PropTypes.array,
  audio: PropTypes.array,
};

const mapStateToProps = (state) => ({
  users: state.user.userState.phaseProp.users,
  audio: state.user.userState.phaseProp.audio,
});

export default connect(mapStateToProps, {})(Top3);