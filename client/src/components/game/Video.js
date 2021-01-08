import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Player from "@vimeo/player";
import Vimeo from "@u-wave/react-vimeo";
import useWindowDimensions from "./windeoResize";

const Video = ({ videoUrl }) => {
  const { height, width } = useWindowDimensions();
  return (
    <div>
      <Vimeo
        video={videoUrl}
        controls={false}
        height={height - 100}
        width={width}
        autoplay
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
