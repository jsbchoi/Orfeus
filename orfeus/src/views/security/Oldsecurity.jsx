import security_styles from './security.module.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = 'http://127.0.0.1:5000/';

const Security = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = localStorage.getItem('access_token');

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
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      console.log("Passwords don't match");
      return;
    }
    try {
      const response = await axios.put(baseURL + 'users/' + username, {
        email: email,
        password: password,
      });
      console.log(response.data);
      toast.success('Password changed successfully');
      navigate('/account/security');
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

  return (
    <body className={security_styles.profile_body}>
      <ToastContainer />
      <section className={security_styles.security_class}>
        <h1 className={security_styles.security_h1}>Security</h1>
        <Form className={security_styles.security_form}>
          <Form.Group controlId="name">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Enter New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </section>
    </body>
  );
};

export default Security;
