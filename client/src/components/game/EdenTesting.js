// import "../layouts/css/BarsAnimation.css";
// export const EdenTesting = () => {
//   return <div className='animatedDiv'>eden</div>;
// };
import React, { Component } from "react";
import Chart from "./assets/Chart.js";

class EdenTesting extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
    };
  }

  componentWillMount() {
    // this.getchartData(); // this should be this.getChartData();
    this.getChartData();
  }

  getChartData() {
    // Ajax calls here
    this.setState({
      chartData: {
        labels: [
          "Boston",
          "Worcester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford",
        ],
        datasets: [
          {
            label: "Population",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "#0ead69",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to React</h2>
        </div>
        <Chart
          chartData={this.state.chartData}
          location='Massachusetts'
          legendPosition='bottom'
        />
      </div>
    );
  }
}
export default EdenTesting;
// -- GAME CLASS --
// import React, { Fragment } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import Phase from "./Phase";
// import "../layouts/css/NavbarBottom.css";

// const Game = ({ score, name, group }) => {
//   return (
//     <Fragment>
//       <h1>
//         {" "}
//         welcome {name} you current score is: {score} groupNumer : {group}
//       </h1>
//       <div>
//         <Phase />
//       </div>
//       <div class='navbar'>
//         <a href='#home' class='active'>
//           Home
//         </a>
//         <a href='#news'>News</a>
//         <a href='#contact'>Contact</a>
//       </div>
//     </Fragment>
//   );
// };
// Game.propTypes = {
//   score: PropTypes.number,
//   name: PropTypes.string,
//   group: PropTypes.string,
// };
// const mapStateToProps = (state) => ({
//   score: state.user.userState.score,
//   name: state.user.name,
//   group: state.user.group,
// });

// export default connect(mapStateToProps, {})(Game);
