import React, { useState } from 'react';
import { getAuth, onAuthStateChanged, User} from 'firebase/auth';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight, faCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const ProfileAvatar = ({ userdata }: { userdata: User }) => {
    //logout
    const logout = () => {
        const auth = getAuth();
        auth.signOut();
      };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    return (
      <div className="avatar-container" onClick={toggleDropdown}>
        <img
          src={userdata.photoURL || 'https://www.w3schools.com/howto/img_avatar.png'}
          alt="Avatar"
          className="avatar"
        />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <DropdownItem
                message="Profile"
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                rightIcon={<FontAwesomeIcon icon={faAngleRight} />}
                isLogout={false}
                onClick={() => {}}
            />
           
            <DropdownItem
                message="New Job"
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                rightIcon={<FontAwesomeIcon icon={faAngleRight} />}
                isLogout={false}
                onClick={() => {
                    window.location.href = "/newJob"
                }}
            />
            <DropdownItem
                message="Settings"
                leftIcon={<FontAwesomeIcon icon={faCog} />}
                rightIcon={<FontAwesomeIcon icon={faAngleRight} />}
                isLogout={false}
                onClick={() => {}}
            />
            <DropdownItem
                message="Logout"
                leftIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
                rightIcon={<i className="fas fa-angle-right"></i>}
                isLogout={true}
                onClick={() => logout()}
            />
          </div>
        )}
      </div>
    );
  };

export default ProfileAvatar;

//drop down item holder 
const DropdownItem = ({ message, leftIcon, rightIcon, isLogout, onClick }: { message: string, leftIcon: any, rightIcon: any, isLogout: boolean, onClick: any }) => {
    return (
      <a href="#" className="menu-item" onClick={onClick}>
        <span className="left-icon">{leftIcon}</span>
        <span className="menu-item-text">{message}</span>
        {rightIcon && <span className="right-icon">{rightIcon}</span>}
      </a>
    );
  };
  