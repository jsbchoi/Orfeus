import ReactAudioPlayer from "react-h5-audio-player";
import library_styles from "./PublicLibrary.module.css";
const baseURL = "http://127.0.0.1:4000/";

function MusicPlayer({ song, onClose }) {
  console.log(song.filepath)

  return (
    <div className={library_styles.playerfooter}>
      <div className={library_styles.closeButton} onClick={onClose}>
        X
      </div>
      <div className={library_styles.playerContainer}>
        <div className={library_styles.player}>
          <ReactAudioPlayer
            src={`${baseURL}generatedfiles/${encodeURIComponent(song.id)}`}
            autoPlay
            controls
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;