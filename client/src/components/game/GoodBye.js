import React from "react";
import "../layouts/css/Welcome.css";
// import Chart from "./assets/Chart.js";

export default class Goodbye extends React.Component {
  render() {
    const goodbye = (
      <div className='wholescreen'>
        <div className='empty200' />
        <div className='goodbye-label'>Thank you for your participant,</div>
        <div className='goodbye-label'>See you next time.</div>
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
