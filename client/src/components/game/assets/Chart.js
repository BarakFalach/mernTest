import React, { Component } from "react";
import { Bar, defaults } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };

  render() {
    return (
      <div className='chart'>
        <Bar
          data={this.state.chartData}
          height={500}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}

export default Chart;
