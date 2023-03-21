import newMusicPlayer_styles from './newMusicPlayer.module.css';
import Player from 'react-material-music-player';
import { Track, PlayerInterface } from 'react-material-music-player';
import sample from '../../backend/song_database/samples/Contemporary Christian, in the style of Casting Crowns - Jukebox.mp3';
import { useEffect } from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import new_theme from './ThemeConfig.js';
import { createTheme } from '@mui/material/styles';
import cover_art from './music_note.png';

const baseURL = 'http://127.0.0.1:4000/';
let test_arr = [];
test_arr.push(
  new Track({
    ID: 'e99bcbf9-c3b9-47bf-85be-6438819d2365', // unique ID used in shuffling and sorting
    coverArt: cover_art,
    title: 'Sample Song',
    artist: 'User 1',
    source: sample, // url to music file
  })
);

function NewMusicPlayer() {
  useEffect(() => {
    PlayerInterface.play(test_arr);
  }, []);
  const theme = createTheme(new_theme, {
    components: {
      MuiBox: {
        styleOverrides: {},
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Player disableDrawer={false} />
      </ThemeProvider>
    </div>
  );
}
PlayerInterface.play(test_arr);
export default NewMusicPlayer;
