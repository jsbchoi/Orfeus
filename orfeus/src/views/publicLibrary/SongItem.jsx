//In the props, we are passing in the song name and the number of likes each song has.
import Typography from "@mui/material/Typography";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import songItem_style from "./SongItem.module.css";
import { useMediaPlayer } from "../../MediaPlayerContext";
import Heart from "react-heart"
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Comment from "../../components/comment/Comment";
//pass in the song name as an attribute.
const baseURL = "http://127.0.0.1:4000/";
const SongItem = (props) => {
  const { setSelectedSong } = useMediaPlayer();
  const token = localStorage.getItem('access_token');
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (playlist_id, generated_file_id, action) => {
    const url = `${baseURL}playlist/${playlist_id}/${action}/${generated_file_id}`;

    console.log(url);

    axios.post(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        console.log(response.data);
        props.fetchPlaylists()
      })
      .catch(error => {
        console.log(error);
      });
    handleClose();
  };

  return (
    <div className={songItem_style.total_container} onClick={props.onItemClick}>
      <div className={songItem_style.leftside_container}>
        <IconButton style={{ color: 'white' }}>
          <PlayCircleIcon
            onClick={() => {
              if (props.song) {
                setSelectedSong(props.song);
              }
            }}
          />
        </IconButton>
        <div className={songItem_style.likecount_container}>
          {!token && (
            <div style={{ width: '2rem' }}>
              <Link to="/login">
                <Heart
                  isActive={props.activeMap[props.song.id]}
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
                  //on click navigate to login page
                  onClick={() => { }
                  }
                />
              </Link>
            </div>
          )}
          {token && (
            <div style={{ width: '2rem' }}>
              <Heart
                isActive={props.activeMap[props.song.id] || false}
              onClick={() => props.handleHeartClick(props.song)}
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
          <div className={songItem_style.iconlike_container}>
            {/* <span>{props.like_count}</span> */}
            {props.activeMap[props.song.id] !== undefined
              ? props.activeMap[props.song.id]
              : props.song.like_count}
          </div>
        </div>
      </div>
      <div className={songItem_style.rightside_container}>
        <Typography>{props.song_name}</Typography>
        <Comment hoveredSongId={props.song.id} />
        <IconButton style={{ color: "white" }} onClick={handleClick}>
          <QueueMusicIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {props.playlists
            .filter((playlist) => !playlist.songs.some((song) => song.id === props.song.id))
            .map((playlist, index) => (
              <MenuItem
                className={songItem_style.add_playlist_option}
                key={index}
                onClick={() => handleMenuItemClick(playlist.id, props.song.id, 'add')}
              >
                <IconButton style={{ justifyContent: 'flex',
                                        color: 'green' }}>
                  <AddCircleOutlineIcon />
                </IconButton>
                {playlist.name}
              </MenuItem>
            ))}
          {props.playlists
            .filter((playlist) => playlist.songs.some((song) => song.id === props.song.id))
            .map((playlist, index) => (
              <MenuItem
                className={songItem_style.remove_playlist_option}
                key={index}
                onClick={() => handleMenuItemClick(playlist.id, props.song.id, 'remove')}
              >
                <IconButton style={{ justifyContent: 'flex',
                                        color: 'red' }}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {playlist.name}
              </MenuItem>
            ))}
        </Menu>
      </div>
    </div>

  );
};

export default SongItem;
