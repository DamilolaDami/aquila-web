// Navbar.js
import React, { useState, useEffect } from 'react'
import {
  Nav,
  NavScrolledBar,
  NavLinkScrolled,
  NavLink,
  Bars,
  BarsBlack,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElement'
import { CSSTransition } from "react-transition-group";
import  Hamburger  from '../../src/assets/icons8-menu-50.png'

import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import ProfileAvatar from './profile_avatar'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material'

import { Link } from 'react-scroll'; // react-scroll is a library for scrolling in React
import SmallScreensNavbar from './smallscreennavbar';
import { useWindowWidthAndHeight } from './customhooks';


  const Navbar = ({navClass, linkClassName}) =>(
    <NavComponent navClass={navClass}
                  linkClassName = {linkClassName}
    />
);

export const NavComponent = ({onClick, navClass, linkClassName})=>{
  const [scrolling, setScrolling] = useState(false)
  const [user, setUser] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

 
  return (
    <nav className={navClass}>
      <NavLink
        to="/about"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        Contact
      </NavLink>
      <NavLink
        to="/newJob"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        Create 
      </NavLink>
      <NavLink
        to="/jobs"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        Jobs
      </NavLink>
      <NavLink
        to="/services"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        Services
      </NavLink>
      <NavBtn>
              {user ? null : <NavBtnLink to='/signin'>Sign In</NavBtnLink>}
              {user ? (
                <ProfileAvatar userdata={user} />
              ) : (
                <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
              )}
            </NavBtn>
    </nav>
  );
};

export default Navbar;