import user_styles from './userAccount.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { Component } from 'react';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const baseURL = 'http://127.0.0.1:5000/';

const UserAccount = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken['sub']);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log(data);
        setEmail(data);
      })
      .catch((error) => console.error(error));
  }, [username]);

  function fetchData() {
    return axios
      .get(baseURL + '/users/' + username, {})
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  // urlParams = new URLSearchParams(window.location.search);
  // render() {
  return (
    <body className={user_styles.profile_body}>
      <section className={user_styles.user_class}>
        <h1 className={user_styles.user_h1}>Account</h1>
        <h2 className={user_styles.user_h2}>Username</h2>
        <div className={user_styles.username}>{username} </div>
        <h3 className={user_styles.user_h3}>Email</h3>
        <div className={user_styles.email}>{email}</div>
      </section>
    </body>
  );
};

export default UserAccount;
