import React from "react";
import "../layouts/css/GenericTrack.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const GenericTrack = ({ mediaKey }) => {
  let audioPath = "assets/generic/" + mediaKey + ".wav";
  let imagePath = "assets/generic/" + mediaKey + ".png";
  let audio = new Audio(audioPath);
  audio.play();
  React.useEffect(() => {
    return () => {
      if (!audio.paused || !audio.currentTime) {
        console.log("generic stop");
        audio.pause();
      }
    };
  }, []);
  return (
    <div className='generic-flexbox'>
      <img src={imagePath} alt='not found' />
    </div>
  );
};
GenericTrack.propTypes = {
  mediaKey: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  mediaKey: state.user.userState.phaseProp.key,
});
export default connect(mapStateToProps, {})(GenericTrack);
