import privacy_styles from './userPrivacy.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { Component } from 'react';
import { MDBSwitch } from 'mdb-react-ui-kit';

const UserAccount = () => {
  // urlParams = new URLSearchParams(window.location.search);
  // render() {
  return (
    <body className={privacy_styles.profile_body}>
      <section className={privacy_styles.privacy_class}>
        {/* dislay setting here */}
        <h1 className={privacy_styles.privacy_h1}>Privacy</h1>
        <div className={privacy_styles.privacy_switches}>
          <MDBSwitch id="flexSwitchCheckDefault" label="Public Profile" />
          <MDBSwitch id="flexSwitchCheckDefault" label="Make All Songs Public" />
        </div>
      </section>
    </body>
  );
};

export default UserAccount;
