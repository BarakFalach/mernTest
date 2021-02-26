import React from 'react';
import { Link } from 'react-router-dom';
import playerIcon from '../../assets/player.png';
import '../layouts/css/Landing.css';
const Landing = () => (
	<div>
		<div>
			<h1 style={{ textAlign: 'center', fontSize: '5vmin' }}>ברוכים הבאים</h1>
		</div>
		<div className='flex-container-landing-main'>
			<Link className='right-side' to='/loginUser'>
				<img alt='playerIcon' src={playerIcon} style={{ height: '60vh' }} />
			</Link>
		</div>
		<div>
			<h1 style={{ textAlign: 'center', fontSize: '5vmin' }}>לחץ על התלמיד</h1>
		</div>
	</div>
);

export default Landing;
