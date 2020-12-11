import React from "react";
import { Link } from "react-router-dom";
import managerIcon from "../../assets/managar2.png";
import playerIcon from "../../assets/player.png";
import "../../App.css";

const Landing = () => (
  <span>
    <h1 className='aaa'> Welcome to LCE </h1>
    <Link to='/loginAdmin'>
      <img
        alt='mangerIcon'
        src={managerIcon}
        width='350px'
        height='400px'
        className='avatar'
      />
    </Link>
    <Link to='/loginUser'>
      <img alt='playerIcon' src={playerIcon} width='350px' height='400px' />
    </Link>
  </span>
);

export default Landing;
