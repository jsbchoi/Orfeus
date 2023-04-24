import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import MusicNote from '@mui/icons-material/MusicNote';
import Heart from 'react-heart';
import { Link, useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import songFile_style from './SongFile.module.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey, purple } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import DateRange from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Download from '@mui/icons-material/Download';
import QueueMusic from '@mui/icons-material/QueueMusic';
import { useNavigate } from 'react-router-dom';
import { useMediaPlayer } from '../../MediaPlayerContext';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
const baseURL = 'http://127.0.0.1:4000/';

const MusicDB = () => {
  const [songs, setSongs] = useState([]);

  function fetchData() {
    return axios
      .get(baseURL + "/carouselfiles")
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log(data);
        setSongs(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return songs;
};


export default function SongFile() {
  const songs = MusicDB();
  const { setSelectedSong } = useMediaPlayer();
  let { song_id } = useParams();
  const theme = useTheme();
  const [song, setSong] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('access_token');

  const [activeMap, setActiveMap] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (token !== null) {
      axios
        .get(baseURL + 'liked_songs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const likesDict = {};
          for (var i = 0; i < response.data.length; i++) {
            likesDict[response.data[i]['generated_file_id']] =
              response.data[i]['like_count'];
          }
          setActiveMap(likesDict);
        })
        .catch((error) => {
          console.error('Error deleting fetching user likes', error);
        });
    }
  }, [token]);

  const handleHeartClick = () => {
    if (activeMap[song_id]) {
      // Song is already liked, so decrement like count
      axios
        .post(baseURL + '/dislike/' + song_id, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 401) {
            localStorage.removeItem('access_token');
            navigate('/login');
          } else {
            setActiveMap((prevMap) => {
              const newMap = { ...prevMap };
              delete newMap[song_id]; // Delete the songId entry from the new map
              return newMap;
            });
          }
          song.likes = response.data['like_count'];
        })
        .catch((error) => {
          console.error('Error updating like count: ', error);
        });
    } else {
      // Song is not liked, so increment like count
      axios
        .post(baseURL + '/like/' + song_id, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 401) {
            localStorage.removeItem('access_token');
            navigate('/login');
          }
          setActiveMap((prevMap) => ({
            ...prevMap,
            [song_id]: response.data.like_count,
          }));
        })
        .catch((error) => {
          console.error('Error updating like count: ', error);
        });
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[400],
    '&:hover': {
      backgroundColor: purple[600],
    },
  }));

  function extractTitleFromFilepath(filepath) {
    try {
      const startIndex = filepath.indexOf('samples\\') + 8; // 8 is the length of "samples/"
      const endIndex = filepath.lastIndexOf('.mp3');
      const title = filepath.substring(startIndex, endIndex);

      return title;
    } catch (err) {
      return '';
    }
  }

  useEffect(() => {
    axios
      .get(baseURL + '/song/' + song_id)
      .then((response) => {
        setSong(response.data);
        return axios.get(baseURL + '/get_user/' + response.data.user_id);
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error(error));
  }, [song_id]);

  if (!song || !user) {
    return <div>Loading...</div>;
  }


  return (
    <div className={songFile_style.container}>
      {song_id}
      <Card
        sx={{
          display: 'flex',
          //   marginLeft: '10%',
          //   marginRight: '10%',
          backgroundColor: grey[600],
          color: 'white',
        }}
      >
        <MusicNote sx={{ width: 151, height: 151, marginLeft: '10%' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {extractTitleFromFilepath(song.filepath)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Artist: {user.username}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} 
              onClick={() => {
              {songs.map((song) => (
                song.id == song_id ?
                  setSelectedSong(song):null
                
              ))}
            }}/>
            </IconButton>

            <div>
              {!token && (
                <div style={{ width: '2rem' }}>
                  <Link to="/login">
                    <Heart
                      isActive={activeMap[song_id]}
                      animationTrigger="both"
                      inactiveColor="rgba(255,125,125,.75)"
                      activeColor="#e019ae"
                      style={{
                        marginTop: '-0.3rem',
                        cursor: 'default',
                        marginBottom: '0.1rem',
                        marginRight: '0.2rem',
                      }}
                      animationDuration={0.1}
                    />
                  </Link>
                </div>
              )}
              {token && (
                <div style={{ width: '2rem' }}>
                  <Heart
                    isActive={activeMap[song_id] || false}
                    onClick={handleHeartClick}
                    animationTrigger="both"
                    inactiveColor="rgba(255,125,125,.75)"
                    activeColor="#e019ae"
                    style={{
                      marginTop: '-0.3rem',
                      cursor: 'default',
                      marginBottom: '0.1rem',
                      marginRight: '0.2rem',
                    }}
                    animationDuration={0.1}
                  />
                </div>
              )}
              <div>
                {/* <span>{props.like_count}</span> */}
                {activeMap[song_id] !== undefined
                  ? activeMap[song_id]
                  : song.likes}
              </div>
            </div>
            <IconButton style={{ color: 'black' }}>
              <AddCircleOutlineIcon></AddCircleOutlineIcon>
            </IconButton>
            <Link to={song.filepath} target="_blank" download>
              <IconButton style={{ color: 'black' }}>
                <Download />
              </IconButton>
            </Link>
            <IconButton style={{ color: 'black' }}>
              <QueueMusic />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '10%',
          }}
        >
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Username" secondary={user} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRange />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Date Created"
                secondary={song.creation_date}
              />
            </ListItem>
          </List>
        </Box>
      </Card>
      <br></br>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          id="outlined-multiline-static"
          label="Write a Comment"
          multiline
          rows={5}
          sx={{
            width: 800,
            height: 150,
            border: '1px solid white',
            borderRadius: 1,
          }}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
          disableUnderline
        />
        <br></br>
        <ColorButton
          variant="contained"
          color="success"
          //   onClick={handleSubmit}
          sx={{
            height: 150,
          }}
        >
          Submit
        </ColorButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <List
          sx={{
            width: '100%',
            maxWidth: '50%',
            color: 'white',
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <Typography>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                  >
                    Ali Connors
                  </Typography>
                  " — I'll be in your neighborhood doing errands this…"
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <Typography>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  " — Wish I could come, but I'm out of town this…"
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <Typography>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                  >
                    Sandra Adams
                  </Typography>
                  — Do you have Paris recommendations? Have you ever…
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </div>
  );
}
