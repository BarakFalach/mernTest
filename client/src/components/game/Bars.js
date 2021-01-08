import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

const Bars = ({ distribution, correct }) => {
  const [buttonDisable, setDisable] = useState(false);
  return (
    <div className='Bars_Comp'>
      <div className='col-centered'>This is bars</div>
      <span className='bars'>
        {Object.entries(distribution).map(([key, value]) => (
          <button
            fullWidth='true'
            variant='contained'
            color='primary'
            style={{ margin: 5 }}
            // disabled={buttonDisable}
            name={key}
          >
            <li>{key}</li>
            <li>{value}</li>
          </button>
        ))}
      </span>
    </div>
  );
};
Bars.propTypes = {
  distribution: PropTypes.object.isRequired,
  correct: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  distribution: state.user.userState.phaseProp.distribution,
  correct: state.user.userState.phaseProp.correct,
});

export default connect(mapStateToProps, {})(Bars);
