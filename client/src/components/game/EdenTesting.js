// import "../layouts/css/BarsAnimation.css";
// export const EdenTesting = () => {
//   return <div className='animatedDiv'>eden</div>;
// };

import React, { Component } from "react";
import "../layouts/css/EdenTesting.css";
// import Chart from "./assets/Chart.js";

class EdenTesting extends React.Component {
  constructor() {
    super();
  }

  render() {
    const EdenStyle = { colorBlue: "blue", colorRed: "red", fontW: "bold" };
    const edenHtml = (
      <body>
        {" "}
        <p style={{ color: "red", fontSize: "30px", fontWeight: "bold" }}>
          this is inline paragraph
        </p>
        <p style={{ color: EdenStyle.colorBlue, fontWeight: EdenStyle.fontW }}>
          internal- not really
        </p>
        <p className='EdenTesting'>External </p>
      </body>
    );
    const edenFlexBox = (
      <div>
        <div className='containerr'>
          <div className='flex-item item-1'>i1</div>
          <div className='flex-item item-2'>i2</div>
          <div className='flex-item item-3'>i3</div>
          <div className='flex-item item-4'>i4</div>
          <div className='flex-item item-5'>i5</div>
          <div className='flex-item item-1'>i1</div>
          <div className='flex-item item-2'>i2</div>
          <div className='flex-item item-3'>i3</div>
          <div className='flex-item item-4'>i4</div>
          <div className='flex-item item-5'>i5</div>
          <div className='flex-item item-1'>i1</div>
          <div className='flex-item item-2'>i2</div>
          <div className='flex-item item-3'>i3</div>
          <div className='flex-item item-4'>i4</div>
          <div className='flex-item item-5'>i5</div>
        </div>
        {/* <div className='containerr'>
          <div className='flex-item item-1'>i1</div>
          <div className='flex-item item-2'>i2</div>
          <div className='flex-item item-3'>i3</div>
          <div className='flex-item item-4'>i4</div>
          <div className='flex-item item-5'>i5</div>
          <div className='flex-item item-1'>i1</div>
          <div className='flex-item item-2'>i2</div>
          <div className='flex-item item-3'>i3</div>
          <div className='flex-item item-4'>i4</div>
          <div className='flex-item item-5'>i5</div>
          <div className='flex-item item-1'>i1</div>
          <div className='flex-item item-2'>i2</div>
          <div className='flex-item item-3'>i3</div>
          <div className='flex-item item-4'>i4</div>
          <div className='flex-item item-5'>i5</div>
          <div className='flex-item item-1'>i1</div>
          <div className='flex-item item-2'>i2</div>
          <div className='flex-item item-3'>i3</div>
          <div className='flex-item item-4'>i4</div>
          <div className='flex-item item-5'>i5</div>
        </div> */}
      </div>
    );

    return edenFlexBox;
  }
}
export default EdenTesting;

// // -- GAME CLASS --
// // import React, { Fragment } from "react";
// // import { connect } from "react-redux";
// // import PropTypes from "prop-types";
// // import Phase from "./Phase";
// // import "../layouts/css/NavbarBottom.css";

// // const Game = ({ score, name, group }) => {
// //   return (
// //     <Fragment>
// //       <h1>
// //         {" "}
// //         welcome {name} you current score is: {score} groupNumer : {group}
// //       </h1>
// //       <div>
// //         <Phase />
// //       </div>
// //       <div class='navbar'>
// //         <a href='#home' class='active'>
// //           Home
// //         </a>
// //         <a href='#news'>News</a>
// //         <a href='#contact'>Contact</a>
// //       </div>
// //     </Fragment>
// //   );
// // };
// // Game.propTypes = {
// //   score: PropTypes.number,
// //   name: PropTypes.string,
// //   group: PropTypes.string,
// // };
// // const mapStateToProps = (state) => ({
// //   score: state.user.userState.score,
// //   name: state.user.name,
// //   group: state.user.group,
// // });

// // export default connect(mapStateToProps, {})(Game);

// // import "../layouts/css/EdenQuestions.css";
// // import React, { Component } from "react";
// // import { connect } from "react-redux";
// // import PropTypes from "prop-types";
// // import { UserAnswer } from "../../actions/user";

// // class EdenTesting extends Component {
// //   constructor() {
// //     super();
// //     this.state = {};
// //   }

// //   render() {
// //     return (
// //       <div className='flex-container'>
// //         hello
// //         <div className='border'></div>
// //         <div>question</div>
// //       </div>
// //     );
// //   }
// // }
// // EdenTesting.propTypes = {
// //   question: PropTypes.string.isRequired,
// //   answers: PropTypes.array,
// //   time: PropTypes.number,
// //   UserAnswer: PropTypes.func.isRequired,
// // };

// // const mapStateToProps = (state) => ({
// //   question: state.user.userState.phaseProp.question,
// //   // answers: state.user.userState.phaseProp.answers,
// //   // time: state.user.userState.phaseProp.time,
// // });
// // export default connect(mapStateToProps, { UserAnswer })(EdenTesting);
