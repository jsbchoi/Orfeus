import edit_styles from './editProfile.module.css';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { grey, purple } from '@mui/material/colors';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const baseURL = 'http://127.0.0.1:4000/';

const EditProfile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [email, setEmail] = useState(' ');
  const [newUsername, setNewUsername] = useState('');
  const [username, setUsername] = useState('');
  const token = localStorage.getItem('access_token');

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(file.name);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        baseURL + '/users/edit_profile/' + username,
        {
          username: newUsername,
          email: email,
        }
      );
      const decodedToken = jwt_decode(token);
      localStorage.setItem('username', username);
      console.log(response.data);
      toast.success('Username and Email Updated Successfully!');
      navigate('/account/edit');
    } catch (error) {
      console.error(error);
    }
  };

  function fetchData() {
    return axios
      .get(baseURL + 'users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[400],
    '&:hover': {
      backgroundColor: purple[600],
    },
  }));

  return (
    <div>
      <ToastContainer />
      <section className={edit_styles.main_container}>
        <Grid container direction={'column'} spacing={5}>
          <h1>Edit Profile</h1>
          <Grid item>
            <Avatar alt={username} src={file} sx={{ width: 56, height: 56 }} />
            <ColorButton
              variant="contained"
              component="label"
              endIcon={<PhotoCamera />}
            >
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleChange}
              />
            </ColorButton>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="fullWidth"
              label="Username"
              variant="outlined"
              defaultValue={username}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="fullWidth"
              label="Email"
              variant="outlined"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item>
            <ColorButton
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Update
            </ColorButton>
          </Grid>
        </Grid>
        {/* </Form> */}
      </section>
    </div>
  );
};

export default EditProfile;
