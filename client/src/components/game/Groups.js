import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { Bar } from "react-chartjs-2";
import correctSvg from "../../assets/success-green-check-mark.svg";
import incorrectSvg from "../../assets/wrong.svg";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-labels";
import "../layouts/css/BarsAnimation.css";
// import  aud from "../../assets/beep.mp3"

const GroupsBars = ({
  my_groups
}) => {

  let sentence;
  if (my_groups[1].curr_score > my_groups[2].curr_score ) {
    sentence = "קבוצה מספר 1 היא הקבוצה המובילה";
  } else if (my_groups[1].curr_score == my_groups[2].curr_score ){
    sentence = "תיקו בין הקבוצות!";
  } else {
    sentence = "קבוצה מספר 2 היא הקבוצה המובילה";
  }

//   let distributionPercent = castToPercent(distribution);
//  let imagesByResult = imagesSetter(answers, correctAnswer, userAnswer);
  let colorSet = [
    "#0ead69",
    "#fdbd27",
    "#ea3546",
    "#2599e7",
    "#d4d5fd",
    "#f86624",
  ];

  const data = {
    labels: {},
    datasets: [
      {
        backgroundColor: colorSet,
        borderColor: colorSet,
        hoverBorderColor: "rgba(255,99,132,1)",
        //data: Object.values(distributionPercent),
        datalabels: {
          anchor: "end",
          align: "start",
          offset: 20,
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
        //   formatter: function (value, ctx) {
        //     console.log("user answer is " + userAnswer);
        //     if (!ctx.active) {
        //       return value + "%";
        //     } else if (ctx.dataIndex == correctAnswer - 1) {
        //       return "Correct";
        //     } else if (ctx.dataIndex == userAnswer - 1) {
        //       return "Yours";
        //     } else {
        //       return value + "%";
        //     }
        //   },
        },
      },
    ],
  };

  return (
    <div className='flex-container'>
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
                //images: imagesByResult,
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
// function imagesSetter(answers, correctAnswer, userAnswer) {
//   let imagesByResult = [];
//   for (let index = 0; index < answers.length; index++) {
//     if (index + 1 === userAnswer || index + 1 === correctAnswer) {
//       if (userAnswer === index + 1) {
//         imagesByResult[index] = {
//           //Wrong Answer
//           src: incorrectSvg,
//           width: 30,
//           height: 30,
//         };
//       }
//       if (correctAnswer === index + 1) {
//         imagesByResult[index] = {
//           //Correct Answer
//           src: correctSvg,
//           width: 30,
//           height: 30,
//         };
//       }
//     } else {
//       imagesByResult[index] = null;
//     }
//   }
//   return imagesByResult;
// }

GroupsBars.propTypes = {
  my_groups: PropTypes.array.isRequired,
};

// function castToPercent(distribution) {
//   let total = 0;
//   Object.values(distribution).forEach((element) => {
//     total += element;
//   });

//   let distributionPercent = {};
//   Object.keys(distribution).forEach((element) => {
//     distributionPercent[element] = Math.round(
//       (100 * distribution[element]) / total
//     );
//   });
//   return distributionPercent;
// }

const mapStateToProps = (state) => ({
  my_groups: state.user.userState.phaseProp,
});

export default connect(mapStateToProps, {})(GroupsBars);
