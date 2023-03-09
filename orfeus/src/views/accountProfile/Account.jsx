import account_styles from './Account.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const Account = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken['sub']);
      setRole(decodedToken['role']);
    }
  }, [navigate]);

  return (
    <>
      <body className={account_styles.profile_body}>
        <div className={account_styles.account_page}>
          
  
          <div className={account_styles.account_intro}>
            <h2 className={account_styles.username_profile}>
              <h2 className={account_styles.welcomeProfile}>
                WELCOME BACK {username}
                {/* {this.urlParams.get("username")}{" "} */}
              </h2>
            </h2>
            {role === 'admin' ? (
              <>
                <h2>You're an admin</h2>
              </>
            ) : (
              <h2>You're a user</h2>
            )}
          </div>
          <br></br>
        </div>
        <nav className={account_styles.account_nav}>
          <ul>
            <li>
              <div className={account_styles.home_icon}>
                <NavLink to={''} className={account_styles.navLink}>
                  <img
                    className={account_styles.home_page_icon}
                    src="assets/home.png"
                    alt=""
                  />
                </NavLink>
                {/* <div class="roof">
                  <div class="roof_edge"></div>
                </div>
                <div class="front"></div> */}
              </div>
            </li>
            <li>
              <div className={account_styles.about_icon}>
                <NavLink to={'security'} className={account_styles.navLink}>
                  <img
                    className={account_styles.password_page_icon}
                    src="assets/password.png"
                    alt=""
                  />
                </NavLink>
                {/* <div class="head">
                  <div class="eyes"></div>
                  <div class="beard"></div>
                </div> */}
              </div>
            </li>
            <li>
              <div className={account_styles.work_icon}>
                <NavLink to={'musicList'} className={account_styles.navLink}>
                  <img
                    className={account_styles.music_page_icon}
                    src="assets/music.png"
                    alt=""
                  />
                </NavLink>
                {/* <div class="paper"></div>
                <div class="lines"></div>
                <div class="lines"></div>
                <div class="lines"></div> */}
              </div>
            </li>
            <li>
              <div className={account_styles.mail_icon}>
                <NavLink to={'userPrivacy'} className={account_styles.navLink}>
                  <img
                    className={account_styles.privacy_page_icon}
                    src="assets/privacy.png"
                    alt=""
                  />
                </NavLink>
                {/* <div class="mail_base">
                  <div class="mail_top"></div>
                </div> */}
              </div>
            </li>
            {role === 'admin' && (
              <li>
                <div className={account_styles.home_icon}>
                  <NavLink to={'userList'} className={account_styles.navLink}>
                    <img
                      className={account_styles.home_page_icon}
                      src="assets/person.jpeg"
                      alt=""
                    />
                  </NavLink>
                </div>
              </li>
            )}
          </ul>
        </nav>
        <div className={account_styles.left_column}>
          <div id="Account" className={account_styles.tabcontent}>
            <h3>Account Overview</h3>
            <p>This is Account page.</p>
          </div>
        </div>

        <div id="Security" className={account_styles.tabcontent}>
          <h3>Username and Password</h3>
          <p>Change your username and password here.</p>
        </div>

        <div id="Administration" className={account_styles.tabcontent}>
          <h3>Administration Roles</h3>
          <p>This is the administration.</p>
        </div>

        <div>
          <Outlet />
        </div>
      </body>
    </>
  );
};

export default Account;
