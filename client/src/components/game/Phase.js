import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/user';
import Question from './Question';
import Bars from './Bars';
import { Answer } from './Answer';
import Video from './Video';
import Top3 from './Top3';
import { Poll } from './Poll';
import Groups from './Groups';
import WebcamCapture from './WebcamCapture';
import Welcome from './Welcome';
import Goodbye from './GoodBye';

const Phase = ({ phase }) => {
	switch (phase) {
		case 'Question':
			return <Question />;
		case 'answer':
			return <Answer />;
		case 'video':
			return <Video />;
		case 'poll':
			return <Poll />;
		case 'top3':
			return <Top3 />;
		case 'Group':
			return <Groups />;
		case 'bars':
			return <Bars />;
		case 'webCam':
			return <WebcamCapture />;
		default:
			return <Welcome />;
		// return <Goodbye />;
	}
};

Phase.propTypes = {
	phase: PropTypes.string,
};
const mapStateToProps = (state) => ({
	phase: state.user.userState.phase,
});

export default connect(mapStateToProps, {})(Phase);
