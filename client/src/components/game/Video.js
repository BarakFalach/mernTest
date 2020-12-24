import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Video = ({ videoUrl }) => {
  return (
    <div>
      <iframe
        src={videoUrl}
        width="640"
        height="360"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
      ></iframe>
    </div>
  );
};
Video.prototype = {
  videoUrl: PropTypes.string,
};

const mapStateToProps = (state) => ({
  videoUrl: state.user.userState.phaseProp.videoUrl,
});
export default connect(mapStateToProps, {})(Video);
