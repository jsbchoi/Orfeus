import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import root_styles from "./Root.module.css";
import jwt_decode from "jwt-decode";

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
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
    localStorage.removeItem("access_token");
    setLoggedIn(false);
    setDecodedToken(null);
  };

  return (
    <div className={root_styles.navbar}>
      <NavLink to={"/"} className={root_styles.navLink}>
        HOME
      </NavLink>
      <NavLink
        exact
        to={"/library"}
        className={root_styles.navLink}
        activeClassName={root_styles.activeLink}
      >
        LIBRARY
      </NavLink>
      <NavLink to={"/about"} className={root_styles.navLink}>
        ABOUT
      </NavLink>
      {loggedIn ? (
        <>
          <NavLink to={"/review"} className={root_styles.navLink}>
            REVIEW
          </NavLink>
          <NavLink to={"/generate"} className={root_styles.navLink}>
            GENERATE MUSIC
          </NavLink>
          <NavLink to={"/account"} className={root_styles.navLink}>
            PROFILE
          </NavLink>
          <NavLink
            to={"/"}
            className={root_styles.navLink}
            onClick={handleLogout}
          >
            LOGOUT
          </NavLink>
          {decodedToken && (
            <div
              style={{ color: "white" }}
              className={root_styles.account_image}
            >
              <a
                href="/account"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  color: "white",
                }}
              >
                {decodedToken.sub}
              </a>
              <img
                src="assets/person.jpeg"
                alt=""
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "10px",
                  width: "30px",
                  height: "30px",
                }}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <NavLink to={"/login"} className={root_styles.navLink}>
            LOGIN
          </NavLink>
          <NavLink to={"/signUp"} className={root_styles.navLink}>
            SIGN UP
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
