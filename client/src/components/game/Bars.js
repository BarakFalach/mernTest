import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
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
  knowledge,
}) => {
  const windowSize = useWindowSize();
  let sentence;
  if (correctAnswer === userAnswer) {
    sentence = "כל הכבוד ! תשובתך נכונה.";
  } else {
    sentence = "טעית, בפעם הבאה תצליח";
  }
  let correctAns = (
    <title style={{ display: "inline-block" }}>
      התשובה הנכונה היא:{" "}
      <title style={{ display: "inline-block", color: "green" }}>
        {correctTerm}
      </title>
    </title>
  );
  let distributionPercent = castToPercent(distribution);
  let imagesByResult = imagesSetter(
    Object.keys(distribution).length,
    correctAnswer,
    userAnswer,
    knowledge
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
        maxBarThickness: windowSize.width * 0.15,
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
            size: Math.min(windowSize.height, windowSize.width) * 0.05,
          },
          color: function (ctx) {
            var value = ctx.dataset.data[ctx.dataIndex];
            return value > 0 ? "white" : null;
            // return "white";
          },
          formatter: function (value, ctx) {
            if (!ctx.active) {
              return value + "%";
            } else if (ctx.dataIndex === correctAnswer - 1) {
              return "התשובה הנכונה";
            } else if (ctx.dataIndex === userAnswer - 1) {
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
    <div className="flex-container-main-bars">
      {knowledge ? <h1 className="header-bars">{sentence}</h1> : <h1 />}
      {knowledge ? (
        <h1 className="header-bars" style={{ marginTop: "0%" }}>
          {correctAns}
        </h1>
      ) : (
        <h1 />
      )}
      <audio autoPlay>
        <source src={"assets/bars/" + audioKey + ".wav"} />
      </audio>
      <div dir="ltr" className="bottom-bars">
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
                images: knowledge ? imagesByResult : [],
              },
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  ticks: {
                    fontSize: 20,
                    beginAtZero: true,
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
                    beginAtZero: true,
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

function imagesSetter(numOfAnswers, correctAnswer, userAnswer, knowledge) {
  let def_size = 30;
  // if (!knowledge) def_size = 0;
  let imagesByResult = [];
  for (let index = 0; index < numOfAnswers; index++) {
    if (index + 1 === userAnswer || index + 1 === correctAnswer) {
      if (userAnswer === index + 1) {
        imagesByResult[index] = {
          //Wrong Answer
          src: incorrectSvg,
          width: def_size,
          height: def_size,
        };
      }
      if (correctAnswer === index + 1) {
        imagesByResult[index] = {
          //Correct Answer
          src: correctSvg,
          width: def_size,
          height: def_size,
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

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const mapStateToProps = (state) => ({
  distribution: state.user.userState.phaseProp.distribution,
  correctAnswer: state.user.userState.phaseProp.correctAnswer,
  userAnswer: state.user.userState.phaseProp.userAnswer,
  correctTerm: state.user.userState.phaseProp.correctTerm,
  audioKey: state.user.userState.phaseProp.key,
  knowledge: state.user.userState.phaseProp.knowledge,
});

Bars.propTypes = {
  distribution: PropTypes.object.isRequired,
  correctAnswer: PropTypes.number.isRequired,
  userAnswer: PropTypes.number.isRequired,
  correctTerm: PropTypes.string.isRequired,
  audioKey: PropTypes.string.isRequired,
  knowledge: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {})(Bars);
