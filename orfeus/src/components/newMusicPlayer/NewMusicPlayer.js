// import newMusicPlayer_styles from './newMusicPlayer.module.css';
import Player from 'react-material-music-player';
import { Track, PlayerInterface } from 'react-material-music-player';
import sample from "../../backend/song_database/samples/Contemporary Christian, in the style of Casting Crowns - Jukebox.mp3";
import { useEffect } from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import new_theme from './ThemeConfig.js';
import { createTheme } from '@mui/material/styles';
import cover_art from "./music_note.png";
import { useMediaPlayer } from '../../MediaPlayerContext';
//import ReactJkMusicPlayer from 'react-jinke-music-player';
//import 'react-jinke-music-player/assets/index.css';
const baseURL = 'http://127.0.0.1:4000/';
const image = '/assets/music_note.png';
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

function extractTitleFromFilepath(filepath) {
  const startIndex = filepath.indexOf("samples\\") + 8; // 8 is the length of "samples/"
  const endIndex = filepath.lastIndexOf(".mp3");
  const title = filepath.substring(startIndex, endIndex);
  return title;
}
function NewMusicPlayer() {
  const { selectedSong, setSelectedSong } = useMediaPlayer();
  
  async function fetchAndPlay() {
    const soundFileId = selectedSong.id;

    try {
      const response = await fetch(`${baseURL}/generatedfiles/${soundFileId}`);
      if (response.status === 200) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        PlayerInterface.play([
          new Track(
            selectedSong.id,
            image,
            extractTitleFromFilepath(selectedSong.filepath),
            [],
            audioUrl
          ),
        ]);
      } else {
        throw new Error(`Error fetching audio file: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchAndPlay();
  }, [selectedSong]);
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
        <Player disableDrawer={false}
        ></Player>
      </ThemeProvider>
    </div>
  );
}
export default NewMusicPlayer;
