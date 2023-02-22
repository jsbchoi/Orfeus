import user_styles from "./userList.module.css";
import React, { useState, useEffect } from "react"
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
const baseURL = "http://127.0.0.1:4000/"


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
    axios.delete(baseURL + 'users/' + userId, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('User deleted successfully');
        console.log(response);
        const updatedUserList = users.filter(user => user.id !== userId);
        setUsers(updatedUserList);
      })
      .catch(error => {
        console.error('Error deleting user', error);
      });
  };

  function fetchData(token) {
    return axios.get(baseURL + 'users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.data)
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if (!token) {
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      setRole(decodedToken['role']);
      fetchData(token)
        .then(data => {
          console.log(data)
          setUsers(data);
        })
        .catch(error => console.error(error));
    }
  }, []);
  return (
    <body className={user_styles.profile_body}>
      <section className={user_styles.user_class}>
        <h1 className={user_styles.user_h1}>Users</h1>
        <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Privacy Level</th>
            <th>Account Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => handleUserClick(user)}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.privacy_level}</td>
              <td>{user.account_creation_date}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id, token)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {selectedUser && (
        <div>
          <h3>User Details</h3>
          <p>ID: {selectedUser.id}</p>
          <p>Username: {selectedUser.username}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Role: {selectedUser.role}</p>
          <p>Privacy Level: {selectedUser.privacy_level}</p>
          <p>Account Creation Date: {selectedUser.account_creation_date}</p>
        </div>
      )} */}
    </div>
      </section>
    </body>
  );
};

export default UserList;
