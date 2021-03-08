import React from "react";
import "../layouts/css/Welcome.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import Vimeo from "@u-wave/react-vimeo";
import useWindowDimensions from "./windeoResize";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const Welcome = ({ ratio }) => {
  const { height, width } = useWindowDimensions();
  const videoUrl = "https://vimeo.com/520870770";
  if (ratio < 0) {
    return "Bad ratio from server";
  } else if (ratio < 0.6) {
    return (
      <div className="wholescreen">
        <Vimeo
          video={videoUrl}
          controls={false}
          height={height * 0.7}
          width={width}
          autoplay
        />
        <div
          dir="rtl"
          style={{
            height: "100%",
            width: "80%",
            fontSize: "3vw",
            marginTop: "2%",
          }}
        >
          ממתין לחברים..
          <LinearProgress
            style={{ height: "5%", marginTop: "2%" }}
            color="primary"
            variant="determinate"
            value={ratio * 100}
          />
        </div>
      </div>
    );
  } else {
    ratio = ratio >= 1 ? 1 : ratio;
    return (
      <div className="wholescreen">
        <div dir="rtl" style={{ width: "60%" }} className="welcome-label">
          כבר מתחילים!
          <LinearProgress
            style={{ height: "8%", marginTop: "5%" }}
            color="secondary"
            width="30px"
            variant="determinate"
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
