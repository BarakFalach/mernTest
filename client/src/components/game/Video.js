import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Player from "@vimeo/player";
import Vimeo from "@u-wave/react-vimeo";

const Video = ({ videoUrl }) => {
  return (
    <div>
      <Vimeo
        video={videoUrl}
        controls="false"
        autoplaygit
        onEnd={() => console.log("VIDEO ENDED")}
      />
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
