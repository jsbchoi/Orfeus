import user_styles from './userAccount.module.css';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const baseURL = 'http://127.0.0.1:4000/';

const UserAccount = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    function fetchData() {
      return axios
        .get(baseURL + '/users/' + username, {})
        .then((response) => response.data)
        .catch((error) => console.error(error));
    }
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken['sub']);
      fetchData()
        .then((data) => {
          console.log(data);
          setEmail(data);
        })
        .catch((error) => console.error(error));
    }
  }, [username, navigate]);


  // urlParams = new URLSearchParams(window.location.search);
  // render() {
  return (
    <body className={user_styles.profile_body}>
      <section className={user_styles.user_class}>
        <h1 className={user_styles.user_h1}>ACCOUNT</h1>
        <h2 className={user_styles.user_h2}>USERNAME:</h2>
        <div className={user_styles.username}>{username} </div>
        <h3 className={user_styles.user_h3}>EMAIL:</h3>
        <div className={user_styles.email}>{email}</div>
      </section>
    </body>
  );
};

export default UserAccount;
