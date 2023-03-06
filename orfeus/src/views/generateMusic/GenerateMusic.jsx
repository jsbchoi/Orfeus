import styles from "./generateMusic.module.css";

import React, { Component } from "react";
import Upload from "./upload";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GenerateMusic = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/Login");
    } else {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken["sub"]);
      setRole(decodedToken["role"]);
    }
  }, [navigate, role]);
  return (
    <body>
      <div className={styles.generate_music_form}>
        <div>
          <Upload />
        </div>
      </div>
    </body>
  );
};

export default GenerateMusic;
