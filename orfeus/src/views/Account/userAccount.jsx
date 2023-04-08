import user_styles from './userAccount.module.css';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';
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
        <Grid container direction={'column'} spacing={5}>
          <Grid item>
            <Avatar
              alt={username}
              src="/static/images/avatar/2.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <h1 className={user_styles.user_h1}>ACCOUNT</h1>
          </Grid>
          <Grid item sx={{ backgroundColor: purple[400] }}>
            <h2 className={user_styles.user_h2}>USERNAME:</h2>
            <div className={user_styles.username}>{username} </div>
          </Grid>
          <Grid item>
            <h3 className={user_styles.user_h3}>EMAIL:</h3>
            <div className={user_styles.email}>{email}</div>
          </Grid>
        </Grid>
      </section>
      <section>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="12"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                    backgroundColor: purple[400],
                  }}
                >
                  <Avatar
                    alt={username}
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: 56,
                      height: 56,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  />
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="my-5"
                    style={{ width: '80px' }}
                    fluid
                  />
                  <MDBTypography tag="h1">{username}</MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="12">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Username</MDBTypography>
                        <MDBCardText>{username}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText>{email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <MDBIcon fab icon="facebook me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="twitter me-3" size="lg" />
                      </a>
                      <a href="#!">
                        <MDBIcon fab icon="instagram me-3" size="lg" />
                      </a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </div>
  );
};

export default UserAccount;
