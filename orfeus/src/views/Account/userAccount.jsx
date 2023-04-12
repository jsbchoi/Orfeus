import user_styles from './userAccount.module.css';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { grey, purple } from '@mui/material/colors';

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
        <Grid container direction={'column'} spacing={5} >
          <Grid item>
            <h1 className={user_styles.user_h1}>ACCOUNT</h1>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              alt={username}
              src="/static/images/avatar/2.jpg"
              sx={{
                width: 56,
                height: 56,
              }}
            />
          </Grid>
          <Grid item>
            <Divider>Information</Divider>
          </Grid>
          <Grid item>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Username" secondary={username} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default UserAccount;
