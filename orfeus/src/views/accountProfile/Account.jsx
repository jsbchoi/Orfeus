import account_styles from './Account.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Dashboard from '@mui/icons-material/Dashboard';
import Privacy from '@mui/icons-material/PrivacyTip';
import Security from '@mui/icons-material/Security';
import Music from '@mui/icons-material/MusicNote';
import People from '@mui/icons-material/People';
import Edit from '@mui/icons-material/Edit';
import { grey, purple } from '@mui/material/colors';

const drawerWidth = 200;

const Account = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken['sub']);
      setRole(decodedToken['role']);
    }
  }, [navigate]);

  const handlePrivacyClick = () => {
    navigate('/account/userPrivacy');
  };

  const handleDashboardClick = () => {
    navigate('/account/');
  };
  const handleSecurityClick = () => {
    navigate('/account/security');
  };
  const handleMusicClick = () => {
    navigate('/account/musicList');
  };
  const handleUserClick = () => {
    navigate('/account/userList');
  };
  const handleEditClick = () => {
    navigate('/account/edit');
  };

  return (
    <div>
      <div className={account_styles.page_content}>
        <Box sx={{ display: 'flex', marginTop: '5%'}}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              marginTop: '4.8%',
              zIndex: 1,
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
              backgroundColor: purple[400],
            }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                WELCOME BACK {username}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              zIndex: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#0a1929',
                color: 'white',
                iconColor: 'white',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
              <ListItem key="Dashboard" disablePadding>
                <ListItemButton onClick={handleDashboardClick}>
                  <ListItemIcon>
                    <Dashboard sx={{ color: purple[400] }} />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Your Music" disablePadding>
                <ListItemButton onClick={handleMusicClick}>
                  <ListItemIcon>
                    <Music sx={{ color: purple[400] }} />
                  </ListItemIcon>
                  <ListItemText primary="Your Music" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Edit Profile" disablePadding>
                <ListItemButton onClick={handleEditClick}>
                  <ListItemIcon>
                    <Edit sx={{ color: purple[400] }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Privacy" disablePadding>
                <ListItemButton onClick={handlePrivacyClick}>
                  <ListItemIcon>
                    <Privacy sx={{ color: purple[400] }} />
                  </ListItemIcon>
                  <ListItemText primary="Privacy" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Security" disablePadding>
                <ListItemButton onClick={handleSecurityClick}>
                  <ListItemIcon>
                    <Security sx={{ color: purple[400] }} />
                  </ListItemIcon>
                  <ListItemText primary="Security" />
                </ListItemButton>
              </ListItem>
              {role === 'admin' && (
                <ListItem key="Users" disablePadding>
                  <ListItemButton onClick={handleUserClick}>
                    <ListItemIcon>
                      <People sx={{ color: purple[400] }} />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'white', p: 3 }}>
            <Toolbar />
            <div className={account_styles.outlet}>
              <Outlet />
            </div>
          </Box>
        </Box>
        {/* <div>
        <Outlet />
      </div> */}
      </div>
    </div>
  );
};

export default Account;
