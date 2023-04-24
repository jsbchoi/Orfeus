import React from 'react';
import useForm from './useForm';
import Input from './Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login_styles from './Login.module.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = 'http://127.0.0.1:4000/';

function Form() {
  const [data, setData] = useForm();
  const login = ['USERNAME', 'PASSWORD'];
  const type = ['text', 'password'];
  const navigate = useNavigate();

  function handleResponse(resp) {
    switch (resp.status) {
      case 200:
        console.log(resp.data);
        localStorage.setItem('access_token', resp.data.access_token);
        navigate('/account');
        break;
      case 403:
        console.log(resp.status);
        console.log('Bad credentials');
        toast.error('Bad credentials');
        break;
      default:
        break;
    }
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[400],
    '&:hover': {
      backgroundColor: purple[600],
    },
  }));

  function handleClick() {
    axios
      .post(baseURL + 'login', data)
      .then((response) => {
        console.log('Here');
        handleResponse(response);
      })
      .catch((error) => {
        console.error(`Axios error: ${error.message}`);
        console.error(`Status code: ${error.response.status}`);
        if (error.response.status === 403) {
          toast.error('Incorrect username or password');
        } else {
          toast.error('An error occurred');
        }
      });
  }
  return (
    <>
      {data.map((input, idx) => (
        <div className={login_styles.bubbleForm}>
          <ToastContainer
                  position="bottom-right"
                  autoClose={500}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  style={{ bottom: '80px' }} />
          <Input
            className={login_styles.login_input}
            key={idx}
            type={type[idx]}
            autoComplete={type[idx] === 'password' ? 'current-password' : ''}
            value={input.value}
            label={login[idx]}
            name={input.id}
            setValue={setData}
          />
        </div>
      ))}
      {
        <div className={login_styles.d_grid}>
          <ColorButton
              variant="contained"
              color="success"
              onClick={handleClick}
            >
              Login
            </ColorButton>
        </div>
      }
      {/* {data.map((d, i) => (
        <p key={i}> {JSON.stringify(d)} </p>
      ))} */}
    </>
  );
}

export default Form;
