import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import correctSvg from "../../assets/player.png";
import incorrectSvg from "../../assets/player.png";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-labels";
import "../layouts/css/Groups.css";

const Groups = ({
  my_groups,
  term,
  answers = ["1", "2"],
  winning = my_groups[1].curr_score > my_groups[2].curr_score
    ? 1
    : my_groups[1].curr_score === my_groups[2].curr_score
    ? 0
    : 2,
  correctAnswer = winning === 1 ? 1 : winning === 2 ? 2 : 0,
}) => {
  const windowSize = useWindowSize();
  let sentence;
  if (winning === 0) {
    sentence = (
      <title style={{ display: "inline-block", color: "#273043" }}>
        תיקו בין הקבוצות
      </title>
    );
  } else {
    sentence = (
      <title style={{ display: "inline-block", color: "#273043" }}>
        קבוצה מספר :{" "}
        <title style={{ display: "inline-block", color: "green", bold: true }}>
          {winning}
        </title>{" "}
        היא הקבוצה המובילה
      </title>
    );
  }
  let total = getTotalScores(my_groups);
  let groups_score = castToScores(my_groups, total);
  let imagesByResult = imagesSetter(answers, correctAnswer);
  let colorSet = ["#2599E7", "#EA3546"];
  let colorSetBorder = ["#276678", "#951B26"];
  const data = {
    labels: answers,
    datasets: [
      {
        backgroundColor: colorSet,
        hoverBorderColor: "rgba(255,99,132,0)",
        data: Object.values(groups_score),
        datalabels: {
          anchor: "center",
          backgroundColor: function (ctx) {
            return null;
          },
          borderColor: function (ctx) {
            return colorSetBorder[0];
          },
          font: {
            weight: "bold",
            size: Math.min(windowSize.height, windowSize.width) * 0.04,
          },
          color: function (ctx) {
            var value = ctx.dataset.data[ctx.dataIndex];
            return value > 0 ? "white" : null;
          },
          formatter: function (value, ctx) {
            if (!ctx.active) {
              return my_groups[ctx.dataIndex + 1].curr_score;
            } else if (ctx.dataIndex === correctAnswer - 1) {
              return "במקום הראשון";
            } else {
              return "במקום השני";
            }
          },
        },
      },
    ],
  };
  return (
    <div className='flex-container-groups'>
      <div className='header-groups' style={{ marginTop: "2%" }}>
        {term ? term : "מצב הקבוצות"}
      </div>
      <div className='header-sentence-groups' style={{ marginTop: "0.5%" }}>
        {sentence}
      </div>
      <div dir='ltr' className='bottom-bars-groups'>
        <HorizontalBar
          data={data}
          options={{
            animation: {
              duration: 2500,
            },
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
            plugins: {
              labels: {
                render: "image",
                textMargin: 0,
                images: imagesByResult,
              },
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    fontSize: 30,
                    max: 10,
                  },
                  gridLines: {
                    paddingTop: 10,
                    drawBorder: true,
                    color: "black",
                    drawOnChartArea: false,
                    drawTicks: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                    fontSize: 30,
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

function imagesSetter(answers, winning) {
  let imagesByResult = [];
  let correctA = {
    src: correctSvg,
    width: 30,
    height: 30,
  };

  let wrongA = {
    src: incorrectSvg,
    width: 50,
    height: 30,
  };

  for (let index = 0; index < answers.length; index++) {
    if (index + 1 === winning) {
      imagesByResult[index] = correctA;
    } else {
      imagesByResult[index] = wrongA;
    }
  }
  return imagesByResult;
}

function getTotalScores(my_groups) {
  let total = 0;
  Object.keys(my_groups).forEach((element) => {
    total += my_groups[element].curr_score;
  });
  return total;
}

function castToScores(my_groups, total) {
  let scores = {};
  Object.keys(my_groups).forEach((element) => {
    scores[element] = Math.round((100 * my_groups[element].curr_score) / total);
  });
  return scores;
}

Groups.propTypes = {
  my_groups: PropTypes.array.isRequired,
  term: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  my_groups: state.user.userState.phaseProp.groups,
  term: state.user.userState.phaseProp.term,
});

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

export default connect(mapStateToProps, {})(Groups);
