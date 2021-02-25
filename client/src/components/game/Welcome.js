import React from "react";
import "../layouts/css/Welcome.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Welcome = ({ ratio }) => {
  console.log("ratio updated and " + ratio);
  if (ratio < 0) {
    return "Bad ratio from server";
  } else if (ratio < 0.6) {
    return (
      <div className='wholescreen'>
        <div dir='rtl' style={{ width: "60%" }} className='welcome-label'>
          ממתין לחברים..
          <LinearProgress
            style={{ height: "8%", marginTop: "5%" }}
            color='primary'
            variant='determinate'
            value={ratio * 100}
          />
        </div>
      </div>
    );
  } else {
    ratio = ratio >= 1 ? 1 : ratio;
    return (
      <div className='wholescreen'>
        <div dir='rtl' style={{ width: "60%" }} className='welcome-label'>
          כבר מתחילים!
          <LinearProgress
            style={{ height: "8%", marginTop: "5%" }}
            color='secondary'
            width='30px'
            variant='determinate'
            value={ratio * 100}
          />
        </div>
      </div>
    );
  }
};

Welcome.propTypes = {
  ratio: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ratio: state.user.userState.phaseProp.ratio,
});
export default connect(mapStateToProps, {})(Welcome);
