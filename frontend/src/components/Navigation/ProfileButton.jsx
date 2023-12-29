import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import { OpenModalMenuItem } from './';
import { LoginFormModal } from '../LoginFormModal';
import { SignupFormModal } from '../SignupFormModal';
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const thunkLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="menu">
      <button className='profileDropDown' onClick={toggleMenu}>
        <i className="fa-solid fa-bars" />
        <i className="fa-solid fa-circle-user fa-lg" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className = "userDropDownMenu">
            <p className='userInfo'>Hello, {user.firstName}</p>
            {/* <li>{user.firstName} {user.lastName}</li> */}
            <p className='userInfo'>{user.email}</p>
            <p className='manageSpots'>Manage Spots</p>
            <button className='logoutButton' onClick={thunkLogout}><NavLink exact to="/">Log Out</NavLink></button>
          </div>
        ) : (
          <div className = "sessionDropDownMenu">
              <OpenModalMenuItem
                itemText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
