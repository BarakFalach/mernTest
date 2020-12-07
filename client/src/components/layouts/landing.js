import React from 'react'
import { Link } from 'react-router-dom'
import managerIcon from '../../assets/managar2.png'
import playerIcon from '../../assets/player.png'
import '../../App.css';


const Landing = () => (   
    <div>
        <h1 className="aaa"> Welcome to LCE </h1>
        <Link to='/loginAdmin'> 
            <div> 
                <img src={managerIcon} width="350px" height="400px" className="avatar"/> 
            </div> 
            
        </Link>

        <Link to='/loginUser'> 
            <div> <img src={playerIcon} width="350px" height="400px"/> </div>            
        </Link>
        
    </div>
)

export default Landing
