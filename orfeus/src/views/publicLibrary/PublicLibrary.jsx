import library_styles from "./PublicLibrary.module.css";
import { useState, useEffect } from "react";
import SearchBar from "./oldSearch";
import axios from "axios";
import MuiCarousel from "./MuiCarousel";
import MusicPlayer from "./MusicPlayer";
import SearchResult from "./SearchResult";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const baseURL = "http://127.0.0.1:4000/";

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
    <div className={library_styles.library}>
      <div className={library_styles.carousel_container}>
        <MuiCarousel className={library_styles.carousel} />
      </div>
      <div className={library_styles.content_container}>
        <div>
          {/* <IconButton>
              <AddCircleOutlineIcon></AddCircleOutlineIcon>
            </IconButton> */}
          <div className={library_styles.add_playlist}>
            <IconButton
              variant="outlined"
              className={library_styles.make_playlist}
            >
              <AddCircleOutlineIcon></AddCircleOutlineIcon>Create Playlist
            </IconButton>
          </div>
          <div className={library_styles.page_options}></div>
        </div>
        <div className={library_styles.search_options}>
          <SearchBar className={library_styles.searchbar} />
        </div>
      </div>
    </div>
  );
};

export default Library;
