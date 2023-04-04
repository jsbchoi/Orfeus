// Search Bar Code: https://www.emgoto.com/react-search-bar/

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import search_styles from "./oldSearch.module.css";
import SongItem from "./SongItem.jsx";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const history = useNavigate();
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
          label="Search for a song"
          sx={{
            width: "100%",
            fieldset: { borderColor: "white" },
            color: "white",
          }}
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
      <div>
        <SongItem like_count={12} song_name={"Boom"}></SongItem>
      </div>
    </div>
  );
};

export default SearchBar;
