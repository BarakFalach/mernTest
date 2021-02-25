import React from "react";
import "../layouts/css/Goodbye.css";
// import Chart from "./assets/Chart.js";

export default class Goodbye extends React.Component {
  render() {
    const goodbye = (
      <div className='wholescreen'>
        <div className='goodbye-label'>תודה רבה שהשתתפתם,</div>
        <div className='goodbye-label'>ניפגש בפעם הבאה !</div>
        <img
          style={{ marginTop: "3%" }}
          alt='mangerIcon'
          src={"logo_detailed.png"}
        />
      </div>
    );
    localStorage.removeItem("userState");
    return goodbye;
  }
}
