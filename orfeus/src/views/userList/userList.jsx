import user_styles from './userList.module.css';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
const baseURL = 'http://127.0.0.1:4000/';

const UserList = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem('access_token');

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (userId, token) => {
    console.log(`Deleting user with ID ${userId}`);
    axios
      .delete(baseURL + 'users/' + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('User deleted successfully');
        console.log(response);
        const updatedUserList = users.filter((user) => user.id !== userId);
        setUsers(updatedUserList);
      })
      .catch((error) => {
        console.error('Error deleting user', error);
      });
  };

  function fetchData(token) {
    return axios
      .get(baseURL + 'users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (!token) {
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      setRole(decodedToken['role']);
      fetchData(token)
        .then((data) => {
          console.log(data);
          setUsers(data);
        })
        .catch((error) => console.error(error));
    }
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      width: 110,
    },
    {
      field: 'privacy_level',
      headerName: 'PrivacyLevel',
      type: 'number',
      width: 150,
    },
    {
      field: 'account_creation_date',
      headerName: 'Account Creation Date',
      width: 200,
    },
    {
      field: 'profile_picture_path',
      headerName: 'Profile Picture Path',
      width: 200,
    },
  ];
  return (
    <body className={user_styles.profile_body}>
      <Box
        sx={{
          height: 400,
          width: '100%',
          backgroundColor: 'white',
          outlineColor: 'black',
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection={{ color: 'white' }}
          disableRowSelectionOnClick
          sx={{
            color: 'black',
            outlineColor: 'black',
          }}
        />
      </Box>
    </body>
  );
};

export default UserList;
