import user_styles from './userAccount.module.css';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import axios from 'axios';
const baseURL = 'http://127.0.0.1:4000/';

const UserAccount = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    function fetchData() {
      const decodedToken = jwt_decode(token);
      return axios
        .get(baseURL + '/users/' + decodedToken['sub'], {})
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
  }, [navigate]);

  // urlParams = new URLSearchParams(window.location.search);
  // render() {
  return (
    <div className={user_styles.profile_body}>
      <section className={user_styles.user_class}>
        <Avatar
          alt={username}
          src="/static/images/avatar/2.jpg"
          sx={{ width: 56, height: 56 }}
        />
        <h1 className={user_styles.user_h1}>ACCOUNT</h1>
        <Grid container direction={'column'} spacing={5}>
          <Grid item>
            <h2 className={user_styles.user_h2}>USERNAME:</h2>
            <div className={user_styles.username}>{username} </div>
          </Grid>
          <Grid item>
            <h3 className={user_styles.user_h3}>EMAIL:</h3>
            <div className={user_styles.email}>{email}</div>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default UserAccount;
