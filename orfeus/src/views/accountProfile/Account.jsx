import account_styles from './Account.module.css';
import { Component } from 'react';

export default class accountProfile extends Component {
  urlParams = new URLSearchParams(window.location.search);
  render() {
    return (
      <body className={account_styles.profile_body}>
        <div className={account_styles.account_page}>
          <div class="profile-intro">
            <h1 className={account_styles.accountProfile}>Profile</h1>
          </div>
          <div className={account_styles.account_intro}>
            <h2 class="username-profile">
              WELCOME BACK{this.urlParams.get('username')}
            </h2>
          </div>
          <br></br>
        </div>
        <nav className={account_styles.account_nav}>
          <ul>
            <li>
              <div class="home-icon">
                {/* <div class="roof">
                  <div class="roof-edge"></div>
                </div>
                <div class="front"></div> */}
              </div>
            </li>
            <li>
              <div class="about-icon">
                {/* <div class="head">
                  <div class="eyes"></div>
                  <div class="beard"></div>
                </div> */}
              </div>
            </li>
            <li>
              <div class="work-icon">
                {/* <div class="paper"></div>
                <div class="lines"></div>
                <div class="lines"></div>
                <div class="lines"></div> */}
              </div>
            </li>
            <li>
              <div class="mail-icon">
                {/* <div class="mail-base">
                  <div class="mail-top"></div>
                </div> */}
              </div>
            </li>
          </ul>
        </nav>
        <div id="Account" className={account_styles.tabcontent}>
          <h3>Account Overview</h3>
          <p>This is Account page.</p>
        </div>

        <div id="Security" className={account_styles.tabcontent}>
          <h3>Username and Password</h3>
          <p>Change your username and password here.</p>
        </div>

        <div id="Administration" className={account_styles.tabcontent}>
          <h3>Administration Roles</h3>
          <p>This is the administration.</p>
        </div>

        <section className={account_styles.account_class}>
          <h1 className={account_styles.sccount_h1}>Account</h1>
          <h2 className={account_styles.sccount_h2}>
            Username {this.urlParams.get('username')}
          </h2>
          <h2 className={account_styles.sccount_h2}>
            Email {this.urlParams.get('password')}
          </h2>
        </section>
      </body>
    );
  }
}
