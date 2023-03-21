import newMusicPlayer_styles from './newMusicPlayer.module.css';
import Player from 'react-material-music-player';
import { Track, PlayerInterface } from 'react-material-music-player';
import sample from '../../backend/song_database/samples/Contemporary Christian, in the style of Casting Crowns - Jukebox.mp3';
import { useEffect } from 'react';
const baseURL = 'http://127.0.0.1:4000/';

export default function NewMusicPlayer() {
  useEffect(() => {}, []);

  return (
    <div>
      <Player disableDrawer={false} />
    </div>
  );
}
