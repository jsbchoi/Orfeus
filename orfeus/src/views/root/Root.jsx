import root_styles from './Root.module.css';
import { NavLink, Outlet } from 'react-router-dom';
const Root = () => {
  return (
    <div className={root_styles.navbar}>
      <NavLink to={'/home'} className={root_styles.navLink}>
        Home
      </NavLink>
      <NavLink to={'/account'} className={root_styles.navLink}>
        Profile
      </NavLink>
      <NavLink to={'/review'} className={root_styles.navLink}>
        Review
      </NavLink>
      <NavLink to={'/generate'} className={root_styles.navLink}>
        Generate Music
      </NavLink>
      <NavLink to={'/library'} className={root_styles.navLink}>
        Library
      </NavLink>
      <NavLink to={'/about'} className={root_styles.navLink}>
        About
      </NavLink>
      <NavLink to={'/signUp'} className={root_styles.navLink}>
        Sign Up
      </NavLink>
      <NavLink to={'/login'} className={root_styles.navLink}>
        Login
      </NavLink>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
