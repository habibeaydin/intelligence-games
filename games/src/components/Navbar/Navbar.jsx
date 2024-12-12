import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon_light from '../../assets/search-w.png'
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <>
    <div className="navbar">
        <img src={logo} alt="" className='logo'/>
        <div className="logo-name"></div>
        <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/games">Games</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
        </ul>
        <div className="search-box">
            <input type="text" placeholder='Search'/>
            <img src={search_icon_light} alt="" />
        </div>
        <div className="settings-icon">
            <SettingsIcon/>
        </div>
    </div>
    </>
  )
}

export default Navbar