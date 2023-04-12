//In the props, we are passing in the song name and the number of likes each song has.
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import songItem_style from './SongItem.module.css';
import { useMediaPlayer } from '../../MediaPlayerContext';
import Heart from 'react-heart';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SongFile from '../SongFile/songFile';

//pass in the song name as an attribute.

const SongItem = (props) => {
  const { setSelectedSong } = useMediaPlayer();
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const handleSongClick = () => {
    console.log('Click');
    navigate(`/song/${props.id}`);
    console.log('Click');
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
        <Button
          sx={{ color: 'white', fontFamily: 'Roboto' }}
          onClick={handleSongClick}
        >
          <Typography>{props.song_name}</Typography>
        </Button>
        <IconButton style={{ color: 'white' }}>
          <AddCircleOutlineIcon></AddCircleOutlineIcon>
        </IconButton>
      </div>
    </div>
  );
};

export default SongItem;
