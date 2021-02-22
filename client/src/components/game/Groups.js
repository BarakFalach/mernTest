import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { Bar } from "react-chartjs-2";
import correctSvg from "../../assets/rabbit.png";
import incorrectSvg from "../../assets/turtle.png";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-labels";
import "../layouts/css/BarsAnimation.css";

const Groups = ({
  my_groups,
  answers = ["1", "2"],
  winning = my_groups[1].curr_score>my_groups[2].curr_score? 1: my_groups[1].curr_score===my_groups[2].curr_score? 0 : 2,
  correctAnswer = winning === 1? 1: winning === 2? 2 : 0, 
}) => {
  let sentence;
  if (winning === 0) {
    sentence = "תיקו בין הקבוצות";
  } else {
    sentence = "קבוצה " + winning + " היא הקבוצה המובילה";
  }
  let total = getTotalScores(my_groups)
  let groups_score = castToScores(my_groups, total);
  let imagesByResult = imagesSetter(answers, correctAnswer);
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
        data: Object.values(groups_score),
        datalabels: {
          anchor: "center",
          backgroundColor: function (ctx) {
            return null;
          },
          borderColor: function (ctx) {
            return null;
          },
          font: {
            weight: "bold",
            size: 40,
          },
          color: function (ctx) {
            var value = ctx.dataset.data[ctx.dataIndex];
            return value > 0 ? "white" : null;
          },
          formatter: function (value, ctx) {
            if (!ctx.active) {
              return Math.round((value * total) / 100);
            } else if (ctx.dataIndex == correctAnswer - 1) {
              return "בהובלה";
            } else {
              return "מאחור";
            }
          },
        },
      },
    ],
  };
  return (
    <div className='flex-container'>
      <Typography variant='h4' font='Montserrat'>מצב הקבוצות (פלח, תגיד איזה שם אתה רוצה)</Typography>
      <Typography variant='h5' font='Montserrat'>
        {sentence}
        {/* {icon} */}
      </Typography>
      <audio autoPlay>
        <source
          src={
            "https://www.dropbox.com/s/rkly14ns3hnpq3i/zapsplat_animals_birds_spotted_dove_call_australia_56396.mp3?raw=1"
          }
        />
      </audio>
      <div className='bottom-bars'>
        <Bar
          data={data}
          options={{
            layout: {
              padding: {
                top: 40,
              },
              margin: {
                bottom: 20,
              },
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
                textMargin: 10,
                images: imagesByResult,
              },
              datalabels: {
                labels: {
                  color: "blue",
                  labels: {
                    title: {
                      font: {
                        weight: "bold",
                        size: 100,
                      },
                    },
                    value: {
                      color: "green",
                    },
                  },
                },
              },
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  ticks: {
                    fontSize: 30,
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
              yAxes: [
                {
                  gridLines: {
                    display: true,
                  },
                  ticks: {
                    display: true,
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

function CorrectnessIcon(result) {
  if (result) {
    return <img width={200} height={200} src={correctSvg} />;
  } else {
    return <img width={200} height={200} src={incorrectSvg} />;
  }
}
function imagesSetter(answers, winning){
  let imagesByResult = [];
  let correctA = {
    src: correctSvg,
    width: 30,
    height: 30
  }

  let wrongA = {
    src: incorrectSvg,
    width: 50,
    height: 30
  }

  for (let index = 0; index < answers.length; index++) {
    if (index + 1 === winning) {
        imagesByResult[index] = correctA;
      }
   else {
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
};

function castToScores(my_groups, total) {
  let scores = {};
  Object.keys(my_groups).forEach((element) => {
    scores[element] = Math.round((100 * my_groups[element].curr_score) / total);
  });
  return scores;
};

Groups.propTypes = {
  my_groups: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    my_groups: state.user.userState.phaseProp,
});

export default connect(mapStateToProps, {})(Groups);
