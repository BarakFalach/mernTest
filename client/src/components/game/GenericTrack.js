import React from "react";
import "../layouts/css/GenericTrack.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const GenericTrack = ({ mediaKey, paragraph }) => {
  let audioPath = "assets/generic/" + mediaKey + ".m4a";
  let imagePath = "assets/generic/" + mediaKey + ".png";
  let audio = new Audio(audioPath);
  audio.play();
  React.useEffect(() => {
    return () => {
      if (!audio.paused || !audio.currentTime) {
        audio.pause();
      }
    };
  }, []);
  return (
    <div className='generic-flexbox'>
      <img
        src={imagePath}
        style={{ fontSize: "10px" }}
        className='generic-image '
        alt='not found'
      />
      <div className='generic-paragraph'>{paragraph}</div>
    </div>
  );
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
