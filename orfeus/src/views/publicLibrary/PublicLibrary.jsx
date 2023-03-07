import library_styles from "./PublicLibrary.module.css";
import { useState, useEffect } from "react";
import Search from "./search";
import axios from "axios";
import TopSongsCarousel from "./TopSongsCarousel";
import MusicPlayer from "./MusicPlayer";
import SearchResult from "./SearchResult";

const baseURL = "http://127.0.0.1:5000/";

const MusicDB = () => {
  const [songs, setSongs] = useState([]);

  function fetchData() {
    return axios
      .get(baseURL + "carouselfiles")
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

const filterExamples = (songList, query) => {
  if (!query) {
    return songList;
  }

  return songList.filter((song) => {
    const songName = song.filepath.toLowerCase();
    return songName.includes(query);
  });
};

//This is where we place actual code for the music player code.
const Library = () => {
  const songs = MusicDB();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const filteredExamples = filterExamples(songs, searchQuery);

  function handleItemClick(song) {
    setSelectedSong(song);
  }

  return (
    <div className={library_styles.Library}>
      <h2>PUBLIC LIBRARY</h2>
      <TopSongsCarousel handleItemClick={handleItemClick} />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchResult
        songs={filteredExamples}
        handleItemClick={handleItemClick}
      />
      {selectedSong && (
        <MusicPlayer
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  );
};

export default Library;
