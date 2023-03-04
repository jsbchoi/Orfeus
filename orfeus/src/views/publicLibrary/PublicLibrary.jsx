//Search Bar code: https://www.emgoto.com/react-search-bar/
import { Link } from "react-router-dom";
import SongList from "./SongDB";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import library_styles from "./PublicLibrary.module.css";
import Search from "./search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import audioFile from "./test.wav";
import TopSongsCarousel from "./TopSongsCarousel";
import ReactAudioPlayer from "react-h5-audio-player";

const baseURL = "http://127.0.0.1:5000/";

const examples = [
  { id: "1", name: "songname1" },
  { id: "2", name: "audiofile name 394" },
  { id: "3", name: "songname28" },
  { id: "4", name: "audio file" },
];

const top_songs = [
  { id: "1", name: "Top Song 1" },
  { id: "2", name: "Top Song 2" },
  { id: "3", name: "Top Song 3" },
  { id: "4", name: "Top Song 4" },
  { id: "5", name: "Top Song 5" },
];

const MusicDB = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);

  function fetchData() {
    return axios
      .get(baseURL + "getFile", {})
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

const filterExamples = (SongList, query) => {
  const songs = MusicDB();
  if (!query) {
    return songs;
  }

  return songs.filter((song) => {
    const songName = song.title.toLowerCase();
    return songName.includes(query);
  });
};

//This is where we place actual code for the music player code.
function Footer({ song, onClose }) {
  console.log(song.filepath)

  return (
    <div className={library_styles.footer}>
      <div className={library_styles.closeButton} onClick={onClose}>
        X
      </div>
      <div className={library_styles.playerContainer}>
        <div className={library_styles.player}>
          <ReactAudioPlayer
            src={`${baseURL}getSoundFile/${encodeURIComponent(song.id)}`}
            autoPlay
            controls
          />
        </div>
      </div>
    </div>
  );
}
const Library = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const songs = MusicDB();
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredExamples = filterExamples(songs, searchQuery);
  const [isPlaying, setIsPlaying] = useState(false);
  //This is the code for the duration and currentTime
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function handleItemClick(song) {
    setSelectedSong(song);
  }
  //This is going to be a function for when the user clicks on the card song
  const click_song_card = () => {
    console.log("OKAYYYY");
  };

  const togglePlayback = () => {
    const audio = document.getElementById("audio");
    if (isPlaying) {
      //If it is playing, then we have the choice to click pause
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={library_styles.Library}>
      <h2>PUBLIC LIBRARY</h2>
      <TopSongsCarousel handleItemClick={handleItemClick} />
      {/* <CardGroup>
        {top_songs.map((song) => (
          <Card bg="secondary">
            <Card.Body>
              <Card.Text>{song.name}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup> */}
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className={library_styles.generated_song_list}>
        <CardGroup>
          {filteredExamples.map((songs) => (
            // <li key={songs.song_id}>
            //   {songs.title}
            //   {songs.artist_id}
            //   {songs.genre_id}
            // </li>

            <Row xs={1} md={1} className="g-2">
              {Array.from({ length: 2 }).map((_, idx) => (
                <Col>
                  <Card
                    bg="secondary"
                    style={{ width: "18rem" }}
                    className={library_styles.song_card}
                  >
                    <Card.Body onClick={togglePlayback}>
                      <Card.Text key={songs.song_id}>
                        {songs.title}
                        {songs.artist_id}
                        {songs.genre_id}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        </CardGroup>
      </ul>
      {selectedSong && (
        <Footer
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  );
};

export default Library;