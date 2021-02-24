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
  answers,
  userAnswer,
  audioUrl,
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
      <h7 style={{ display: "inline-block", color: "green" }}>
        {answers[correctAnswer - 1]}
      </h7>
    </h7>
  );
  let distributionPercent = castToPercent(distribution);
  let imagesByResult = imagesSetter(answers, correctAnswer, userAnswer);
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
              return "תשובה נכונה";
            } else if (ctx.dataIndex == userAnswer - 1) {
              return "Yours";
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
        <source
          src={
            "https://www.dropbox.com/s/rkly14ns3hnpq3i/zapsplat_animals_birds_spotted_dove_call_australia_56396.mp3?raw=1"
          }
        />
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

function CorrectnessIcon(result) {
  if (result) {
    return <img width={30} height={30} src={correctSvg} />;
  } else {
    return <img width={30} height={30} src={incorrectSvg} />;
  }
}
function imagesSetter(answers, correctAnswer, userAnswer) {
  let imagesByResult = [];
  for (let index = 0; index < answers.length; index++) {
    if (index + 1 === userAnswer || index + 1 === correctAnswer) {
      if (userAnswer === index + 1) {
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
Bars.propTypes = {
  distribution: PropTypes.object.isRequired,
  correctAnswer: PropTypes.number.isRequired,
  userAnswer: PropTypes.number.isRequired,
  answers: PropTypes.array.isRequired,
  audioUrl: PropTypes.string.isRequired,
};
function castToPercent(distribution) {
  let total = 0;
  Object.values(distribution).forEach((element) => {
    total += element;
  });

  let distributionPercent = {};
  Object.keys(distribution).forEach((element) => {
    distributionPercent[element] = Math.round(
      (100 * distribution[element]) / total
    );
  });
  return distributionPercent;
}

const mapStateToProps = (state) => ({
  distribution: state.user.userState.phaseProp.distribution,
  correctAnswer: state.user.userState.phaseProp.correctAnswer,
  userAnswer: state.user.userState.phaseProp.userAnswer,
  answers: state.user.userState.phaseProp.answers,
});

export default connect(mapStateToProps, {})(Bars);
