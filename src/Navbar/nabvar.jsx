import React from 'react';
import Navbar from './index';
import { Link } from 'react-scroll'; // react-scroll is a library for scrolling in React
import SmallScreensNavbar from './smallscreennavbar';
import { useWindowWidthAndHeight } from './customhooks';
import { NavLink } from 'react-router-dom';
const HeaderNav = () =>{
    // use our custom hook to get the the window size
    const [width, height] = useWindowWidthAndHeight();
    console.log(width)
    return(
        <header>
            <div className="header-inner">
                <NavLink to="/" 
                      smooth={true} 
                      className="logo nav-link">
                    AQUILA
                </NavLink>
                { width > 1000 ?
                <Navbar navClass="nav-big"
                        linkClassName="nav-big-link"/>
                :
                <SmallScreensNavbar navClass="nav-small"
                                    linkClassName = "nav-small-link"
                />
                } 
            </div>
        </header>
    )
}

export default HeaderNav;