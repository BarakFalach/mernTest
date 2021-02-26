import React from "react";
import { Link } from "react-router-dom";
import managerIcon from "../../assets/managar2.png";
import playerIcon from "../../assets/player.png";
import "../layouts/css/Landing.css";
const Landing = () => (
  <div>
    <div>
      <h1 style={{ textAlign: "center", fontSize: "5vmin" }}>ברוכים הבאים</h1>
    </div>
    <div className='flex-container-landing-main'>
      {/* <Link className='left-side' to='/loginAdmin'>
        <img
          alt='mangerIcon'
          src={managerIcon}
          width='350px'
          height='400px'
          className='avatar'
        />
      </Link> */}
      <Link className='right-side' to='/loginUser'>
        {/* <Typography className='right-side' variant='h5'>
          User
        </Typography> */}
        <img alt='playerIcon' src={playerIcon} style={{ height: "60vh" }} />
      </Link>
    </div>
    <div>
      <h1 style={{ textAlign: "center", fontSize: "5vmin" }}>לחץ על התלמיד</h1>
    </div>
  </div>
);

export default Landing;
