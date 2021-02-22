import React, { Component } from "react";
import "../layouts/css/Welcome.css";
import LinearProgress from "@material-ui/core/LinearProgress";
// import Chart from "./assets/Chart.js";

export default class Welcome extends React.Component {
  constructor() {
    super();
  }

  render() {
    const welcome = (
      <div className='wholescreen'>
        <div className='welcome-label'>
          The game will resume shortley
          <LinearProgress />
        </div>
      </div>
    );
    return welcome;
  }
}
