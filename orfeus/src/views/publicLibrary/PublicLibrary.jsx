//Search Bar code: https://www.emgoto.com/react-search-bar/

import { Link } from "react-router-dom";
import SongList from "./SongDB";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import library_styles from "./PublicLibrary.module.css";
import Search from "./search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "http://127.0.0.1:5000/";

const examples = [
  { id: "1", name: "songname1" },
  { id: "2", name: "audiofile name 394" },
  { id: "3", name: "songname28" },
  { id: "4", name: "audio file" },
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

const Library = () => {
  const songs = MusicDB();
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredExamples = filterExamples(songs, searchQuery);
  return (
    <div className={library_styles.Library}>
      <h2>Public Library</h2>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul>
        {filteredExamples.map((songs) => (
          <li key={songs.song_id}>
            {songs.title}
            {songs.artist_id}
            {songs.genre_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;
