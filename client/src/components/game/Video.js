import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Player from "@vimeo/player";
import Vimeo from "@u-wave/react-vimeo";
import useWindowDimensions from "./windeoResize";
import { videoEnd } from "../../actions/user";

const Video = ({ videoUrl, videoEnd }) => {
  const { height, width } = useWindowDimensions();

  const onVideoEnd = () => videoEnd();

  return (
    <div>
      <Vimeo
        video={videoUrl}
        controls={false}
        height={height - 100}
        width={width}
        autoplay
        onEnd={onVideoEnd}
      />
    </div>
  );
};
Video.prototype = {
  videoUrl: PropTypes.string,
  videoEnd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  videoUrl: state.user.userState.phaseProp.videoUrl,
});
export default connect(mapStateToProps, { videoEnd })(Video);
