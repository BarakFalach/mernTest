import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { HorizontalBar } from "react-chartjs-2";
import correctSvg from "../../assets/rabbit.png";
import incorrectSvg from "../../assets/turtle.png";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-labels";
import "../layouts/css/Groups.css";

const Groups = ({
  my_groups = {1:{curr_score:60},
               2:{curr_score:20}},
  answers = ["1", "2"],
  winning = my_groups[1].curr_score>my_groups[2].curr_score? 1: my_groups[1].curr_score===my_groups[2].curr_score? 0 : 2,
  correctAnswer = winning === 1? 1: winning === 2? 2 : 0, 
}) => {
  let sentence;
  if (winning === 0) {
    sentence = "jrt";//"תיקו בין הקבוצות";
  } else {
    sentence = "קבוצה " + winning + " היא הקבוצה המובילה";
  }
  console.log(my_groups);
  let total = getTotalScores(my_groups)
  let groups_score = castToScores(my_groups, total);
  let imagesByResult = imagesSetter(answers, correctAnswer);
  let colorSet = [
    "#48C000",
    "#F0A800",
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
            size: 45,
          },
          color: function (ctx) {
            var value = ctx.dataset.data[ctx.dataIndex];
            return value > 0 ? "white" : null;
          },
          formatter: function (value, ctx) {
            if (!ctx.active) {
              console.log("not active");
              return Math.round((value * total) / 100);
            } else if (ctx.dataIndex == correctAnswer - 1) {
              return "בהובלה" ;
            } else {
              return "מאחורה";
            }
          },
        },
      },
    ],
  };
  return (
    <div className='flex-container-groups'>
      <Typography style={{marginTop:"1.5%"}} variant='h4' font='Montserrat'>מצב הקבוצות (פלח, תגיד איזה שם אתה רוצה)</Typography>
      <Typography style={{marginTop:"0.5%"}} variant='h5' font='Montserrat'>
        {sentence}
        {/* {icon} */}
      </Typography>
      <div className='bottom-bars-groups'>
        <HorizontalBar
          data={data}
          options={{
            layout: {
              padding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
              },
              margin: {
                // left: 30,
                // right: 50
              },
            },
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
                    max: 10
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

function imagesSetter(answers, winning){
  console.log("answers: " + answers);
  console.log("winning: " + winning);

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
    if (index + 1 == winning) {
        imagesByResult[index] = correctA;
      }
    else {
        imagesByResult[index] = wrongA;
    }
  }
  console.log(imagesByResult);
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
    //my_groups: state.user.userState.phaseProp,
});

export default connect(mapStateToProps, {})(Groups);
