import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import root_styles from './Root.module.css';
import jwt_decode from 'jwt-decode';

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken != null) {
      setLoggedIn(true);
      const decoded = jwt_decode(accessToken);
      setDecodedToken(decoded);
    } else {
      setLoggedIn(false);
      setDecodedToken(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setLoggedIn(false);
    setDecodedToken(null);
  };

  return (
    <div className={root_styles.navbar}>
      <NavLink to={'/'} className={root_styles.navLink}>
        Home
      </NavLink>
      <NavLink to={'/library'} className={root_styles.navLink}>
        Library
      </NavLink>
      <NavLink to={'/about'} className={root_styles.navLink}>
        About
      </NavLink>
      {loggedIn ? (
        <>
          <NavLink to={'/review'} className={root_styles.navLink}>
            Review
          </NavLink>
          <NavLink to={'/generate'} className={root_styles.navLink}>
            Generate Music
          </NavLink>
          <NavLink to={'/account'} className={root_styles.navLink}>
            Profile
          </NavLink>
          <NavLink
            to={'/home'}
            className={root_styles.navLink}
            onClick={handleLogout}
          >
            Logout
          </NavLink>
          {decodedToken && (
            <div style={{ color: 'white' }}>
              <a
                href="/account"
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  color: 'white',
                }}
              >
                {decodedToken.sub}
              </a>
              <img
                src="assets/person.jpeg"
                alt=""
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginLeft: '10px',
                  width: '30px',
                  height: '30px',
                }}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <NavLink to={'/login'} className={root_styles.navLink}>
            Login
          </NavLink>
          <NavLink to={'/signUp'} className={root_styles.navLink}>
            Sign Up
          </NavLink>
        </>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
