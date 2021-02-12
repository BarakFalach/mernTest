import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { Bar } from "react-chartjs-2";
const Bars = ({ distribution, correctAnswer, answers, userAnswer }) => {
  let sentence = "";
  if (correctAnswer == userAnswer) {
    sentence = "Well Done! Your answer is correct!";
  } else {
    sentence = "Unfortunately, Your answer is not the right answer..";
  }
  let colorSet = [
    "#0ead69",
    "#fdbd27",
    "#ea3546",
    "#2599e7",
    "#d4d5fd",
    "#f86624",
  ];
  const data = {
    labels: answers,
    datasets: [
      {
        backgroundColor: colorSet,
        borderColor: colorSet,
        borderWidth: 4,
        hoverBorderColor: "rgba(255,99,132,1)",
        data: Object.values(distribution),
      },
    ],
  };
  return (
    <div>
      <Typography variant='h5'>{sentence}</Typography>
      <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
        <Bar
          class
          data={data}
          height={450}
          options={{
            animation: {
              duration: 3000,
            },
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
            tooltips: {
              displayColors: false,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontSize: 30,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

Bars.propTypes = {
  distribution: PropTypes.object.isRequired,
  correctAnswer: PropTypes.number.isRequired,
  userAnswer: PropTypes.number.isRequired,
  answers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  distribution: state.user.userState.phaseProp.distribution,
  correctAnswer: state.user.userState.phaseProp.correctAnswer,
  userAnswer: state.user.userState.phaseProp.userAnswer,
  answers: state.user.userState.phaseProp.answers,
});

export default connect(mapStateToProps, {})(Bars);
