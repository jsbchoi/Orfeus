import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import root_styles from './Root.module.css';
import NewMusicPlayer from '../../components/newMusicPlayer/NewMusicPlayer';
//for the mui for navbar/appbar
import { grey, purple } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useMediaPlayer } from '../../MediaPlayerContext';
import { useBeforeunload } from 'react-beforeunload';

const pages = ['Home', 'About', 'Library', 'Login', 'Signup'];

const Root = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();
  const { selectedSong, setSelectedSong } = useMediaPlayer();
  useBeforeunload(() => {
    setSelectedSong(null);
  });
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken != null) {
      setLoggedIn(true);
      const decoded = jwt_decode(accessToken);
      setDecodedToken(decoded);
    } else {
      setLoggedIn(false);
      setDecodedToken(null);
    }
  }, [location]);

  const navigate = useNavigate();
  const handleHomepageClick = () => {
    navigate('/');
  };
  const handleAboutpageClick = () => {
    navigate('/about');
  };
  const handleLibrarypageClick = () => {
    navigate('/library');
  };
  const handleLoginpageClick = () => {
    navigate('/login');
  };
  const handleSignuppageClick = () => {
    navigate('/signup');
  };
  const handleGeneratepageClick = () => {
    navigate('/generate');
  };
  const handleProfilepageClick = () => {
    navigate('/account');
  };
  const handleLogoutpageClick = () => {
    localStorage.removeItem('access_token');
    setLoggedIn(false);
    setDecodedToken(null);
    navigate('/');
  };

  return (
    <div className={root_styles.root}>
      <AppBar position="static" className={root_styles.navbar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="paragraph"
              //href="/"
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: purple[400],
                textDecoration: 'none',
              }}
            >
              ORFEUS
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { md: 'flex' },
                flexDirection: 'row',
              }}
            >
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handleHomepageClick}
              >
                Home
              </Button>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                component="a"
                href="https://orfeus8.wixsite.com/orfeus"
                target="_blank"
                rel="noopener"
              >
                About
              </Button>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handleLibrarypageClick}
              >
                Library
              </Button>
              {loggedIn ? (
                <>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={handleGeneratepageClick}
                  >
                    Generate Music
                  </Button>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={handleProfilepageClick}
                  >
                    Profile
                  </Button>
                  <Box
                    sx={{
                      flexGrow: 0,
                      marginLeft: 'auto',
                      placeSelf: 'center end',
                      flexDirection: 'row',
                    }}
                  >
                    {decodedToken && (
                      <div
                        style={{
                          color: 'white',
                          display: 'flex-inline',
                          flexDirection: 'row',
                        }}
                      >
                        {/* <a
                          href="/account"
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                            color: "white",
                          }}
                        >
                          {decodedToken.sub}
                        </a> */}
                        <Typography
                          component="paragraph"
                          //onClick={handleProfilepageClick}
                          sx={{
                            mr: 2,
                            color: 'white',
                            textDecoration: 'none',
                          }}
                        >
                          Welcome{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            {' '}
                            {decodedToken.sub}
                          </span>
                        </Typography>
                        <SentimentVerySatisfiedIcon
                          onClick={handleProfilepageClick}
                        />
                      </div>
                    )}
                  </Box>
                  <Button
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      // marginLeft: "auto",
                    }}
                    onClick={handleLogoutpageClick}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      justifySelf: 'flex-end',
                      marginLeft: 'auto',
                    }}
                    onClick={handleLoginpageClick}
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={handleSignuppageClick}
                  >
                    Signup
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={root_styles.outlet}>
        <Outlet />
      </div>
      <div className={root_styles.audio_player}>
        {selectedSong && <NewMusicPlayer songId={selectedSong.id} />}
      </div>
    </div>
  );
};

export default Root;
