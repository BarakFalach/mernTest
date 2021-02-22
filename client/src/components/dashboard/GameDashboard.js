import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import { connect } from 'react-redux';
import { ChangePhase, resumePause } from '../../actions/dashboard';
import PlayersTable from './PlayersTable';
import './GameDashboard.css';
//comme
const Gamedashboard = ({
	resumePause,
	ChangePhase,
	phaseList,
	GameKey,
	usersData,
	curPhase,
	numOfPlayers,
}) => {
	const [pause, setPause] = useState(false);

	const ScreenButton = (e) => ChangePhase(e.target.name);
	const resumePauseButton = (e) => {
		setPause(!pause);
		resumePause(e.target.name);
	};

	return (
		<div className='out'>
			<h1> Welcome to Game </h1>
			<h1> Game key: {GameKey} </h1>
			<h1>Total Players: {numOfPlayers}</h1>
			<h1>connected Players: {Object.keys(usersData).length}</h1>

			<span className='container'>
				{phaseList.map((Phase, index) => (
					<button
						key={Phase}
						name={Phase}
						// color={index === curPhase ? 'blue' : 'green'}
						style={index === curPhase ? { color: 'blue' } : {}}
						onClick={(e) => ScreenButton(e)}
					>
						{Phase}
					</button>
				))}
			</span>
			<span>
				<button
					name='RESUME'
					disabled={!pause}
					onClick={(e) => resumePauseButton(e)}
				>
					Resume
				</button>
				<button
					name='PAUSE'
					disabled={pause}
					onClick={(e) => resumePauseButton(e)}
				>
					Pause
				</button>
			</span>
			<PlayersTable data={usersData} />
		</div>
	);
};
Gamedashboard.propTypes = {
	ChangePhase: PropTypes.func.isRequired,
	resumePause: PropTypes.func.isRequired,
	phaseList: PropTypes.array,
	GameKey: PropTypes.string,
	usersData: PropTypes.object,
	curPhase: PropTypes.number,
	numOfPlayers: PropTypes.number,
};
const mapStateToProps = (state) => ({
	phaseList: state.dashboard.phaseList,
	GameKey: state.dashboard.GameKey,
	usersData: state.dashboard.usersData,
	curPhase: state.dashboard.curPhase,
	numOfPlayers: state.dashboard.numOfPlayers,
});
export default connect(mapStateToProps, { resumePause, ChangePhase })(
	Gamedashboard
);
