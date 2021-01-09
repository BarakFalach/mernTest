import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
// import { Doughnut, Bar } from "react-chartjs-2";
import { Doughnut } from "@reactchartjs/react-chart.js";
const Bars = ({ distribution, correct }) => {
  const data = {
    labels: Object.keys(distribution),
    datasets: [
      {
        label: "Answers Distribution",
        backgroundColor: [
          "rgba(0,255,0,0.3)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(0,255,0,0.3)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.8)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: Object.values(distribution),
      },
    ],
  };

  const [buttonDisable, setDisable] = useState(false);
  return (
    <div>
      <h2>Bar Example (custom size)</h2>
      <Doughnut
        data={data}
        width={100}
        height={50}
        options={{
          animation: {
            duration: 2,
            animateRotate: true,
            animateScale: true,
          },
        }}
      />
    </div>
  );
};
Bars.propTypes = {
  distribution: PropTypes.object.isRequired,
  correct: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  distribution: state.user.userState.phaseProp.distribution,
  correct: state.user.userState.phaseProp.correct,
});

export default connect(mapStateToProps, {})(Bars);

// Generic Code without any libraries.
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import React, { Fragment, useState } from "react";

// const Bars = ({ distribution, correct }) => {
//   const [buttonDisable, setDisable] = useState(false);
//   return (
//     <div className='Bars_Comp'>
//       <div className='col-centered'>This is bars</div>
//       <span className='bars'>
//         {Object.entries(distribution).map(([key, value]) => (
//           <button
//             fullWidth='true'
//             variant='contained'
//             color='primary'
//             style={{ margin: 5 }}
//             // disabled={buttonDisable}
//             name={key}
//           >
//             <li>{key}</li>
//             <li>{value}</li>
//           </button>
//         ))}
//       </span>
//     </div>
//   );
// };
// Bars.propTypes = {
//   distribution: PropTypes.object.isRequired,
//   correct: PropTypes.bool.isRequired,
// };

// const mapStateToProps = (state) => ({
//   distribution: state.user.userState.phaseProp.distribution,
//   correct: state.user.userState.phaseProp.correct,
// });

// export default connect(mapStateToProps, {})(Bars);
