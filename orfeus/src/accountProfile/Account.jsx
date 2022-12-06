import "./account.css";

import { Component } from "react";
import { Link } from "react-router-dom";

export default class accountProfile extends Component {
  render() {
    return (
      <body>
        <div className="account-page">
          <div className="profile-intro">
            <h1 class="accountProfile">Profile</h1>
            <h2 class="username-profile">Welcome (Username)</h2>
          </div>
          <br></br>
        </div>
        <div class="tab">
          <button class="tablinks" onclick="openCity(event, 'Music')">
            Your music
          </button>
          <button class="tablinks" onclick="openCity(event, 'LandC')">
            Likes and Comments
          </button>
          <button class="tablinks" onclick="openCity(event, 'Settings')">
            Settings
          </button>
        </div>
      </body>
    );
  }
}
