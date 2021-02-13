import React, { View } from "react";
import { Link } from "react-router-dom";
import managerIcon from "../../assets/managar2.png";
import playerIcon from "../../assets/player.png";
import Typography from "@material-ui/core/Typography";
import "../../App.css";

const Landing = () => (
  <div>
    <div>
      <Typography variant='h2' style={{ textAlign: "center" }}>
        Welcome to LCE
      </Typography>
    </div>
    <Link className='left-side' to='/loginAdmin'>
      <img
        alt='mangerIcon'
        src={managerIcon}
        width='350px'
        height='400px'
        className='avatar'
      />
    </Link>
    <Link className='right-side' to='/loginUser'>
      {/* <Typography className='right-side' variant='h5'>
        User
      </Typography> */}
      <img alt='playerIcon' src={playerIcon} width='350px' height='400px' />
    </Link>
  </div>
);

export default Landing;
