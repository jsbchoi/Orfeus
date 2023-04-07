// Search Bar Code: https://www.emgoto.com/react-search-bar/

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import search_styles from "./Search.module.css";
import axios from "axios";

const baseURL = "http://127.0.0.1:4000/";

const MusicDB = () => {
  const [songs, setSongs] = useState([]);

  function fetchData() {
    return axios
      .get(baseURL + "/carouselfiles")
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

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const history = useNavigate();
  const songs = MusicDB();
  console.log(songs);

  const onSubmit = (e) => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
  };

  return (
    <div>
      <form
        className={search_styles.searchbar_form}
        action="/"
        method="get"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          className={search_styles.textfield_form}
          value={searchQuery}
          label="Search for a song"
          variant="filled"
          sx={{ width: "89%", border: "1px solid white", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
          disableUnderline
          onInput={(e) => setSearchQuery(e.target.value)}
        ></TextField>
        <IconButton>
          <SearchIcon></SearchIcon>
        </IconButton>
        {/* <Link to="/musicFile">
          <button className={library_styles.search_button} type="submit">
            Search
          </button>
        </Link> */}
      </form>
    </div>
  );
};

export default SearchBar;
