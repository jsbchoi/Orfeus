import "./account.css";

import { Component } from "react";

export default class accountProfile extends Component {
  urlParams = new URLSearchParams(window.location.search)
  render() {
    return (
      <body>
        <div className="account-page">
          <div className="profile-intro">
            <h1 class="accountProfile">Profile</h1>
            <h2 class="username-profile">Welcome {this.urlParams.get("username")}</h2>
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
