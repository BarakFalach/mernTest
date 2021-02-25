import React from "react";
import "../layouts/css/Goodbye.css";
// import Chart from "./assets/Chart.js";

export default class Goodbye extends React.Component {
  render() {
    const goodbye = (
      <div className='wholescreen'>
        <div class='ocean'>
          <div class='wave'></div>
          <div class='wave'></div>
        </div>
        <div className='goodbye-label'>תודה רבה שהשתתפתם,</div>
        <div className='goodbye-label'>ניפגש בפעם הבאה !</div>
        <img
          style={{ marginTop: "2%" }}
          alt='mangerIcon'
          src={"logo_detailed.png"}
          className='avatar'
        />
      </div>
    );
    return goodbye;
  }
}
