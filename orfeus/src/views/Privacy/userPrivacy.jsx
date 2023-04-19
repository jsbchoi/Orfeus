import privacy_styles from './userPrivacy.module.css';
import { MDBSwitch } from 'mdb-react-ui-kit';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:4000/';

const UserAccount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const token = localStorage.getItem('access_token');

  const [isPublicProfile, setIsPublicProfile] = useState(null); // initial state value

  const handlePublicProfileChange = (event) => {
    const newPrivacyLevel = event.target.checked ? 1 : 0; // map the switch value to the privacy level value
    setIsPublicProfile(event.target.checked); // update state with the new value

    // make the axios PUT request to update the user privacy level
    axios
      .put(baseURL + '/users/privacy/' + username, {
        privacy: newPrivacyLevel,
      })
      .then((response) => {
        console.log(response.data.message);
        // do something with the response data
      })
      .catch((error) => {
        console.error(error);
        // handle the error
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken['sub']);
      axios
        .get(baseURL + '/users/privacy_level/' + decodedToken['sub'])
        .then((response) => {
          setIsPublicProfile(response.data.privacy_level === '1');
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);
  return (
    <div className={privacy_styles.profile_body}>
      <h1 className={privacy_styles.privacy_h1}>Privacy</h1>
      <div className={privacy_styles.privacy_switches}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={isPublicProfile}
                onChange={handlePublicProfileChange}
                color="secondary"
                size="large"
              />
            }
            label="Public Profile"
            sx={{ fontSize: '20%' }}
          />
          <FormControlLabel
            control={<Switch defaultChecked color="secondary" />}
            label="Make All Songs Public"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default UserAccount;
