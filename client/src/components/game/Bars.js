import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { Bar } from "react-chartjs-2";
import correctSvg from "../../assets/success-green-check-mark.svg";
import incorrectSvg from "../../assets/wrong.svg";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-labels";
import "../layouts/css/Bars.css";
const Bars = ({
  distribution,
  correctAnswer,
  correctTerm,
  userAnswer,
  audioKey,
}) => {
  let sentence;
  if (correctAnswer == userAnswer) {
    sentence = "כל הכבוד ! תשובתך נכונה.";
  } else {
    sentence = "טעית, בפעם הבאה תצליח";
  }
  let correctAns = (
    <h7 style={{ display: "inline-block" }}>
      התשובה הנכונה היא:{" "}
      <h7 style={{ display: "inline-block", color: "green" }}>{correctTerm}</h7>
    </h7>
  );
  let distributionPercent = castToPercent(distribution);
  let imagesByResult = imagesSetter(
    Object.keys(distribution).length,
    correctAnswer,
    userAnswer
  );
  let colorSet = [
    "#0ead69",
    "#fdbd27",
    "#ea3546",
    "#2599e7",
    "#d4d5fd",
    "#f86624",
  ];
  const data = {
    labels: Object.keys(distribution),
    datasets: [
      {
        backgroundColor: colorSet,
        borderColor: colorSet,
        hoverBorderColor: "rgba(255,99,132,1)",
        data: Object.values(distributionPercent),
        datalabels: {
          anchor: "center",
          offset: 0,
          backgroundColor: function (ctx) {
            // var value = ctx.dataset.data[ctx.dataIndex];
            // return value > 50 ? "white" : null;
            return null;
          },
          borderColor: function (ctx) {
            // var value = ctx.dataset.data[ctx.dataIndex];
            // return value > 0 ? "white" : null;
            // return "white";
            return null;
          },
          // borderWidth: 2,
          // borderRadius: 4,
          font: {
            weight: "bold",
            size: 30,
          },
          color: function (ctx) {
            var value = ctx.dataset.data[ctx.dataIndex];
            return value > 0 ? "white" : null;
            // return "white";
          },
          formatter: function (value, ctx) {
            console.log("user answer is " + userAnswer);
            if (!ctx.active) {
              return value + "%";
            } else if (ctx.dataIndex == correctAnswer - 1) {
              return "התשובה הנכונה";
            } else if (ctx.dataIndex == userAnswer - 1) {
              return "תשובתך";
            } else {
              return value + "%";
            }
          },
        },
      },
    ],
  };
  return (
    <div className='flex-container-main-bars'>
      <h1 className='header-bars'>{sentence}</h1>
      <h1 className='header-bars' style={{ marginTop: "0%" }}>
        {correctAns}
      </h1>
      <audio autoPlay>
        <source src={"assets/bars/" + audioKey + ".m4a"} />
      </audio>
      <div dir='ltr' className='bottom-bars'>
        <Bar
          data={data}
          options={{
            layout: {
              padding: { top: 80 },
            },
            animation: {
              duration: 2300,
            },
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
            plugins: {
              labels: {
                render: "image",
                textMargin: 5,
                images: imagesByResult,
              },
            },
            scales: {
              xAxes: [
                {
                  maxBarThickness: 300,
                  display: true,
                  ticks: {
                    fontSize: 20,
                  },
                  gridLines: {
                    //xAxe Line
                    drawBorder: true,
                    color: "black",
                    drawOnChartArea: false,
                    drawTicks: false,
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

function imagesSetter(numOfAnswers, correctAnswer, userAnswer) {
  let imagesByResult = [];
  for (let index = 0; index < numOfAnswers; index++) {
    console.log(index);
    if (index + 1 === userAnswer || index + 1 === correctAnswer) {
      if (userAnswer === index + 1) {
        console.log("incorrect is at index " + index);

        imagesByResult[index] = {
          //Wrong Answer
          src: incorrectSvg,
          width: 30,
          height: 30,
        };
      }
      if (correctAnswer === index + 1) {
        imagesByResult[index] = {
          //Correct Answer
          src: correctSvg,
          width: 30,
          height: 30,
        };
      }
    } else {
      imagesByResult[index] = null;
    }
  }
  return imagesByResult;
}

function castToPercent(distribution) {
  let total = 0;
  Object.values(distribution).forEach((element) => {
    total += element;
  });

  let distributionPercent = {};
  let tmp = 1;
  Object.keys(distribution).forEach((element) => {
    distributionPercent[tmp] = Math.round(
      (100 * distribution[element]) / total
    );
    tmp++;
  });
  return distributionPercent;
}

const mapStateToProps = (state) => ({
  distribution: state.user.userState.phaseProp.distribution,
  correctAnswer: state.user.userState.phaseProp.correctAnswer,
  userAnswer: state.user.userState.phaseProp.userAnswer,
  correctTerm: state.user.userState.phaseProp.correctTerm,
  audioKey: state.user.userState.phaseProp.key,
});

Bars.propTypes = {
  distribution: PropTypes.object.isRequired,
  correctAnswer: PropTypes.number.isRequired,
  userAnswer: PropTypes.number.isRequired,
  correctTerm: PropTypes.string.isRequired,
  audioKey: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {})(Bars);
