import React from "react";
import "../layouts/css/GenericTrack.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const GenericTrack = ({ mediaKey, paragraph }) => {
  let audioPath = "assets/generic/" + mediaKey + ".wav";
  let imagePath = "assets/generic/" + mediaKey + ".png";
  let audio = React.useRef();
  React.useEffect(() => {
    audio.current = new Audio(audioPath);
    audio.current.play();
    return () => {
      if (!audio.paused) {
        audio.current.pause();
      }
    };
  }, []);
  return <img src={imagePath} alt="not found" />;
};
GenericTrack.propTypes = {
  mediaKey: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  mediaKey: state.user.userState.phaseProp.key,
  paragraph: state.user.userState.phaseProp.paragraph,
});
export default connect(mapStateToProps, {})(GenericTrack);
