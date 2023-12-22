import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
    <ul className="navBar">
      <h1>
        <NavLink exact to="/">
          <p style={{color: "#e26f22"}}>
            <i className="fa-brands fa-airbnb fa-xl" style={{color: "#e26f22"}} />
            groundbnb
          </p>
        </NavLink>
      </h1>
      {isLoaded && (
      <div>
          <ProfileButton user={sessionUser} />
      </div>
      )}
    </ul>
    <section id='bar' />
    </>
  );
}

export default Navigation;
